import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@wh-objects/post';
import { Team } from '@wh-objects/team';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  team: Team;
  posts: Post[];
  sub: any;

  constructor(private route: ActivatedRoute, teamService: TeamService, private seo: SeoService) {
    // init data to hide console errors if nothing is found
    this.team = new Team();
    this.posts = new Array();

    this.sub = this.route.params.subscribe(
      params => {
        const id = params['id'];
        teamService.getTeam(id).subscribe(
          team => this.team = team,
          error => { console.log(error); },
          () => {
            teamService.getTeamReports(this.team.wp.cat, 1).subscribe(posts => this.posts = posts);
            this.seo.generateTags({
              title: this.team.name,
              description: this.team.name,
              image: this.team.picture
            });
          });
      },
      error => { console.log(error); },
      () => { });


  }

  ngOnInit() {
  }

}
