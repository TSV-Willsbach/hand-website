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
          if (player.picture === '' || player.picture === undefined || player.picture === null) {
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
      case 'herren2':
        return '5e7661701c9d4400007d0e51';
      case 'damen':
        return '5e7662311c9d4400007d0e52';
      case 'majugend':
        return '5e7b75d91c9d4400000be526';
      case 'mbjugend':
        return '5f66325f0b4716fba1f7a0c5';
      case 'wbjugend':
        return '5e8234841c9d440000f5c551';
      case 'mcjugend':
        return '5e8238c31c9d440000f5c552';
      case 'mdjugend':
        return '5e823ae01c9d44000010791f';
      case 'gejugend':
        return '5e823dc21c9d440000f5c554';
      case 'minis':
        return '5e823f361c9d440000f5c555';
      default:
        return null;
    }
  }

}
