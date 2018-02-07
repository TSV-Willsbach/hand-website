import { Component, OnInit, Input } from '@angular/core';
import { NavigationNode } from '../navigation/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() nodes: NavigationNode[];
  constructor() {

  }
  enabled = false;

  ngOnInit() {
  }

}
