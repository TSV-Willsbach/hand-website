import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Team } from "@wh-share/objects/team";
import { TeamService } from "@wh-share/services/team.service";
import { SeoService } from "@wh-share/services/seo.service";
import { WPPicture } from "@wh-share/objects/wordPress";
import { WordpressService } from "@wh-share/services/wordpress.service";

@Component({
  selector: "app-team-gallery",
  templateUrl: "./team-gallery.component.html",
  styleUrls: ["./team-gallery.component.scss"],
})
export class TeamGalleryComponent implements OnInit {
  teamID: any;
  private sub: any;
  team: Team;
  pictures: any[];
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private teams: TeamService,
    private seo: SeoService,
    private wp: WordpressService
  ) {
    this.team = new Team();

    this.sub = this.route.params.subscribe((params) => {
      this.teamID = params["id"];
      this.teams.getTeam(this.teamID).subscribe(
        (team) => (this.team = team),
        (error) => {
          console.log(error);
        },
        () => {
          console.log("FoundT", this.team);
          this.wp.getTeamPictures(undefined, this.team.wp.id).subscribe(
            (pic) => (this.pictures = pic),
            (error) => {
              console.log(error);
            },
            () => {
              this.showSpinner = false;
            }
          );
        }
      );
    });
  }

  ngOnInit() {}
}
