import { Component, OnInit } from '@angular/core';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';
import { Paginator } from '@wh-objects/pagination';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  posts: Post[];
  public maxPages: number;
  page = 1;
  pages: Paginator[];
  paginator: Paginator;
  myData: any;

  constructor(private news: NewsService) {

    this.callApi();
  }

  private callApi() {
    this.myData = this.news.fetchReports('', this.page)
      .subscribe(posts => this.posts = posts, error => console.log('Error ', error), () => {
        this.maxPages = this.news.getMaxPages();
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
