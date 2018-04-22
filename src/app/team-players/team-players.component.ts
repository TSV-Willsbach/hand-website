import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@wh-objects/team';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  private sub: any;
  team: Team;
  teamID: any;
  obTeam: Observable<Team>;

  constructor(private route: ActivatedRoute, teamService: TeamService, private seo: SeoService, private db: AngularFirestore) {
    // init data to hide console errors if nothing is found
    this.team = new Team();

    this.sub = this.route.params.subscribe(
      params => {
        this.teamID = params['id'];
        let test = this.db.collection('teams').doc(this.teamID);
        let obTeam = test.valueChanges();
        obTeam.subscribe(data => {
          this.team = data as Team;
          return data;
        });

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



}


