import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact/contact.component";
import { DataProtectionComponent } from "./data-protection/data-protection.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "dataprotection",
    component: DataProtectionComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "downloads",
    component: DownloadsComponent,
  },
  {
    path: "404",
    component: PageNotFoundComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
