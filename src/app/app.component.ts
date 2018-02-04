import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { NavigationService, NavigationNode, VersionInfo } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  versionInfo: VersionInfo;

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {

  }
}
