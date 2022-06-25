import { RouterModule } from "@angular/router";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ReportCardsComponent } from "./components/report-cards/report-cards.component";
import { PlayerGameTableComponent } from "./components/player-game-table/player-game-table.component";
import { GameTableComponent } from "./components/game-table/game-table.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConvertGameTimePipe } from "./pipes/gameTimePipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthGuard } from "@wh-share/auth.guard";
import { DocumentService } from "app/documents/document.service";
import { Globals } from "./objects/globals";
import { AuthService } from "./services/auth.service";
import { FileServiceService } from "./services/file-service.service";
import { GeneralDataService } from "./services/general-data.service";
import { HvwService } from "./services/hvw.service";
import { LocationService } from "./services/location.service";
import { SeoService } from "./services/seo.service";
import { TeamService } from "./services/team.service";
import { MDBBootstrapModule } from "angular-bootstrap-md";

const components = [
  GameTableComponent,
  PlayerGameTableComponent,
  ReportCardsComponent,
  ConvertGameTimePipe,
  SpinnerComponent,
];
const modules = [
  CommonModule,
  FontAwesomeModule,
  RouterModule,
  MDBBootstrapModule,
];
const providers = [
  DocumentService,
  LocationService,
  SeoService,
  FileServiceService,
  TeamService,
  HvwService,
  Globals,
  AuthService,
  AuthGuard,
  GeneralDataService,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [...providers],
})
export class SharedModule {}
