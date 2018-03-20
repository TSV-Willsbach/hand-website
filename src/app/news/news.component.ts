import { Component, OnInit } from '@angular/core';
import { NewsService } from '@wh-share/news.service';
import { Post } from '@wh-objects/post';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  posts: Post[];
  public maxPages: number;
  page: number = 1;
  pages: Number[];
  myData: any;


  constructor(private news: NewsService) {

    this.callApi();
  }

  private callApi() {
    this.myData = this.news.fetchNews(this.page)
      .subscribe(posts => this.posts = posts, error => console.log("Error: ", error), () => {
        this.maxPages = this.news.getMaxPages();
        this.pages = new Array();
        for (var i = 1; i <= this.maxPages; i++) {
          console.log(i);
          this.pages.push(i);
        }
        console.log(this.pages);
      });
  }

  ngOnInit() {
  }

  prevPage() {
    this.myData.unsubscribe();
    this.page--;
    console.log(this.page);
    this.callApi();
  }

  nextPage() {
    this.myData.unsubscribe();
    this.page++;
    console.log(this.page);
    this.callApi();
  }

  jumpToPage(page: number) {
    this.myData.unsubscribe();
    this.page = page;
    console.log(this.page);
    this.callApi();
  }

}
