import { Game } from './../../objects/hvw';
import { Ligue } from '@wh-objects/hvw';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  @Input() ligaName: string;
  @Input() games: Game[];

  constructor() { }

  ngOnInit() {
  }

}
