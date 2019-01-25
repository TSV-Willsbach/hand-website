import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ligue, Club } from '@wh-objects/hvw';
import { TeamStatistics } from '@wh-objects/team-statistics';
import { Globals } from '@wh-objects/globals';
import { Team } from '@wh-objects/team';

const baseUrl = 'https://spo.handball4all.de/service/if_g_json.php';
const tickerUrl = 'http://spo.handball4all.de/service/ticker.html?appid=&token=';
const reportUrl = 'http://spo.handball4all.de/misc/sboPublicReports.php?sGID=';

@Injectable()
export class HvwService {

  private _liga: String = '';
  get liga(): String {
    return this._liga;
  }
  set liga(liga: String) {
    this._liga = liga;
  }

  private _allGames = '1';
  get allGames(): string {
    return this._allGames;
  }
  set allGames(allGames: string) {
    this._allGames = allGames;
  }

  private _period: String = '68'; // '58';
  get period(): String {
    return this._period;
  }
  set period(period: String) {
    this._period = period;
  }

  constructor(private http: HttpClient, private global: Globals) { }

  getLigueData(): Observable<Ligue> {
    const url = this.buildUrlWithParam();

    return this.http.get<Ligue>(url).map(ligue => {
      const data = ligue[0];
      const scores = data.content.score;
      scores.forEach(element => {
        element.difference = element.numGoalsShot - element.numGoalsGot;
      });
      const games = data.content.futureGames.games;

      if (games !== undefined) {
        games.forEach(element => {
          this.liveAndPDF(element);
        });
      }


      const stats = new TeamStatistics(this.global);
      stats.calcStatistic(data);
      return data;
    });
  }

  private liveAndPDF(element: any) {
    if (element.live === true) {
      element.tickerUrl = tickerUrl + element.gToken;
    }
    if (element.sGID !== undefined) {
      element.pdfDL = reportUrl + element.sGID;
    }
  }

  getNextGames(): Observable<Ligue> {
    const url = this.buildUrlWithParam();
    return this.http.get<Ligue>(url).map(ligue => ligue[0]);
  }

  getClubData(): Observable<Club> {
    const clubUrl = baseUrl + '?c=60&cmd=pcu&og=3&p=' + this._period;
    return this.http.get<Club>(clubUrl).map(club => {
      const data = club[0];
      const classes = data.content.classes;

      classes.forEach(element => {
        element.games.forEach(child => {
          if (child.gGuestGoals === ' ') { child.gGuestGoals = '0'; }
          if (child.gHomeGoals === ' ') { child.gHomeGoals = '0'; }
          if (child.gGuestGoals_1 === ' ') { child.gGuestGoals_1 = '0'; }
          if (child.gHomeGoals_1 === ' ') { child.gHomeGoals_1 = '0'; }
          this.liveAndPDF(child);
        });
      });
      return data;
    });
  }

  private buildUrlWithParam(): string {
    return baseUrl + '?ca=' + this.allGames + '&cl=' + this.liga + '&cmd=ps&og=3';
  }

  public getAllGamesForTeam(team: Team): Observable<Ligue> {
    const mGames = new Ligue();
    this.liga = team.ligaID;
    this.getNextGames().subscribe(
      ligue => {
        ligue = this.getOnlyOurGames(ligue);
        mGames.content = ligue.content;
        return ligue;
      },
      error => { console.log(error); },
      () => {
        if (team.pokalID != null) {
          this.liga = team.pokalID;
          this.getNextGames().subscribe(
            ligue => {
              ligue = this.getOnlyOurGames(ligue);
              mGames.content.actualGames.games = mGames.content.actualGames.games.concat(ligue.content.actualGames.games);
              return ligue;
            },
            error => { console.log(error); },
            () => { });
        }
        if (team.qualID != null) {
          this.liga = team.qualID;
          this.getNextGames().subscribe(
            ligue => {
              ligue = this.getOnlyOurGames(ligue);
              mGames.content.actualGames.games = mGames.content.actualGames.games.concat(ligue.content.actualGames.games);
              return ligue;
            },
            error => { console.log(error); },
            () => { });
        }
      });
    return Observable.of(mGames);
  }


  private getOnlyOurGames(ligue: Ligue): Ligue {
    let games = ligue.content.actualGames.games;
    const actClubGames = games.filter(element => this.global.isOwnClub(element.gGuestTeam) === true
      || this.global.isOwnClub(element.gHomeTeam) === true);
    games = ligue.content.futureGames.games;
    const futClubGames = games.filter(element => this.global.isOwnClub(element.gGuestTeam) === true
      || this.global.isOwnClub(element.gHomeTeam) === true);
    ligue.content.actualGames.games = actClubGames.concat(futClubGames);
    return ligue;
  }
}
