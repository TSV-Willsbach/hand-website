import { Component, OnInit, Input, ElementRef, Renderer2 } from "@angular/core";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService) {
    console.log("User", auth.user);
  }

  ngOnInit() {}

  onMenuClick() {}

  logout() {
    this.auth.signOut();
  }
}
