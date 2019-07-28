import { WordpressService } from './../../shared/wordpress.service';
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
  showSpinner = true;

  constructor(private wp: WordpressService) {
    this.callApi();
  }

  public callApi() {
    this.stickyData = this.wp.fetchReports(undefined, undefined, true)
      .subscribe(
        posts => this.stickyPosts = posts,
        error => console.log('Error: ', error),
        () => {
        });

    this.myData = this.wp.fetchReports()
      .subscribe(
        posts => this.posts = posts,
        error => console.log('Error: ', error),
        () => {
          this.showSpinner = false;
          this.pages = new Array();
        });

    // this.news.fetchNews(this.page, false)
    //   .subscribe(posts => this.posts = posts, error => console.log('Error: ', error),
    //     () => {
    //       this.showSpinner = false;
    //       this.maxPages = this.news.getMaxPages();
    //       this.pages = new Array();
    //       for (let i = 1; i <= this.maxPages; i++) {
    //         if (i === this.page) {
    //           this.paginator = { id: i, active: 'active' };
    //         } else {
    //           this.paginator = { id: i, active: '' };
    //         }
    //         this.pages.push(this.paginator);
    //       }
    //     });
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
