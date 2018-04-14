import { Component, OnInit } from '@angular/core';
import { HvwService } from '@wh-share/hvw.service';
import { Club } from '@wh-objects/hvw';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  club: Club;

  constructor(private hvw: HvwService) {
    this.club = new Club();
    this.hvw.getClubData().subscribe(
      club => this.club = club,
      error => { console.log(error); },
      () => { console.log(this.club); });
  }

  ngOnInit() {
  }

}
