import { EditComponent } from "./edit/edit.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "@wh-share/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, EditComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
