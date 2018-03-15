import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';

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
import { TeamDetailComponent } from './team-detail/team-detail.component';


const options: ShareButtonsOptions = {
  include: ['facebook', 'whatsapp', 'copy', 'twitter', 'google', 'email', 'print'],
  tags: 'tsvWillsbach',
  twitterAccount: 'willsbach_hndbl'
}


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
    TeamDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ShareButtonsModule.forRoot({ options: options }),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
    NavigationService,
    DocumentService,
    LocationService,
    CarouselService,
    NewsService,
    SponsorsService,
    SeoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
