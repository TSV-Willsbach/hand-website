import { WordpressService } from './../../shared/wordpress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors-detail',
  templateUrl: './sponsors-detail.component.html',
  styleUrls: ['./sponsors-detail.component.scss']
})
export class SponsorsDetailComponent implements OnInit {

  showSpinner = true;
  sponsors: any[];
  goldSponsors: any[];
  silverSponsors: any[];
  bronzeSponsors: any[];

  constructor(private wp: WordpressService) {
    this.wp.getSponsors(false).subscribe(
      sponsors => this.sponsors = sponsors,
      error => { console.log('Sponsors', error); },
      () => {
        this.showSpinner = false;
      }
    );
    this.loadSponsors();
  }

  ngOnInit() {
  }

  loadSponsors() {
    this.wp.getSponsors(false, 'gold').subscribe(
      sponsors => this.goldSponsors = sponsors,
      error => { console.log('Gold Sponsors', error); },
      () => {
        // this.showSpinner = false;
      }
    );
    this.wp.getSponsors(false, 'silver').subscribe(
      sponsors => this.silverSponsors = sponsors,
      error => { console.log('Silver Sponsors', error); },
      () => {
        // this.showSpinner = false;
      }
    );
    this.wp.getSponsors(false, 'bronze').subscribe(
      sponsors => this.bronzeSponsors = sponsors,
      error => { console.log('Bronze Sponsors', error); },
      () => {
        // this.showSpinner = false;
      }
    );
  }

}
