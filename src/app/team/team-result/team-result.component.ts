import { Statistik } from './../../objects/hvw';
import { Component, OnInit } from '@angular/core';
import { HvwService } from '@wh-share/hvw.service';
import { Ligue } from '@wh-objects/hvw';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@wh-share/seo.service';
import { TeamService } from '@wh-share/team.service';
import { Team } from '@wh-objects/team';
import { Globals } from '@wh-objects/globals';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-result',
  templateUrl: './team-result.component.html',
  styleUrls: ['./team-result.component.scss']
})
export class TeamResultComponent implements OnInit {

  teamID: any;
  stats: Statistik;
  private sub: any;
  ligue: Ligue;
  secondLigueText: string;
  team: Team;
  myHVW: any;
  buttonActive: Boolean = false;
  showSpinner = false;

  constructor(private route: ActivatedRoute, private hvw: HvwService,
    teams: TeamService, private seo: SeoService, private global: Globals) {
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
    this.myHVW = this.hvw.getLigueData().subscribe(
      ligue => this.ligue = ligue,
      error => { console.log(error); },
      () => {
        this.showSpinner = false;
        if (this.ligue.games !== undefined) {
          this.ligue.games = this.ligue.games.filter((x) => this.isClub(x.team.home) || this.isClub(x.team.guest));
        }
        if (this.ligue.scores !== undefined) {
          const myTeam = this.ligue.scores.filter((f) => {
            if (this.isClub(f.name)) {
              return f;
            }
          });
          this.stats = myTeam[0].statistics;
        }
        this.seo.generateTags({
          title: this.ligue.name,
          description: this.ligue.headline2,
        });
      });
  }

  private changeLigueParams() {
    let id;
    let text;
    this.showSpinner = true;

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
    return this.global.isOwnClub(value);
  }
}
