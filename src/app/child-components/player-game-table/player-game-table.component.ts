import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { GameTickerTeams, GameTickerInfo, PlayerInfo } from '@wh-objects/hvw';

@Component({
  selector: 'app-player-game-table',
  templateUrl: './player-game-table.component.html',
  styleUrls: ['./player-game-table.component.scss']
})
export class PlayerGameTableComponent implements OnInit {

  @Input() team: PlayerInfo[];
  @Input() teamName: string;

  constructor() { }

  ngOnInit() {
  }
}

@Pipe({ name: 'convertTime' })
export class ConvertTimePipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor(value);
  }
}
