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
    this.wp.getSponsors(false, true).subscribe(
      sponsors => this.sponsors = sponsors,
      error => { console.log('Sponsors', error); },
      () => {
        this.showSpinner = false;
        this.sponsors.forEach(element => {
          if (element.sizes.large !== null) {
            element.url = element.sizes.large.url;
          } else if (element.sizes.medium !== null) {
            element.url = element.sizes.medium.url;
          }
        });
      }
    );
  }

  ngOnInit() {
  }

}
