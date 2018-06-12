import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, combineLatest, interval, timer } from 'rxjs';
import { switchMap, take, map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TeamWP } from '@wh-objects/wordPress';

/* const transitionLeft = "carousel-item-left active";
const transitionLeftNext = "carousel-item-next carousel-item-left"; */
const transitionLeft = ["carousel-item carousel-item-left active", "carousel-item carousel-item-next carousel-item-left", "carousel-item active"];
const apiTeams = "https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=teams";

@Injectable()
export class CarouselService {

  teams: any;

  /*
active carousel-item-left
carousel-item-next carousel-item-left


  */

  transitionClasses: Observable<any>;

  constructor(private http: HttpClient
    // private items: Number, private inter: Number
  ) {
    /*    this.transitionClasses = timer(0, 3000)
         .map(value => {Math.ceil(value % 5)})
         .pipe(switchMap(() => interval(500).pipe(take(3)))); */


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
            return team.map(team => {
              return team;
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
