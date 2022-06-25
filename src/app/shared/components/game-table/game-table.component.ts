import { Globals } from "@wh-share/objects/globals";
import { Game } from "../../objects/hvw";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game-table",
  templateUrl: "./game-table.component.html",
  styleUrls: ["./game-table.component.scss"],
})
export class GameTableComponent implements OnInit {
  @Input() ligaName: string;
  @Input() games: Game[];

  constructor(private glob: Globals) {}

  ngOnInit() {}

  buildGymnUrl(game: Game) {
    const url = `${this.glob.gMapsSearch}${game.gymnasium.name},${game.gymnasium.street},${game.gymnasium.postal}+${game.gymnasium.city}`;
    return url;
  }
}
