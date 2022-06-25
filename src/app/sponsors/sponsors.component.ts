import { WordpressService } from "../services/wordpress.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sponsors",
  templateUrl: "./sponsors.component.html",
  styleUrls: ["./sponsors.component.scss"],
})
export class SponsorsComponent implements OnInit {
  showSpinner = true;
  sponsors: any[];

  constructor(private wp: WordpressService) {
    this.wp.getSponsors(false, "premium").subscribe(
      (sponsors) => (this.sponsors = sponsors),
      (error) => {
        console.log("Sponsors footer", error);
      },
      () => {
        this.wp.getSponsors(false, "gold").subscribe(
          (sponsors) => {
            if (this.sponsors !== undefined) {
              sponsors.forEach((element) => {
                this.sponsors.push(element);
              });
            } else {
              this.sponsors = sponsors;
            }
          },
          (error) => {
            console.log("Gold Sponsors footer", error);
          },
          () => {
            this.showSpinner = false;
            this.sponsors.forEach((element) => {
              if (element.sizes.medium !== null) {
                element.url = element.sizes.medium.url;
              } else if (element.sizes.large !== null) {
                element.url = element.sizes.large.url;
              }
            });
          }
        );
      }
    );
  }

  ngOnInit() {}
}
