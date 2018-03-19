import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  id: string;
  private sub: any;
  team: any;
  posts: Post[];

  constructor(private route: ActivatedRoute, private httpService: HttpClient, private news: NewsService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // In a real app: dispatch action to load the details here.
      this.httpService.get('./assets/generated/teams.json').subscribe(
        data => {
          this.team = data[this.id];
          this.news.fetchReports(this.id).subscribe(posts => this.posts = posts);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    });


  }

  ngOnInit() {
  }

}
