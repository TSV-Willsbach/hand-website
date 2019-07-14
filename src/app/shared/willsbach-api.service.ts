import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WillsbachApiService {

  // protected url = 'https://api.willsbach-handball.de/';
  protected url = 'http://localhost:4000/';

  constructor() { }
}
