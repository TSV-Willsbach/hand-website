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
          this.hvw.liga = this.team.ligaID;
          this.hvw.allGames = '0'; // all games = false
          this.hvw.getNextGames().subscribe(
            ligue => {
              let games = ligue.content.actualGames.games;
              const actClubGames = games.filter(element => this.global.isOwnClub(element.gGuestTeam) === true
                || this.global.isOwnClub(element.gHomeTeam) === true);
              games = ligue.content.futureGames.games;
              const futClubGames = games.filter(element => this.global.isOwnClub(element.gGuestTeam) === true
                || this.global.isOwnClub(element.gHomeTeam) === true);

              ligue.content.actualGames.games = actClubGames.concat(futClubGames);
              this.ligue = ligue;
              return ligue;
            },
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

  hasLink(url: string): Boolean {
    if (url === undefined || url === null) {
      return false;
    } else {
      return true;
    }
  }

}
