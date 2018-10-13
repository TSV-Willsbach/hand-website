import { Component, OnInit } from '@angular/core';
import { HvwService } from '@wh-share/hvw.service';
import { Club } from '@wh-objects/hvw';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  clubs: Club[];

  constructor(private hvw: HvwService) {
    this.clubs = new Array<Club>();

    this.hvw.getClubData().subscribe(
      club => {
        this.clubs.push(club);
      },
      error => { console.log(error); },
      () => { });

    this.hvw.period = '62';
    this.hvw.getClubData().subscribe(
      club => {
        this.clubs.push(club);
      },
      error => { console.log(error); },
      () => { }
    );
  }

  ngOnInit() {
  }

}
