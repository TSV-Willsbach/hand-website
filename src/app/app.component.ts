import { Component, OnInit } from "@angular/core";
import { LocationService } from "./shared/location.service";
import {
  DocumentService,
  DocumentContents,
} from "./documents/document.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "app";
  currentDocument: DocumentContents;
  isStaticContent = false;

  constructor(
    private locationService: LocationService,
    private documentService: DocumentService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga("set", "page", event.urlAfterRedirects);
        (<any>window).ga("send", "pageview");
      }
    });
  }

  onActivate() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.documentService.currentDocument.subscribe((doc) => {
      this.currentDocument = doc;
    });
  }

  updateHostClassesForDoc() {
    // Do nothing for now
  }
}
