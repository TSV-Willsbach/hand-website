import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '@wh-objects/generalData';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GeneralDataService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts> {
    return this.http.get<Contacts>('./assets/content/clubContacts.json')
      .pipe(
        map(contacts => {
          console.log(contacts.contacts);
          contacts.contacts.forEach(element => {
            if (element.picture === undefined) {
              element.picture = './assets/images/handball_logo.png';
            }
          });

          return contacts;
        })
      );
  }
}
