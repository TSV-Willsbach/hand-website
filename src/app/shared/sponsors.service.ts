import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sponsors } from '../sponsors';

const apiSponsorImages = "https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=sponsors";

@Injectable()
export class SponsorsService {

  constructor(private http: HttpClient) { }

  fetchSponsors(): Observable<Sponsors[]> {
    return this.http.get<Sponsors[]>(apiSponsorImages)
      .map(sponsors => {
        return sponsors.map(sponsors => {
          // sponsors.thumbnail = sponsors._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
          return sponsors;
        });
      });
  }
}
