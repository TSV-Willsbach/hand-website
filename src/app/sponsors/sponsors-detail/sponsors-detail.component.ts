import { WordpressService } from "../../shared/services/wordpress.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sponsors-detail",
  templateUrl: "./sponsors-detail.component.html",
  styleUrls: ["./sponsors-detail.component.scss"],
})
export class SponsorsDetailComponent implements OnInit {
  showPremiumSpinner = true;
  showGoldSpinner = true;
  showSilverSpinner = true;
  showBronzeSpinner = true;
  premiumSponsors: any[];
  goldSponsors: any[];
  silverSponsors: any[];
  bronzeSponsors: any[];

  constructor(private wp: WordpressService) {
    this.loadSponsors();
  }

  ngOnInit() {}

  loadSponsors() {
    this.wp.getSponsors(false, "premium").subscribe(
      (sponsors) => (this.premiumSponsors = sponsors),
      (error) => {
        console.log("Premium Sponsors", error);
      },
      () => {
        this.showPremiumSpinner = false;
      }
    );

    this.wp.getSponsors(false, "gold").subscribe(
      (sponsors) => (this.goldSponsors = sponsors),
      (error) => {
        console.log("Gold Sponsors", error);
      },
      () => {
        this.showGoldSpinner = false;
      }
    );
    this.wp.getSponsors(false, "silver").subscribe(
      (sponsors) => (this.silverSponsors = sponsors),
      (error) => {
        console.log("Silver Sponsors", error);
      },
      () => {
        this.showSilverSpinner = false;
      }
    );
    this.wp.getSponsors(false, "bronze").subscribe(
      (sponsors) => (this.bronzeSponsors = sponsors),
      (error) => {
        console.log("Bronze Sponsors", error);
      },
      () => {
        this.showBronzeSpinner = false;

        this.bronzeSponsors.forEach((element) => {
          element.url = null;
          element.alt_text = null;
        });
      }
    );
  }
}
