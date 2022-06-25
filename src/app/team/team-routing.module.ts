import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlayerDetailComponent } from "./player-detail/player-detail.component";
import { TeamDetailComponent } from "./team-detail/team-detail.component";
import { TeamGalleryComponent } from "./team-gallery/team-gallery.component";
import { TeamGamesComponent } from "./team-games/team-games.component";
import { TeamPlayersComponent } from "./team-players/team-players.component";
import { TeamReportsComponent } from "./team-reports/team-reports.component";
import { TeamResultComponent } from "./team-result/team-result.component";

const routes: Routes = [
  {
    path: ":id",
    component: TeamDetailComponent,
  },
  {
    path: ":id/results",
    component: TeamResultComponent,
  },
  {
    path: ":id/games",
    component: TeamGamesComponent,
  },
  {
    path: ":id/reports",
    component: TeamReportsComponent,
  },
  {
    path: ":id/gallery",
    component: TeamGalleryComponent,
  },
  {
    path: ":id/players",
    component: TeamPlayersComponent,
  },
  {
    path: ":id/players/:playerId",
    component: PlayerDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
