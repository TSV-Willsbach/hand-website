import { Component, OnInit } from '@angular/core';
import { SponsorsService } from '@wh-share/sponsors.service';
import { Sponsors } from '@wh-objects/sponsors';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {


  sponsors: Sponsors[];

  constructor(private sponsorsS: SponsorsService) {
    this.sponsorsS.fetchSponsors().subscribe(sponsors => this.sponsors = sponsors);
  }

  ngOnInit() {
  }

}
