import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../shared/carousel.service';
import { Team } from '../teams';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
