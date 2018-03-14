import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselService } from '@wh-share/carousel.service';
import { Team } from '@wh-objects/teams';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})

export class ImgCarouselComponent implements OnInit {
  teams: Team[];

  constructor(private transitionService: CarouselService, carouselConfig: NgbCarouselConfig) {

    this.transitionService.fetchTeams().subscribe(team => this.teams = team);
    carouselConfig.interval = 5000;
  }

  ngOnInit() {
  }
}
