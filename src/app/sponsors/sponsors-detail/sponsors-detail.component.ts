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

  constructor(private wp: WordpressService) {
    this.wp.getSponsors(false, false).subscribe(
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
