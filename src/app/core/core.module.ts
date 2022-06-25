import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { ContactComponent } from "./contact/contact.component";
import { PostsModule } from "./../posts/posts.module";
import { ImgCarouselComponent } from "./img-carousel/img-carousel.component";
import { DataProtectionComponent } from "./data-protection/data-protection.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    DataProtectionComponent,
    ImgCarouselComponent,
    ContactComponent,
    DownloadsComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, SharedModule, PostsModule, CoreRoutingModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
