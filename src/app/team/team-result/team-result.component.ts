import { Component, OnInit } from '@angular/core';
import { HvwService } from '@wh-share/hvw.service';
import { Ligue } from '@wh-objects/hvw';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@wh-share/seo.service';
import { TeamService } from '@wh-share/team.service';
import { Team } from '@wh-objects/team';
import { Globals } from '@wh-objects/globals';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-team-result',
  templateUrl: './team-result.component.html',
  styleUrls: ['./team-result.component.scss']
})
export class TeamResultComponent implements OnInit {

  teamID: any;
  private sub: any;
  ligue: Ligue;
  secondLigueText: string;
  team: Team;
  myHVW: any;
  buttonActive: Boolean = false;

  constructor(private route: ActivatedRoute, private hvw: HvwService,
    teams: TeamService, private seo: SeoService, private global: Globals) {
    this.ligue = new Ligue();
    this.team = new Team();
    this.teamID = '';


    this.sub = this.route.params.subscribe(params => {
      this.teamID = params['id'];
      teams.getTeam(this.teamID).subscribe(
        team => this.team = team,
        error => { console.log(error); },
        () => {
          this.hvw.liga = this.team.ligaID;
          this.hvw.allGames = '1'; // all games = true
          this.getApiData();
          this.changeLigueParams();
        });
    });
  }

  private getApiData() {
    this.myHVW = this.hvw.getLigueData().subscribe(ligue => {
      this.ligue = ligue;
      let games = ligue.content.actualGames.games;
      games = ligue.content.futureGames.games;
      const futClubGames = games.filter(element => element.gGuestTeam === this.global.clubName
        || element.gHomeTeam === this.global.clubName);

      ligue.content.actualGames.games = futClubGames;
      return this.ligue;
    }, error => { console.log(error); }, () => {
      this.seo.generateTags({
        title: this.ligue.head.name,
        description: this.ligue.head.headline2,
      });
    });
  }

  private changeLigueParams() {
    let id;
    let text;

    if (this.secondLigueText === undefined) {
      // init data
      const data = this.pokalOrQual();
      text = data.init;
      id = this.hvw.liga;
    } else {
      if (this.hvw.liga !== this.team.ligaID) {
        id = this.team.ligaID;
        const data = this.pokalOrQual();
        text = data.init;
      } else {
        const data = this.pokalOrQual();
        text = data.text;
        id = data.id;
      }
    }

    this.hvw.liga = id;
    this.secondLigueText = text + ' wechseln';
  }

  hasLink(id: number): Boolean {
    if (id === 0) {
      return true;
    } else {
      return false;
    }
  }

  pokalOrQual(): any {
    let id;
    let init;
    if (this.team.qualID != null) {
      id = this.team.qualID;
      init = 'Zur Qualifikation';
    } else if (this.team.pokalID != null) {
      id = this.team.pokalID;
      init = 'Zum Pokal';
    } else {
      init = '';
      this.buttonActive = true;
    }
    return { id: id, text: 'Zur Saison', init: init };
  }

  changeLigue() {
    this.myHVW.unsubscribe();
    this.changeLigueParams();
    this.getApiData();
  }

  ngOnInit() {
  }

  isClub(value): Boolean {
    return value === this.global.clubName;
  }
}
