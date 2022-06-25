import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SponsorsDetailComponent } from "./sponsors-detail/sponsors-detail.component";

const routes: Routes = [
  {
    path: "",
    component: SponsorsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorsRoutingModule {}
