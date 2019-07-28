import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WillsbachApiService {

  protected url = 'https://api.willsbach-handball.de/';
  // protected url = 'http://localhost:4000/';
  protected urlParams: HttpParams;

  constructor() {
    this.urlParams = new HttpParams();
  }

  protected addUrlParam(paramName: string, value: any) {
    if (value === undefined) {
      return;
    }
    this.urlParams = this.urlParams.set(paramName, String(value));
  }
}
