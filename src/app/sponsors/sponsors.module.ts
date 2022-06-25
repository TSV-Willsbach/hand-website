import { SponsorsComponent } from "./sponsors/sponsors.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SponsorsRoutingModule } from "./sponsors-routing.module";
import { SponsorsDetailComponent } from "./sponsors-detail/sponsors-detail.component";
import { OutfitterFooterComponent } from "@wh-outfitter/outfitter-footer/outfitter-footer.component";

@NgModule({
  declarations: [
    SponsorsComponent,
    SponsorsDetailComponent,
    OutfitterFooterComponent,
  ],
  imports: [CommonModule, SharedModule, SponsorsRoutingModule],
  exports: [SponsorsComponent],
})
export class SponsorsModule {}
