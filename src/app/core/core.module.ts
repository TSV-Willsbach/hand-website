import { DataProtectionComponent } from "./data-protection/data-protection.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
  declarations: [HomeComponent, PageNotFoundComponent, DataProtectionComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule],
})
export class CoreModule {}
