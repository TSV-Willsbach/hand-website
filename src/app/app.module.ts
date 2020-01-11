import { ConvertGameTimePipe } from './core/gameTimePipe';
import { GeneralDataService } from './shared/general-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsConfig } from '@ngx-share/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';
import { NewsComponent } from './posts/news/news.component';
import { FooterComponent } from './footer/footer.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './posts/report/report.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ResultsComponent } from './results/results.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { SponsorsDetailComponent } from './sponsors/sponsors-detail/sponsors-detail.component';
import { NavigationService } from './navigation/navigation.service';
import { DocumentService } from './documents/document.service';
import { LocationService } from '@wh-share/location.service';
import { SponsorsService } from '@wh-share/sponsors.service';
import { SeoService } from '@wh-share/seo.service';
import { environment } from '@wh-enviroments/environment';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { FileServiceService } from '@wh-share/file-service.service';
import { PlayerDetailComponent } from './team/player-detail/player-detail.component';
import { TeamService } from '@wh-share/team.service';
import { HvwService } from '@wh-share/hvw.service';
import { TeamResultComponent } from './team/team-result/team-result.component';
import { TeamPlayersComponent } from './team/team-players/team-players.component';
import { TeamReportsComponent } from './team/team-reports/team-reports.component';
import { TeamGamesComponent } from './team/team-games/team-games.component';
import { Globals } from '@wh-objects/globals';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AuthService } from '@wh-share/auth.service';
import { AuthGuard } from './core/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ReportCardsComponent } from '@wh-childs/report-cards/report-cards.component';
import { GameTableComponent } from './child-components/game-table/game-table.component';
import { ContactComponent } from './contact/contact.component';
import { DataProtectionComponent } from './core/data-protection/data-protection.component';
import { OutfitterFooterComponent } from '@wh-outfitter/outfitter-footer/outfitter-footer.component';
import { GameTickerComponent } from './game-ticker/game-ticker.component';
import { PlayerGameTableComponent } from './child-components/player-game-table/player-game-table.component';
import { TeamGalleryComponent } from './team/team-gallery/team-gallery.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeDe from '@angular/common/locales/de';

export const firebaseConfig = environment.firebase;

registerLocaleData(localeDe);

const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'whatsapp', 'copy', 'twitter', 'email', 'print', 'sms'],
  tags: 'tsvWillsbach',
  theme: 'default',
  gaTracking: true,
  autoSetMeta: true,
  twitterAccount: 'willsbach_hndbl',
  prop: {
    copy: {
      text: 'Link kopieren'
    },
    print: {
      text: 'Drucken'
    }
    // and so on...
  }
};

// Add an icon to the library for convenient access in other components
library.add(fas, far, fab);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ImgCarouselComponent,
    NewsComponent,
    FooterComponent,
    SponsorsComponent,
    HomeComponent,
    ReportComponent,
    DownloadsComponent,
    ResultsComponent,
    DocViewerComponent,
    PostDetailComponent,
    SponsorsDetailComponent,
    TeamDetailComponent,
    PlayerDetailComponent,
    TeamResultComponent,
    TeamPlayersComponent,
    TeamReportsComponent,
    TeamGamesComponent,
    LoginComponent,
    EditComponent,
    PageNotFoundComponent,
    ReportCardsComponent,
    GameTableComponent,
    ContactComponent,
    DataProtectionComponent,
    OutfitterFooterComponent,
    GameTickerComponent,
    PlayerGameTableComponent,
    ConvertGameTimePipe,
    TeamGalleryComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    HttpClientModule,
    ShareButtonsModule.withConfig(customConfig),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    NavigationService,
    DocumentService,
    LocationService,
    SponsorsService,
    SeoService,
    FileServiceService,
    TeamService,
    HvwService,
    Globals,
    AuthService,
    AuthGuard,
    GeneralDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
