import { Component, OnInit } from '@angular/core';
import { NewsService } from '@wh-share/news.service';
import { Post } from '@wh-objects/post';
import { Paginator } from '@wh-objects/pagination';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public maxPages: number;
  public nextDisabled: string;
  public prevDisabled: string;
  posts: Post[];
  page: number = 1;
  pages: Paginator[];
  paginator: Paginator;
  myData: any;



  constructor(private news: NewsService) {
    this.prevDisabled = "disabled";
    this.callApi();
  }

  private callApi() {
    this.myData = this.news.fetchNews(this.page)
      .subscribe(posts => this.posts = posts, error => console.log("Error: ", error), () => {
        this.maxPages = this.news.getMaxPages();
        this.pages = new Array();
        for (var i = 1; i <= this.maxPages; i++) {
          if (i === this.page) {
            this.paginator = { id: i, active: "active" };
          } else {
            this.paginator = { id: i, active: "" };
          }
          this.pages.push(this.paginator);
        }
      });
  }

  ngOnInit() {
  }

  prevPage() {
    this.page--;
    this.jumpToPage(this.page);
  }

  nextPage() {
    this.page++;
    this.jumpToPage(this.page);
  }

  jumpToPage(page: number) {
    this.page = page;
    this.nextPrevAvailability();

    this.myData.unsubscribe();
    this.callApi();
  }


  private nextPrevAvailability() {
    // this.pages[this.page] = { id: this.page, active: "active" };
    if (this.page === 1) {
      this.prevDisabled = "disabled";
      this.nextDisabled = "";
    }
    else if (this.page === this.maxPages) {
      this.nextDisabled = "disabled";
      this.prevDisabled = "";
    }
    else {
      this.prevDisabled = "";
      this.nextDisabled = "";
    }

  }
}
