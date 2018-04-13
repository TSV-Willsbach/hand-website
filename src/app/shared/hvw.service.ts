import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Ligue } from '@wh-objects/hvw';

const baseUrl = 'http://spo.handball4all.de/service/if_g_json.php';

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
      console.log(scores);
      scores.forEach(element => {
        element.difference = element.numGoalsShot - element.numGoalsGot;
      });
      return data;
    });
  }

  buildUrlWithParam(): string {
    return baseUrl + '?ca=' + this.allGames + '&cl=' + this.liga + '&cmd=ps&og=3';
  }

}
