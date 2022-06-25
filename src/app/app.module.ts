import { SponsorsModule } from "./sponsors/sponsors.module";
import { GeneralDataService } from "./services/general-data.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ShareButtonsConfig } from "ngx-sharebuttons";
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { AppRoutingModule } from "./app-routing.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ImgCarouselComponent } from "./img-carousel/img-carousel.component";
import { NewsComponent } from "./posts/news/news.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { ReportComponent } from "./posts/report/report.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { ResultsComponent } from "./results/results.component";
import { DocViewerComponent } from "./doc-viewer/doc-viewer.component";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";
import { DocumentService } from "./documents/document.service";
import { LocationService } from "app/services/location.service";
import { SeoService } from "app/services/seo.service";
import { environment } from "@wh-enviroments/environment";
import { FileServiceService } from "app/services/file-service.service";
import { TeamService } from "app/services/team.service";
import { HvwService } from "app/services/hvw.service";
import { Globals } from "@wh-objects/globals";
import { LoginComponent } from "./login/login.component";
import { EditComponent } from "./edit/edit.component";
import { AuthService } from "app/services/auth.service";
import { AuthGuard } from "./core/auth.guard";
import { ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { ContactComponent } from "./contact/contact.component";
import { DataProtectionComponent } from "./core/data-protection/data-protection.component";
import { GameTickerComponent } from "./game-ticker/game-ticker.component";
import { registerLocaleData, CommonModule } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";

export const firebaseConfig = environment.firebase;

registerLocaleData(localeDe);

const customConfig: ShareButtonsConfig = {
  include: ["facebook", "whatsapp", "copy", "twitter", "email", "print", "sms"],
  tags: "tsvWillsbach",
  theme: "default",
  gaTracking: true,
  autoSetMeta: true,
  twitterAccount: "willsbach_hndbl",
  prop: {
    copy: {
      text: "Link kopieren",
    },
    print: {
      text: "Drucken",
    },
    // and so on...
  },
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
    HomeComponent,
    ReportComponent,
    DownloadsComponent,
    ResultsComponent,
    DocViewerComponent,
    PostDetailComponent,
    LoginComponent,
    EditComponent,
    PageNotFoundComponent,
    ContactComponent,
    DataProtectionComponent,
    GameTickerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SponsorsModule,

    HttpClientModule,
    ShareButtonsModule.withConfig(customConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de" },
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
