import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Team } from "@wh-objects/team";
import { Ligue } from "@wh-objects/hvw";
import { HvwService } from "app/services/hvw.service";
import { TeamService } from "app/services/team.service";
import { SeoService } from "app/services/seo.service";
import { Globals } from "@wh-objects/globals";

@Component({
  selector: "app-team-games",
  templateUrl: "./team-games.component.html",
  styleUrls: ["./team-games.component.scss"],
})
export class TeamGamesComponent implements OnInit {
  teamID: any;
  private sub: any;
  ligue: Ligue;
  team: Team;

  constructor(
    private route: ActivatedRoute,
    private hvw: HvwService,
    teams: TeamService,
    private seo: SeoService,
    private global: Globals
  ) {
    this.ligue = new Ligue();
    this.team = new Team();

    this.sub = this.route.params.subscribe((params) => {
      this.teamID = params["id"];
      teams.getTeam(this.teamID).subscribe(
        (team) => (this.team = team),
        (error) => {
          console.log(error);
        },
        () => {
          this.hvw.liga = this.team.hvw.liga;
          this.hvw.getLigueData().subscribe(
            (ligue) => (this.ligue = ligue),
            (error) => {
              console.log(error);
            },
            () => {
              if (this.ligue.games !== undefined) {
                this.ligue.games = this.ligue.games.filter(
                  (x) => this.isClub(x.team.home) || this.isClub(x.team.guest)
                );
                this.ligue.games = this.ligue.games.filter(
                  (x) => x.points.home === 0 && x.points.guest === 0
                );
              }
            }
          );
        }
      );
    });
  }

  ngOnInit() {}

  hasLink(url: string): Boolean {
    if (url === undefined || url === null) {
      return false;
    } else {
      return true;
    }
  }

  isClub(value): Boolean {
    return this.global.isOwnClub(value);
  }
}
