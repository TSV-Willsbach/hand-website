import { Component, OnInit } from '@angular/core';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  posts: Post[];

  constructor(private news: NewsService) {

    this.news.fetchReports()
      .subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
  }

}
