import { SeoService } from '@wh-share/seo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@wh-objects/team';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from '@firebase/util';
import { TeamService } from '@wh-share/team.service';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss']
})
export class TeamPlayersComponent implements OnInit {
  team: Team;
  teamID: any;
  obTeam: Observable<Team>;
  sub: any;
  sorting: Array<any> = [{
    column: 'number',
    sort: 'asc'
  }, {
    column: 'joinedClub',
    sort: 'asc'
  }, {
    column: 'birthday',
    sort: 'asc'
  }, {
    column: 'names',
    sort: 'desc'
  }];

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private teamService: TeamService, private seo: SeoService) {
    // init data to hide console errors if nothing is found
    this.team = new Team();

    this.sub = this.route.params.subscribe(
      params => {
        this.teamID = params['id'];
        this.teamService.getTeam(this.teamID)
          .subscribe(
            team => this.team = team,
            error => { console.log(error); },
            () => {
              this.seo.generateTags({
                title: this.team.name,
                description: this.team.name,
                image: this.team.picture
              });
            });
        /*
        Firebase data
        const test = this.db.collection('teams').doc(this.teamID);
        const obTeam = test.valueChanges();
        obTeam.subscribe(data => {
          this.team = data as Team;
          return data;
        }); */

        // teamService.getTeam(this.teamID).subscribe(
        //   team => this.team = team,
        //   error => { console.log(error); },
        //   () => {
        //     this.seo.generateTags({
        //       title: this.team.title,
        //       description: this.team.title,
        //       image: this.team.picture
        //     });
        //   });
      },
      error => { console.log(error); },
      () => { });
  }

  ngOnInit() {

  }

  sortPlayer(col: string) {
    let firstRet, secondRet;
    const type = this.sorting.find(item =>
      item.column === col
    );
    if (type.sort === 'asc') {
      firstRet = -1;
      secondRet = 1;
      type.sort = 'desc';
    } else {
      firstRet = 1;
      secondRet = -1;
      type.sort = 'asc';
    }

    this.team.players.sort(function (a, b) {
      if (col === 'birthday') {
        const dateA = new Date(a[col]).getTime(), dateB = new Date(b[col]).getTime();
        console.log('A', dateA);
        if (type.sort === 'desc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
      if (col === 'names') {
        const nameA = `${a.prename} ${a.name}`;
        const nameB = `${b.prename} ${b.name}`;

        if (nameA < nameB) { return firstRet; }
        if (nameA > nameB) { return secondRet; }
      }

      if (a[col] < b[col]) { return firstRet; }
      if (a[col] > b[col]) { return secondRet; }
      return 0;
    });
  }
}


