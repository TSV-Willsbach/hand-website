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

/* const transitionLeft = "carousel-item-left active";
const transitionLeftNext = "carousel-item-next carousel-item-left"; */
const transitionLeft = ["carousel-item carousel-item-left active", "carousel-item carousel-item-next carousel-item-left", "carousel-item active"];

@Injectable()
export class CarouselService {

  /*
active carousel-item-left
carousel-item-next carousel-item-left


  */

  transitionClasses: Observable<any>;

  constructor(
    //private items: Number, private inter: Number
  ) {
    /*    this.transitionClasses = timer(0, 3000)
         .map(value => {Math.ceil(value % 5)})
         .pipe(switchMap(() => interval(500).pipe(take(3)))); */


    this.transitionClasses = timer(2000, 5000)
      .pipe(switchMap(() =>
        interval(100)
          .pipe(take(3))
                .map(val =>{ return { tick: val, class: transitionLeft[val]}})
      )
      );

  }

  nextItem() {

  }

  prevItem() {

  }

}
