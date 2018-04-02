import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';
import { Team } from '@wh-objects/team';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  private sub: any;
  team: Team;
  posts: Post[];

  constructor(private route: ActivatedRoute, private httpService: HttpClient, private news: NewsService, teamService: TeamService, private seo: SeoService) {
    // init data to hide console errors if nothing is found
    this.team = new Team();
    this.posts = new Array();

    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        teamService.getTeam(id).subscribe(
          team => this.team = team,
          error => { console.log(error); },
          () => {
            this.seo.generateTags({
              title: this.team.title,
              description: this.team.title,
              image: this.team.picture
            });
          });
        teamService.getTeamReports(id).subscribe(posts => this.posts = posts);
      },
      error => { console.log(error); },
      () => { });


  }

  ngOnInit() {
  }

}
