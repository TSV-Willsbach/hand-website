import { Component, OnInit } from '@angular/core';
import { CarouselService } from '@wh-share/carousel.service';
import { TeamWP } from '@wh-objects/wordPress';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss']
})

export class ImgCarouselComponent implements OnInit {
  teams: TeamWP[];

  constructor(private transitionService: CarouselService) {

    this.transitionService.fetchTeams(false).subscribe(team => this.teams = team);
  }

  ngOnInit() {
  }
}
