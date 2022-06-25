import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocViewerComponent } from "app/generated/doc-viewer/doc-viewer.component";

const routes: Routes = [
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
    path: "aidAssociation",
    component: DocViewerComponent,
  },
  {
    path: "chronicle",
    component: DocViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratedRoutingModule {}
