import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { Post } from '../post';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  posts: Post[];

  constructor(private news: NewsService) {

    this.news.fetchNews()
      .subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
  }

}
