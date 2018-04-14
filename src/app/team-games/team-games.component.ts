import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@wh-objects/team';
import { Ligue } from '@wh-objects/hvw';
import { HvwService } from '@wh-share/hvw.service';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.css']
})
export class TeamGamesComponent implements OnInit {

  teamID: any;
  private sub: any;
  ligue: Ligue;
  team: Team;

  constructor(private route: ActivatedRoute, private hvw: HvwService, teams: TeamService, private seo: SeoService) {
    this.ligue = new Ligue();


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
              let actClubGames = games.filter(element => element.gGuestTeam == "TSV Willsbach" || element.gHomeTeam == "TSV Willsbach");
              games = ligue.content.futureGames.games;
              let futClubGames = games.filter(element => element.gGuestTeam == "TSV Willsbach" || element.gHomeTeam == "TSV Willsbach");

              ligue.content.actualGames.games = actClubGames.concat(futClubGames);
              this.ligue = ligue;
              return ligue;
            },
            error => { console.log(error); },
            () => {
              console.log(this.ligue);
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
