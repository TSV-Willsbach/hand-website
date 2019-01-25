import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@wh-objects/team';
import { Ligue } from '@wh-objects/hvw';
import { HvwService } from '@wh-share/hvw.service';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';
import { Globals } from '@wh-objects/globals';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss']
})
export class TeamGamesComponent implements OnInit {

  teamID: any;
  private sub: any;
  ligue: Ligue;
  team: Team;

  constructor(private route: ActivatedRoute, private hvw: HvwService, teams: TeamService,
    private seo: SeoService, private global: Globals) {
    this.ligue = new Ligue();
    this.team = new Team();


    this.sub = this.route.params.subscribe(params => {
      this.teamID = params['id'];
      teams.getTeam(this.teamID).subscribe(
        team => this.team = team,
        error => { console.log(error); },
        () => {
          this.hvw.allGames = '0'; // all games = false
          this.hvw.getAllGamesForTeam(this.team).subscribe(ligue => this.ligue = ligue);
        });
    });
  }

  ngOnInit() {
  }

  hasLink(url: string): Boolean {
    if (url === undefined || url === null) {
      return false;
    } else {
      return true;
    }
  }

}
