import { Component, OnInit } from '@angular/core';
import { SponsorsService } from '../shared/sponsors.service';
import { Sponsors } from '../sponsors';

@Component({
  selector: 'app-sponsors-detail',
  templateUrl: './sponsors-detail.component.html',
  styleUrls: ['./sponsors-detail.component.css']
})
export class SponsorsDetailComponent implements OnInit {

  sponsors: Sponsors[];

  constructor(private sponsorsS: SponsorsService) {
    this.sponsorsS.fetchSponsors().subscribe(sponsors => this.sponsors = sponsors);
  }

  ngOnInit() {
  }

}
