import { Component, OnInit } from '@angular/core';
import { Sponsors } from '../sponsors';
import { SponsorsService } from '../shared/sponsors.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {


  sponsors: Sponsors[];

  constructor(private sponsorsS: SponsorsService) {
    this.sponsorsS.fetchSponsors().subscribe(sponsors => this.sponsors = sponsors);
  }

  ngOnInit() {
  }

}
