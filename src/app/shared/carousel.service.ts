import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publishReplay';
import { timer } from 'rxjs/observable/timer';
import { switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Team } from '../teams';

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
    //private items: Number, private inter: Number
  ) {
    /*    this.transitionClasses = timer(0, 3000)
         .map(value => {Math.ceil(value % 5)})
         .pipe(switchMap(() => interval(500).pipe(take(3)))); */


    this.transitionClasses = timer(2000, 5000)
      .pipe(switchMap(() =>
        interval(500)
          .pipe(take(3))
          .map(val => { return { tick: val, class: transitionLeft[val] } })
      )
      );

  }

  fetchTeams(): Observable<Team[]> {
    if (!this.teams) {
      this.teams = this.http.get<Team[]>(apiTeams)
        .map(team => {
          return team.map(team => {
            return team;
          });
        })
        .publishReplay(1)
        .refCount();
    }
    return this.teams;
  }

  nextItem() {

  }

  prevItem() {

  }

}
