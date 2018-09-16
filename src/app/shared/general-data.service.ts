import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '@wh-objects/generalData';
import { Observable } from 'rxjs';

@Injectable()
export class GeneralDataService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts> {
    return this.http.get<Contacts>('./assets/content/clubContacts.json')
      .map(contacts => {
        console.log(contacts);
        return contacts;
      });
  }
}
