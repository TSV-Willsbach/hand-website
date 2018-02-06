import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

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
import { ReportComponent } from './report/report.component';
import { AboutComponent } from './about/about.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ResultsComponent } from './results/results.component';
import { ChronicleComponent } from './chronicle/chronicle.component';


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
    ChronicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
