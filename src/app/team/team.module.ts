import { SharedModule } from "./../shared/shared.module";
import { TeamResultComponent } from "./team-result/team-result.component";
import { TeamReportsComponent } from "./team-reports/team-reports.component";
import { TeamPlayersComponent } from "./team-players/team-players.component";
import { TeamGamesComponent } from "./team-games/team-games.component";
import { TeamGalleryComponent } from "./team-gallery/team-gallery.component";
import { TeamDetailComponent } from "./team-detail/team-detail.component";
import { PlayerDetailComponent } from "./player-detail/player-detail.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeamRoutingModule } from "./team-routing.module";

@NgModule({
  declarations: [
    PlayerDetailComponent,
    TeamDetailComponent,
    TeamGalleryComponent,
    TeamGamesComponent,
    TeamPlayersComponent,
    TeamReportsComponent,
    TeamResultComponent,
  ],
  imports: [CommonModule, SharedModule, TeamRoutingModule],
})
export class TeamModule {}
