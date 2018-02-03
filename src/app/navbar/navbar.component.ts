import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {

  }
  enabled = false;

  ngOnInit() {
  }

  onSelect(): void {
    this.enabled = !this.enabled;

  }

}
