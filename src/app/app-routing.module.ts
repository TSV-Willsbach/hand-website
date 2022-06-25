import { ContactComponent } from "./contact/contact.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DownloadsComponent } from "./downloads/downloads.component";
import { AuthGuard } from "./core/auth.guard";
import { EditComponent } from "./edit/edit.component";
import { GameTickerComponent } from "./game-ticker/game-ticker.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./core/core.module").then((m) => m.CoreModule),
  },
  {
    path: "posts",
    loadChildren: () =>
      import("./posts/posts.module").then((m) => m.PostsModule),
  },
  {
    path: "downloads",
    component: DownloadsComponent,
  },
  {
    path: "results",
    loadChildren: () =>
      import("./results/results.module").then((m) => m.ResultsModule),
  },

  {
    path: "sponsors",
    loadChildren: () =>
      import("./sponsors/sponsors.module").then((m) => m.SponsorsModule),
  },
  {
    path: "contact",
    component: ContactComponent,
  },

  {
    path: "team",
    loadChildren: () => import("./team/team.module").then((m) => m.TeamModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "gen",
    loadChildren: () =>
      import("./generated/generated.module").then((m) => m.GeneratedModule),
  },
  {
    path: "ticker/:gToken",
    component: GameTickerComponent,
  },
  {
    path: "edit",
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    loadChildren: () => import("./core/core.module").then((m) => m.CoreModule),
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
