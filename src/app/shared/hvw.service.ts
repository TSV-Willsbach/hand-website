import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Ligue, Statistik } from '@wh-objects/hvw';

const baseUrl = 'http://spo.handball4all.de/service/if_g_json.php';
const clubName = 'TSV Willsbach';

@Injectable()
export class HvwService {

  private _liga: String = '';
  get liga(): String {
    return this._liga;
  }
  set liga(liga: String) {
    this._liga = liga;
  }

  private _allGames: string = '1';
  get allGames(): string {
    return this._allGames;
  }
  set allGames(allGames: string) {
    this._allGames = allGames;
  }

  constructor(private http: HttpClient) { }

  getLigueData(): Observable<Ligue> {
    let url = this.buildUrlWithParam();

    return this.http.get<Ligue>(url).map(ligue => {
      let data = ligue[0];
      let scores = data.content.score;
      let games = data.content.futureGames.games;
      data.statistik = new Statistik();
      let statistik = data.statistik;

      scores.forEach(element => {
        element.difference = element.numGoalsShot - element.numGoalsGot;
      });
      console.log(games);

      games.forEach(element => {
        if (element.gGuestTeam === clubName) {
          statistik.awayGoalsShot = statistik.awayGoalsShot + +element.gGuestGoals;
          statistik.awayGoalsGot = statistik.awayGoalsGot + +element.gHomeGoals;

          let diff = +element.gGuestGoals - +element.gHomeGoals;

          if (element.gGuestPoints === '2') {
            statistik.awayWins++;

            if (diff > statistik.awayHighestWinDiff) {
              statistik.awayHighestWinDiff = diff;
              statistik.awayHighestWin = element.gHomeTeam + " ( " + element.gHomeGoals + " : " + element.gGuestGoals + " )";
            }
          } else if (element.gGuestPoints === '0') {
            if (diff < statistik.awayHighestLoseDiff) {
              statistik.awayHighestLoseDiff = diff;
              statistik.awayHighestLose = element.gHomeTeam + " ( " + element.gHomeGoals + " : " + element.gGuestGoals + " )";
            }
          }
        } else if (element.gHomeTeam === clubName) {
          statistik.homeGoalsShot = statistik.homeGoalsShot + +element.gHomeGoals;
          statistik.homeGoalsGot = statistik.homeGoalsGot + +element.gGuestGoals;

          let diff = +element.gHomeGoals - +element.gGuestGoals;

          if (element.gHomePoints === '2') {
            statistik.homeWins++;

            if (diff > statistik.homeHighestWinDiff) {
              statistik.homeHighestWinDiff = diff;
              statistik.homeHighestWin = element.gGuestTeam + " ( " + element.gHomeGoals + " : " + element.gGuestGoals + " )";
            }
          } else if (element.gHomePoints === '0') {
            if (diff < statistik.homeHighestLoseDiff) {
              statistik.homeHighestLoseDiff = diff;
              statistik.homeHighestLose = element.gGuestTeam + " ( " + element.gHomeGoals + " : " + element.gGuestGoals + " )";
            }
          }
        }
      });

      return data;
    });
  }

  buildUrlWithParam(): string {
    return baseUrl + '?ca=' + this.allGames + '&cl=' + this.liga + '&cmd=ps&og=3';
  }

}
