import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { NavigationService, NavigationNode, VersionInfo } from './navigation/navigation.service';
import { LocationService } from './shared/location.service';
import { DocumentService, DocumentContents } from './documents/document.service';

import 'rxjs/add/operator/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  versionInfo: VersionInfo;
  currentDocument: DocumentContents;

  constructor(
    private navigationService: NavigationService,
    private locationService: LocationService,
    private documentService: DocumentService,
  ) { }

  ngOnInit() {

    this.documentService.currentDocument.subscribe(doc => this.currentDocument = doc);
    // Generally, we want to delay updating the host classes for the new document, until after the
    // leaving document has been removed (to avoid having the styles for the new document applied
    // prematurely).
    // On the first document, though, (when we know there is no previous document), we want to
    // ensure the styles are applied as soon as possible to avoid flicker.
//    this.documentService.currentDocument.first().subscribe(doc => this.updateHostClassesForDoc(doc));

/*     this.locationService.currentPath.subscribe(path => {
      // Redirect to docs if we are in archive mode and are not hitting a docs page
      // (i.e. we have arrived at a marketing page)
      if (this.deployment.mode === 'archive' && !/^(docs$|api|guide|tutorial)/.test(path)) {
        this.locationService.replace('docs');
      }
      if (path === this.currentPath) {
        // scroll only if on same page (most likely a change to the hash)
        this.autoScroll();
      } else {
        // don't scroll; leave that to `onDocRendered`
        this.currentPath = path;

        // Start progress bar if doc not rendered within brief time
        clearTimeout(this.isFetchingTimeout);
        this.isFetchingTimeout = setTimeout(() => this.isFetching = true, 200);
      }
    }); */

  }

  updateHostClassesForDoc(doc: DocumentContents) {
    //Do nothing for now
  }

}
