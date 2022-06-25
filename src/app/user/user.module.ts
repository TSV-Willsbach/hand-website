import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
