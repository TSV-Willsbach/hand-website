import { Component, OnInit, Input } from '@angular/core';
import { NavigationNode, VersionInfo } from '../navigation/navigation.service';
// import * as npm from '../../../package.json';
const npm = require('../../../package.json');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public appVersion;

  constructor() { }

  @Input() nodes: NavigationNode[];
  @Input() versionInfo: VersionInfo;

  ngOnInit() {
    this.appVersion = npm.version;
  }

}
