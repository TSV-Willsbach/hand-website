import { Component, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { NavigationNode } from '../navigation/navigation.service';
import { AuthService } from '@wh-share/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {

  @Input() nodes: NavigationNode[];

  constructor(public auth: AuthService) {
    console.log('User', auth.user);
  }

  ngOnInit() {
  }

  onMenuClick() {
  }

  logout() {
    this.auth.signOut();
  }
}
