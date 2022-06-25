import { Component, OnInit, Input } from "@angular/core";
// import * as npm from '../../../package.json';
const npm = require("../../../package.json");

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public appVersion;

  constructor() {}

  ngOnInit() {
    this.appVersion = npm.version;
  }
}
