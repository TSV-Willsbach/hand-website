import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sponsors } from '@wh-objects/sponsors';
import { map, publishReplay, refCount } from 'rxjs/operators';

const apiSponsorImages = 'https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=sponsors';

@Injectable()
export class SponsorsService {
  sponsors: any;

  constructor(private http: HttpClient) { }

  fetchSponsors(): Observable<Sponsors[]> {
    if (!this.sponsors) {
      this.sponsors = this.http.get<Sponsors[]>(apiSponsorImages)
        .pipe(
          map(sponsors => {
            sponsors = sponsors.filter(e => e.acf.archive !== true);
            return sponsors.map(sponsor => {
              // sponsor.thumbnail = sponsor._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
              return sponsor;
            });
          }),
          publishReplay(1),
          refCount()
        );
    }
    return this.sponsors;
  }
}
