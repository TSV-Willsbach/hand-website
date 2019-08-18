import { WordpressService } from './../shared/wordpress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  showSpinner = true;
  sponsors: any[];

  constructor(private wp: WordpressService) {
    // this.sponsorsS.fetchSponsors().subscribe(sponsors => this.sponsors = sponsors);
    this.wp.getSponsors(false, true).subscribe(
      sponsors => this.sponsors = sponsors,
      error => { console.log('Sponsors', error); },
      () => {
        this.showSpinner = false;
      }
    );
  }

  ngOnInit() {
  }

}
