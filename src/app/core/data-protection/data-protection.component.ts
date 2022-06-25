import { SeoService } from "../../services/seo.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-protection",
  templateUrl: "./data-protection.component.html",
  styleUrls: ["./data-protection.component.scss"],
})
export class DataProtectionComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.generateTags({
      title: "Datenschutz",
      description: "Datenschutzverordnung",
    });
  }
}
