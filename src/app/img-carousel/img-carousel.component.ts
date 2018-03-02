import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../shared/carousel.service';

const slidesPath = 'assets/content/slides.json';
const active = "carousel-item active";
const inactive = "carousel-item";
const transitionLeft = "carousel-item-left active";
const transitionLeftNext = "carousel-item-next carousel-item-left";


@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})

export class ImgCarouselComponent implements OnInit {


  public firstItem = "carousel-item active";
  public secondItem = "carousel-item";
  public itemClasses = ["carousel-item active", "carousel-item"];
  private idx = 0;

  constructor(private transitionService: CarouselService) {
    this.transitionService.transitionClasses.subscribe(val => {
      switch (val.tick) {
        case 0:
          this.itemClasses[this.idx] = val.class;
          break;
        case 1:
          this.itemClasses[this.next(this.idx)] = val.class;
          break;
        default:
          this.itemClasses[this.next(this.idx)] = val.class;
          this.itemClasses[this.idx] = inactive;
          this.idx = this.next(this.idx);
          break;
      }
    })
  }

  next(idx) {
    return idx === 0 ? 1 : 0;
  }

  ngOnInit() {
  }

  /*   onPrevPress() {
      this.activeCarousel = this.activeCarousel > 1 ? this.activeCarousel - 1 : 2;
      console.log(this.activeCarousel)
    }
  
    onNextPress() {
      this.activeCarousel = this.activeCarousel < 2 ? this.activeCarousel + 1 : 1;
      console.log(this.activeCarousel)
    } */

}
