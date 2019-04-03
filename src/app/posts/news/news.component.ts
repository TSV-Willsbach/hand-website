import { Component, OnInit } from '@angular/core';
import { NewsService } from '@wh-share/news.service';
import { Post } from '@wh-objects/post';
import { Paginator } from '@wh-objects/pagination';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public maxPages: number;
  posts: Post[];
  stickyPosts: Post[];
  page = 1;
  pages: Paginator[];
  paginator: Paginator;
  myData: any;
  stickyData: any;

  constructor(private news: NewsService) {
    this.callApi();
  }

  public callApi() {
    this.stickyData = this.news.fetchNews(this.page, true)
      .subscribe(posts => this.stickyPosts = posts, error => console.log('Error: ', error),
        () => { });

    this.myData = this.news.fetchNews(this.page, false)
      .subscribe(posts => this.posts = posts, error => console.log('Error: ', error),
        () => {
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
