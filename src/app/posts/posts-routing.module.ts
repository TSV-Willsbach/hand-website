import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { ReportComponent } from "./report/report.component";

const routes: Routes = [
  {
    path: "reports",
    component: ReportComponent,
  },
  {
    path: ":id/detail",
    component: PostDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
