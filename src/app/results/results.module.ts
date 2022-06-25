import { ResultsComponent } from "./results/results.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResultsRoutingModule } from "./results-routing.module";

@NgModule({
  declarations: [ResultsComponent],
  imports: [CommonModule, SharedModule, ResultsRoutingModule],
})
export class ResultsModule {}
