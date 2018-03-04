import { Component, OnInit, Input } from '@angular/core';
import { NavigationNode } from '../navigation/navigation.service';
import { timer } from 'rxjs/observable/timer';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  open = false;
  transitionOpen = [
    {
      css: "navbar-collapse collapsing",
      style: {}
    },
    {
      css: "navbar-collapse collapsing",
      style: { height: "220px" },

    },
    {
      css: "navbar-collapse collapse show",
      style: {}
    }
  ];

  transitionClose = [
    {
      css: "navbar-collapse collapsing",
      style: { height: "220px"}
    },
    {
      css: "navbar-collapse collapsing",
      style: {},

    },
    {
      css: "navbar-collapse collapse",
      style: {}
    }
  ];
  navbar = "navbar-collapse collapse";
  style = {};
  transitionClasses: Observable<any>;

  @Input() nodes: NavigationNode[];
  constructor() {
    this.transitionClasses = timer(0, 200)
      .pipe(take(3))
      .map(val => val);

  }
  enabled = false;

  ngOnInit() {
  }

  onHamburgerButtonClick(): void {
    let animation = this.open ? this.transitionClose : this.transitionOpen;
    this.open = !this.open;
    this.transitionClasses
      .subscribe(val => {
        this.navbar = animation[val].css;
        this.style = animation[val].style;
      });
  }

}
