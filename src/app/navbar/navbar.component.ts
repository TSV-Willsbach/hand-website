import { Component, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { NavigationNode } from '../navigation/navigation.service';
import { timer } from 'rxjs/observable/timer';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@wh-share/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {

  @Input() nodes: NavigationNode[];

  constructor(private el: ElementRef, private renderer: Renderer, public auth: AuthService) {
    console.log("Test", auth.user);
  }

  ngOnInit() {
  }

  onMenuClick() {
  }

  logout() {
    this.auth.signOut();
  }
}
