import { Component, OnInit } from '@angular/core';
import { Post } from '@wh-objects/post';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss']
})
export class TeamReportsComponent implements OnInit {
  sub: any;
  posts: Post[];
  teamID: any;

  constructor(private route: ActivatedRoute, teamService: TeamService, private seo: SeoService) {
    // init data to hide console errors if nothing is found
    this.posts = new Array();

    this.sub = this.route.params.subscribe(
      params => {
        this.teamID = params['id'];
        teamService.getTeamReports(this.teamID).subscribe(posts => this.posts = posts);
      },
      error => { console.log(error); },
      () => { });


  }

  ngOnInit() {
  }

}
