import { WillsbachApiService } from './willsbach-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team, Player } from '@wh-objects/team';
import { Post } from '@wh-objects/post';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { WPPicture } from '@wh-objects/wordPress';
import { WordpressService } from './wordpress.service';

const defaultImg = 'https://wp.willsbach-handball.de/wp-content/uploads/players/avatar_1522109382.png';
const apiTeams = 'https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=teams';

@Injectable()
export class TeamService extends WillsbachApiService {

  team: Team;
  posts: Post[];
  wpCategory: string;

  constructor(private http: HttpClient, private wp: WordpressService) {
    super();
  }


  getPlayer(playerId: string): Observable<Player> {
    return this.http.get<any>(`${this.url}players/${playerId}`)
      .pipe(
        map(player => {
          if (player.picture === '' || player.picture === undefined) {
            // Default Picture if no picture is set
            player.picture = defaultImg;
          }
          return player;
        })
      );
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(this.getTeamUrl(teamId))
      .pipe(
        map(team => {
          if (team.players !== undefined) {
            team.players.sort(function (a, b) {
              if (a.prename < b.prename) { return -1; }
              if (a.prename > b.prename) { return 1; }
              return 0;
            });
          }
          let picture;
          this.wp.getTeamPictures(false, team.wp.id).subscribe(pic => picture = pic,
            error => { console.log(error); },
            () => {
              team.picture = picture[0].url;
            });

          if (team.coaches !== undefined) {
            console.log('coach', team.coaches);
            team.coaches.forEach(function (part, index, coach) {
              if (coach[index].picture === undefined || coach[index].picture === '' || coach[index].picture === null) {
                coach[index].picture = defaultImg;
              }
            });
          }
          this.wpCategory = team.wp.cat;
          return team;
        })
      );
  }

  getTeamPictures(teamName: string): Observable<WPPicture[]> {
    console.log('TT', teamName);
    return this.http.get<WPPicture[]>(apiTeams)
      .pipe(
        map(team => {
          team = team.filter(e => e.acf.team === teamName);
          return team.map(cTeam => {
            return cTeam;
          });
        }),
        publishReplay(1),
        refCount()
      );
  }

  private getTeamUrl(teamId: string): string {
    return this.url + 'teams/' + this.mapTeamId(teamId);
    // return `./assets/content/teams/${teamId}.json`;
  }

  getTeamReports(catID: string, page: number): Observable<Post[]> {
    return this.wp.fetchReports(+catID, page);
  }

  getMaxPages(): number {
    return this.wp.getMaxPages();
  }

  private mapTeamId(teamID): string {
    switch (teamID) {
      case 'herren':
        return '5cbdc5831c9d4400001c5ce0';
      default:
        return null;
    }
  }

}
