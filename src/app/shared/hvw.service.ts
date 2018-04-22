import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Ligue, Statistik, Club, StatGame, StatGoals } from '@wh-objects/hvw';
import { teamStatistics } from '@wh-objects/team-statistics';
import { Globals } from '@wh-objects/globals';

const baseUrl = 'https://spo.handball4all.de/service/if_g_json.php';
const tickerUrl = "http://spo.handball4all.de/service/ticker.html?appid=&token=";
const reportUrl = "http://spo.handball4all.de/misc/sboPublicReports.php?sGID="
const clubUrl = baseUrl + '?c=60&cmd=pcu&og=3&p=' + this._period;

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

  private _period: String = "58";
  get period(): String {
    return this._period;
  }
  set period(period: String) {
    this._period = period;
  }

  constructor(private http: HttpClient, private global: Globals) { }

  getLigueData(): Observable<Ligue> {
    let url = this.buildUrlWithParam();

    return this.http.get<Ligue>(url).map(ligue => {
      let data = ligue[0];
      let scores = data.content.score;
      scores.forEach(element => {
        element.difference = element.numGoalsShot - element.numGoalsGot;
      });
      let games = data.content.futureGames.games;

      if (games != undefined) {
        games.forEach(element => {
          if (element.live === true) {
            element.tickerUrl = tickerUrl + element.gToken;
          }
          if (element.sGID != undefined) {
            element.pdfDL = reportUrl + element.sGID;
          }
        });
      }


      let stats = new teamStatistics(this.global);
      stats.calcStatistic(data);
      return data;
    });
  }

  getNextGames(): Observable<Ligue> {
    let url = this.buildUrlWithParam();
    return this.http.get<Ligue>(url).map(ligue => { return ligue[0]; });
  }

  getClubData(): Observable<Club> {
    const clubUrl = baseUrl + '?c=60&cmd=pcu&og=3&p=' + this._period;
    console.log(clubUrl);
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

  private buildUrlWithParam(): string {
    return baseUrl + '?ca=' + this.allGames + '&cl=' + this.liga + '&cmd=ps&og=3';
  }

}
