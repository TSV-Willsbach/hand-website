import { DataProtectionComponent } from "./core/data-protection/data-protection.component";
import { ContactComponent } from "./contact/contact.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DownloadsComponent } from "./downloads/downloads.component";
import { HomeComponent } from "./home/home.component";
import { ReportComponent } from "./posts/report/report.component";
import { ResultsComponent } from "./results/results.component";
import { DocViewerComponent } from "./doc-viewer/doc-viewer.component";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";
import { SponsorsDetailComponent } from "./sponsors/sponsors-detail/sponsors-detail.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./core/auth.guard";
import { EditComponent } from "./edit/edit.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { GameTickerComponent } from "./game-ticker/game-ticker.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "reports",
    component: ReportComponent,
  },
  {
    path: "downloads",
    component: DownloadsComponent,
  },
  {
    path: "results",
    component: ResultsComponent,
  },
  {
    path: "chronicle",
    component: DocViewerComponent,
  },
  {
    path: "sponsors",
    component: SponsorsDetailComponent,
  },
  {
    path: "referee",
    component: DocViewerComponent,
  },
  {
    path: "imprint",
    component: DocViewerComponent,
  },
  {
    path: "training",
    component: DocViewerComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "dataprotection",
    component: DataProtectionComponent,
  },
  {
    path: "aidAssociation",
    component: DocViewerComponent,
  },
  {
    path: "postDetail/:id",
    component: PostDetailComponent,
  },
  {
    path: "team",
    loadChildren: () => import("./team/team.module").then((m) => m.TeamModule),
  },
  {
    path: "ticker/:gToken",
    component: GameTickerComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "edit",
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
