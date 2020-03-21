import { Component, OnInit } from '@angular/core';
import { Post } from '@wh-objects/post';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';
import { Paginator } from '@wh-objects/pagination';
import { Team } from '@wh-objects/team';

@Component({
  selector: 'app-team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss']
})
export class TeamReportsComponent implements OnInit {
  posts: Post[];
  teamID: any;
  team: Team;
  public maxPages: number;
  page = 1;
  pages: Paginator[];
  paginator: Paginator;
  myData: any;

  constructor(private route: ActivatedRoute, private teamService: TeamService, private seo: SeoService) {
    // init data to hide console errors if nothing is found
    this.posts = new Array();
    this.team = new Team();

    this.callApi();
  }

  private callApi() {

    this.myData = this.route.params.subscribe(params => {
      this.teamID = params['id'];

      this.teamService.getTeam(this.teamID).subscribe(
        team => this.team = team,
        error => { console.log(error); },
        () => {
          this.teamService.getTeamReports(this.team.wp.cat, this.page)
            .subscribe(posts => this.posts = posts,
              error => console.log('Error: ', error),
              () => {
                this.maxPages = this.teamService.getMaxPages();
                this.pages = new Array();
                for (let i = 1; i <= this.maxPages; i++) {
                  if (i === this.page) {
                    this.paginator = { id: i, active: 'active' };
                  } else {
                    this.paginator = { id: i, active: '' };
                  }
                  this.pages.push(this.paginator);
                }
              });
        });
    }, error => { console.log(error); }, () => { });
  }

  ngOnInit() {
  }

  callMethod(method: string) {
    this[method]();
  }

  setPages(value: string) {
    this.page = +value;
  }


}
