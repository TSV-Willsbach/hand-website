import { Component, OnInit } from '@angular/core';

const slidesPath = 'assets/content/slides.json';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})

export class ImgCarouselComponent implements OnInit {
  public activeCarousel = 1;

  constructor() {
  }

  ngOnInit() {
  }

  onPrevPress() {
    this.activeCarousel = this.activeCarousel > 1 ? this.activeCarousel - 1 : 2;
    console.log(this.activeCarousel)
  }

  onNextPress() {
    this.activeCarousel = this.activeCarousel < 2 ? this.activeCarousel + 1 : 1;
    console.log(this.activeCarousel)
  }

}
