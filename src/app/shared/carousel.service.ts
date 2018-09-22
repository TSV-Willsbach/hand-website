import { Injectable } from '@angular/core';
import { Observable, interval, timer } from 'rxjs';
import { switchMap, take, map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TeamWP } from '@wh-objects/wordPress';

const transitionLeft = [
  'carousel-item carousel-item-left active',
  'carousel-item carousel-item-next carousel-item-left',
  'carousel-item active'];
const apiTeams = 'https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=teams';

@Injectable()
export class CarouselService {

  teams: any;
  transitionClasses: Observable<any>;

  constructor(private http: HttpClient) {
    this.transitionClasses = timer(2000, 5000)
      .pipe(switchMap(() =>
        interval(500)
          .pipe(
            take(3),
            map(val => ({ tick: val, class: transitionLeft[val] }))
          )
      )
      );
  }

  fetchTeams(): Observable<TeamWP[]> {
    if (!this.teams) {
      this.teams = this.http.get<TeamWP[]>(apiTeams)
        .pipe(
          map(team => {
            team = team.filter(e => e.acf.archive !== true);
            return team.map(cTeam => {
              return cTeam;
            });
          }),
          publishReplay(1),
          refCount()
        );
    }
    return this.teams;
  }

  nextItem() {
  }

  prevItem() {
  }

}
