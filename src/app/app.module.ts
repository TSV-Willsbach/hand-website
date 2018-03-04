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
import { AboutComponent } from './about/about.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ResultsComponent } from './results/results.component';
import { ChronicleComponent } from './chronicle/chronicle.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { CarouselService } from './shared/carousel.service';


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
    AboutComponent,
    DownloadsComponent,
    ResultsComponent,
    ChronicleComponent,
    DocViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    NavigationService,
    DocumentService,
    LocationService,
    CarouselService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
