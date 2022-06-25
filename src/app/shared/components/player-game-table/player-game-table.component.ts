import { Component, OnInit, Input } from "@angular/core";
import { PlayerInfo } from "@wh-objects/hvw";

@Component({
  selector: "app-player-game-table",
  templateUrl: "./player-game-table.component.html",
  styleUrls: ["./player-game-table.component.scss"],
})
export class PlayerGameTableComponent implements OnInit {
  @Input() team: PlayerInfo[];
  @Input() teamName: string;

  constructor() {}

  ngOnInit() {}
}
