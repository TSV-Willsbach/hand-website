import { Component, OnInit } from '@angular/core';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Seite nicht gefunden',
      description: '404 Seite nicht gefunden'
    });
  }

}
