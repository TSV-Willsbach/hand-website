import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Team, Player } from '@wh-objects/team';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';
import { Observable } from 'rxjs/Observable';

const jsonUrl = './assets/generated/teams.json';
const defaultImg = "https://wp.willsbach-handball.de/wp-content/uploads/players/avatar_1522109382.png";

@Injectable()
export class TeamService {

  team: Team;
  posts: Post[];

  constructor(private http: HttpClient, private news: NewsService) { }


  getPlayer(teamId: string, playerName: string): Observable<Player> {
    return this.http.get<Player>(jsonUrl)
      .map(player => {
        let team = player[teamId];
        let playerNames = playerName.split("_");

        player = team.players.find(item =>
          item.name === playerNames[1] &&
          item.prename === playerNames[0]
        );
        if (player.picture === "" || player.picture === undefined) {
          // Default Picture if no picture is set
          player.picture = defaultImg;
        }
        return player;
      });
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(jsonUrl)
      .map(team => {
        team = team[teamId];

        if (team.players != undefined) {
          team.players.sort(function (a, b) {
            if (a.prename < b.prename) return -1;
            if (a.prename > b.prename) return 1;
            return 0;
          });
        }

        if (team.trainer != undefined) {
          team.trainer.forEach(function (part, index, coach) {
            coach[index].picture = defaultImg;
          });
        }

        return team;
      });
  }

  getTeamReports(teamId: string): Observable<Post[]> {
    return this.news.fetchReports(teamId);
  }

}
