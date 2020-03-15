import { WillsbachApiService } from './willsbach-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ligue, Club } from '@wh-objects/hvw';


@Injectable()
export class HvwService extends WillsbachApiService {

  private _liga: String = '';
  get liga(): String {
    return this._liga;
  }
  set liga(liga: String) {
    this._liga = liga;
  }

  private _period: String = '83'; // '68'; // '58';
  get period(): String {
    return this._period;
  }
  set period(period: String) {
    this._period = period;
  }

  constructor(private http: HttpClient) {
    super();
    this.url = this.url + 'hvw/';
  }

  getLigueData(): Observable<Ligue> {
    this.initUrlParams();
    this.addUrlParam('id', this.liga);

    return this.http.get<any>(this.url + 'ligue', { params: this.urlParams });
  }

  getClubData(): Observable<Club> {
    return this.http.get<any>(this.url + 'club/' + this.period);
  }
}
