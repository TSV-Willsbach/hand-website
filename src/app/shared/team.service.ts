import { CarouselService } from './carousel.service';
import { HvwService } from '@wh-share/hvw.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team, Player } from '@wh-objects/team';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';
import { Observable } from 'rxjs';

const defaultImg = 'https://wp.willsbach-handball.de/wp-content/uploads/players/avatar_1522109382.png';

@Injectable()
export class TeamService {

  team: Team;
  posts: Post[];
  wpCategory: string;

  constructor(private http: HttpClient, private news: NewsService, private carousel: CarouselService) { }


  getPlayer(teamId: string, playerName: string): Observable<Player> {
    return this.http.get<Team>(this.getTeamUrl(teamId))
      .map(team => {
        const playerNames = playerName.split('_');

        const player = team.players.find(item =>
          item.name === playerNames[1] &&
          item.prename === playerNames[0]
        );
        if (player.picture === '' || player.picture === undefined) {
          // Default Picture if no picture is set
          player.picture = defaultImg;
        }
        return player;
      });
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(this.getTeamUrl(teamId))
      .map(team => {
        // team = team[teamId];

        if (team.players !== undefined) {
          team.players.sort(function (a, b) {
            if (a.prename < b.prename) { return -1; }
            if (a.prename > b.prename) { return 1; }
            return 0;
          });
        }
        let picture;
        this.carousel.getTeam(team.wpID).subscribe(pic => picture = pic,
          error => { console.log(error); },
          () => {
            team.picture = picture[0].media_details.sizes.medium_large.source_url;
          });

        if (team.trainer !== undefined) {
          team.trainer.forEach(function (part, index, coach) {
            if (coach[index].picture === undefined || coach[index].picture === '') {
              coach[index].picture = defaultImg;
            }
          });
        }
        this.wpCategory = team.wpCat;
        return team;
      });
  }

  private getTeamUrl(teamId: string): string {
    return `./assets/content/teams/${teamId}.json`;
  }

  getTeamReports(teamId: string, page: number): Observable<Post[]> {
    return this.news.fetchReports(teamId, page);
  }

  getMaxPages(): number {
    return this.news.getMaxPages();
  }

}
