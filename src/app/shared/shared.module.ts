import { RouterModule } from "@angular/router";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ReportCardsComponent } from "./components/report-cards/report-cards.component";
import { PlayerGameTableComponent } from "./components/player-game-table/player-game-table.component";
import { GameTableComponent } from "./components/game-table/game-table.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConvertGameTimePipe } from "./pipes/gameTimePipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const components = [
  GameTableComponent,
  PlayerGameTableComponent,
  ReportCardsComponent,
  ConvertGameTimePipe,
  SpinnerComponent,
];
const modules = [CommonModule, FontAwesomeModule, RouterModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
