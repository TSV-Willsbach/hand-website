import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ResultsComponent } from './results/results.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SponsorsDetailComponent } from './sponsors-detail/sponsors-detail.component';
import { NavigationService } from './navigation/navigation.service';
import { DocumentService } from './documents/document.service';
import { LocationService } from '@wh-share/location.service';
import { NewsService } from '@wh-share/news.service';
import { CarouselService } from '@wh-share/carousel.service';
import { SponsorsService } from '@wh-share/sponsors.service';
import { SeoService } from '@wh-share/seo.service';
import { environment } from '@wh-enviroments/environment';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { FileServiceService } from '@wh-share/file-service.service';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
export const firebaseConfig = environment.firebase;

const options: ShareButtonsOptions = {
  include: ['facebook', 'whatsapp', 'copy', 'twitter', 'google', 'email', 'print'],
  tags: 'tsvWillsbach',
  twitterAccount: 'willsbach_hndbl'
}

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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    HttpClientModule,
    ShareButtonsModule.forRoot({ options: options }),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    NavigationService,
    DocumentService,
    LocationService,
    CarouselService,
    NewsService,
    SponsorsService,
    SeoService,
    FileServiceService,
    TeamService,
    HvwService,
    Globals,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
