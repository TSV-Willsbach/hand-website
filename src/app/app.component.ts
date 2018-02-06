import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { NavigationService, NavigationNode, VersionInfo, CurrentNodes } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  versionInfo: VersionInfo;
  currentNodes: CurrentNodes;
  footerNodes: NavigationNode[];
  topMenuNodes: NavigationNode[];

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.navigationService.versionInfo.subscribe(vi => {
      this.versionInfo = vi
    });

    this.navigationService.navigationViews.subscribe(views => {
      this.footerNodes = views['Footer'] || [];
      this.topMenuNodes = views['TopBar'] || [];
    });

  }
}
