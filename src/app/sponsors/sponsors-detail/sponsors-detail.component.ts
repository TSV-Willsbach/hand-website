import { Component, OnInit } from '@angular/core';
import { SponsorsService } from '@wh-share/sponsors.service';
import { Sponsors } from '@wh-objects/sponsors';

@Component({
  selector: 'app-sponsors-detail',
  templateUrl: './sponsors-detail.component.html',
  styleUrls: ['./sponsors-detail.component.scss']
})
export class SponsorsDetailComponent implements OnInit {

  sponsors: Sponsors[];

  constructor(private sponsorsS: SponsorsService) {
    this.sponsorsS.fetchSponsors().subscribe(sponsors => this.sponsors = sponsors);
  }

  ngOnInit() {
  }

}
