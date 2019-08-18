import { WordpressService } from './../shared/wordpress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss']
})

export class ImgCarouselComponent implements OnInit {
  teams: any[];
  showSpinner = true;

  constructor(private wp: WordpressService) {

    this.wp.getTeamPictures(false).subscribe(
      team => this.teams = team,
      error => console.log('Error: ', error),
      () => {
        this.showSpinner = false;
      });
  }

  ngOnInit() {
  }
}
