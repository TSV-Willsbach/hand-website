import { DocViewerComponent } from "./doc-viewer/doc-viewer.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GeneratedRoutingModule } from "./generated-routing.module";

@NgModule({
  declarations: [DocViewerComponent],
  imports: [CommonModule, GeneratedRoutingModule],
})
export class GeneratedModule {}
