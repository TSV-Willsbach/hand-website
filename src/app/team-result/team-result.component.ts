import { Component, OnInit } from '@angular/core';
import { HvwService } from '@wh-share/hvw.service';
import { Ligue } from '@wh-objects/hvw';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@wh-share/seo.service';
import { TeamService } from '@wh-share/team.service';
import { Team } from '@wh-objects/team';

@Component({
  selector: 'app-team-result',
  templateUrl: './team-result.component.html',
  styleUrls: ['./team-result.component.css']
})
export class TeamResultComponent implements OnInit {

  private sub: any;
  ligue: Ligue;
  team: Team;

  constructor(private route: ActivatedRoute, private hvw: HvwService, teams: TeamService, private seo: SeoService) {
    this.ligue = new Ligue();


    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      teams.getTeam(id).subscribe(
        team => this.team = team,
        error => { console.log(error); },
        () => {
          this.hvw.liga = this.team.ligaID;
          this.hvw.allGames = '1'; // all games = true
          this.hvw.getLigueData().subscribe(
            ligue => this.ligue = ligue,
            error => { console.log(error); },
            () => {
              this.seo.generateTags({
                title: this.ligue.head.name,
                description: this.ligue.head.headline2,
                // image: this.player.picture
              });
            });
        });
    });
  }

  ngOnInit() {
  }

}
