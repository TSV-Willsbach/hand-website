import { Component, OnInit } from '@angular/core';
import { HvwService } from '@wh-share/hvw.service';
import { Ligue } from '@wh-objects/hvw';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  ligue: Ligue;

  constructor(private hvw: HvwService) {
    console.log(this.hvw);
    this.ligue = new Ligue();
    this.hvw.liga = '28818'; // Herren
    this.hvw.liga = '28842'; // Damen
    this.hvw.getLigueData().subscribe(
      ligue => this.ligue = ligue,
      error => { console.log(error); },
      () => { });
  }

  ngOnInit() {
  }

}
