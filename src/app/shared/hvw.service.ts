import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Ligue, Statistik, Club, StatGame, StatGoals } from '@wh-objects/hvw';

const baseUrl = 'https://spo.handball4all.de/service/if_g_json.php';
const clubUrl = baseUrl + '?c=60&cmd=pcu&og=3&p=58';
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

      games.forEach(element => {
        if (element.gGuestTeam === clubName) {
          this.awayStatLogic(statistik, element);
        } else if (element.gHomeTeam === clubName) {
          this.homeStatLogic(statistik, element);
        }
      });

      return data;
    });
  }

  getNextGames(): Observable<Ligue> {
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

      console.log(statistik.homeGoalsShot);
      statistik.homeGoalsShot.avarageGoals = statistik.homeGoalsShot.totalGoals / statistik.homeGoalsShot.gameAmount;
      console.log(statistik.homeGoalsShot.avarageGoals);

      games.forEach(element => {
        if (element.gGuestTeam === clubName) {
          this.awayStatLogic(statistik, element);
        } else if (element.gHomeTeam === clubName) {
          this.homeStatLogic(statistik, element);
        }
      });

      return data;
    });
  }

  getClubData(): Observable<Club> {
    return this.http.get<Club>(clubUrl).map(club => {
      let data = club[0];
      let classes = data.content.classes;

      classes.forEach(element => {
        element.games.forEach(element => {
          if (element.gGuestGoals === " ") { element.gGuestGoals = "0" }
          if (element.gHomeGoals === " ") { element.gHomeGoals = "0" }
          if (element.gGuestGoals_1 === " ") { element.gGuestGoals_1 = "0" }
          if (element.gHomeGoals_1 === " ") { element.gHomeGoals_1 = "0" }
        });
      });
      return data;
    });
  }

  private homeStatLogic(statistik: any, element: any) {
    this.homeGoalLogic(statistik, element);

    let diff = +element.gHomeGoals - +element.gGuestGoals;
    if (element.gHomePoints === '2') {
      statistik.homeWins++;
      if (diff > statistik.homeHighestWinDiff) {
        statistik.homeHighestWinDiff = diff;
        statistik.homeHighestWin = this.buildWLText(element, element.gGuestTeam);
      }
    }
    else if (element.gHomePoints === '0' && diff < statistik.homeHighestLoseDiff) {
      statistik.homeHighestLoseDiff = diff;
      statistik.homeHighestLose = this.buildWLText(element, element.gGuestTeam);
    }
  }

  private homeGoalLogic(statistik: any, goals: any) {
    statistik.homeGoalsShot.totalGoals = statistik.homeGoalsShot.totalGoals + +goals.gHomeGoals;
    statistik.homeGoalsShot.gameAmount++;
    statistik.homeGoalsGot.totalGoals = statistik.homeGoalsGot.totalGoals + +goals.gGuestGoals;
    statistik.homeGoalsGot.gameAmount++;
  }

  private awayGoalLogic(statistik: any, goals: any) {
    statistik.awayGoalsShot.totalGoals = statistik.awayGoalsShot.totalGoals + +goals.gGuestGoals;
    statistik.awayGoalsShot.gameAmount++;
    statistik.awayGoalsGot.totalGoals = statistik.awayGoalsGot.totalGoals + +goals.gHomeGoals;
    statistik.awayGoalsGot.gameAmount++;
  }

  private awayStatLogic(statistik: any, element: any) {
    this.awayGoalLogic(statistik, element);
    let diff = +element.gGuestGoals - +element.gHomeGoals;
    if (element.gGuestPoints === '2') {
      statistik.awayWins++;
      if (diff > statistik.awayHighestWinDiff) {
        statistik.awayHighestWinDiff = diff;
        statistik.awayHighestWin = this.buildWLText(element, element.gHomeTeam);
      }
    }
    else if (element.gGuestPoints === '0' && diff < statistik.awayHighestLoseDiff) {
      statistik.awayHighestLoseDiff = diff;
      statistik.awayHighestLose = this.buildWLText(element, element.gHomeTeam);
    }
  }

  private buildWLText(element: any, teamName: string): StatGame {
    let stat = new StatGame();

    stat.teamName = teamName;
    stat.result = element.gHomeGoals + " : " + element.gGuestGoals;
    return stat;
  }

  private buildUrlWithParam(): string {
    return baseUrl + '?ca=' + this.allGames + '&cl=' + this.liga + '&cmd=ps&og=3';
  }

}
