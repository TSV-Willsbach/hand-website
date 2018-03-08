import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { NavigationService } from './navigation/navigation.service';
import { DocumentService } from './documents/document.service';
import { LocationService } from './shared/location.service';
import { ReportComponent } from './report/report.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ResultsComponent } from './results/results.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { CarouselService } from './shared/carousel.service';
import { NewsService } from './shared/news.service';
import { SponsorsService } from './shared/sponsors.service';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';

const options: ShareButtonsOptions = {
  include: ['facebook', 'twitter', 'google', 'whatsapp', 'email', 'copy', 'print'],
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
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ShareButtonsModule.forRoot({ options: options })
  ],
  providers: [
    NavigationService,
    DocumentService,
    LocationService,
    CarouselService,
    NewsService,
    SponsorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
