import { WillsbachApiService } from './willsbach-api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ligue, Club } from '@wh-objects/hvw';
import { Globals } from '@wh-objects/globals';
import { Team } from '@wh-objects/team';
import { map } from 'rxjs/operators';

const baseUrl = 'https://spo.handball4all.de/service/if_g_json.php';
const tickerUrl = 'http://spo.handball4all.de/service/ticker.html?appid=&token=';
const reportUrl = 'http://spo.handball4all.de/misc/sboPublicReports.php?sGID=';

@Injectable()
export class HvwService extends WillsbachApiService {

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

  private _period: String = '83'; // '68'; // '58';
  get period(): String {
    return this._period;
  }
  set period(period: String) {
    this._period = period;
  }

  constructor(private http: HttpClient, private global: Globals) {
    super();
    this.url = this.url + 'hvw/';
  }

  getLigueData(): Observable<Ligue> {
    this.initUrlParams();
    this.addUrlParam('id', this.liga);

    return this.http.get<any>(this.url + 'ligue', { params: this.urlParams });
  }

  getNextGames(): Observable<Ligue> {
    const url = this.buildUrlWithParam();
    return this.http.get<Ligue>(url).pipe(
      map(ligue => ligue[0])
    );
  }

  getClubData(): Observable<Club> {
    return this.http.get<any>(this.url + 'club/' + this.period);
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
        return ligue;
      },
      error => { console.log(error); },
      () => {
        if (team.pokalID != null) {
          this.liga = team.pokalID;
          this.getNextGames().subscribe(
            ligue => {
              ligue = this.getOnlyOurGames(ligue);
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
              return ligue;
            },
            error => { console.log(error); },
            () => { });
        }
      });
    return of(mGames);
  }


  private getOnlyOurGames(ligue: Ligue): Ligue {
    ligue.games = ligue.games.filter((f) => this.global.isOwnClub(f.team.home) || this.global.isOwnClub(f.team.guest));
    return ligue;
  }
}
