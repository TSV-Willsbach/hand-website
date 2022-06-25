import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./core/core.module").then((m) => m.CoreModule),
  },
  {
    path: "posts",
    loadChildren: () =>
      import("./posts/posts.module").then((m) => m.PostsModule),
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
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/home",
    pathMatch: "full",
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
