import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../shared/news.service';
import { Post } from '../post';
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  id: number;
  post: Post;
  private sub: any;

  constructor(private route: ActivatedRoute, private news: NewsService, meta: Meta, title: Title) {
    this.getPostData();

    this.changeMetas(title, meta);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getPostData() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.news.fetchSinglePost(this.id).subscribe(post => this.post = post);
      console.log(this.post);
    });
  }

  private changeMetas(title: Title, meta: Meta) {
    // title.setTitle(this.post.title.rendered);
    // meta.addTags([
    //   {
    //     name: 'description', content: post.excerpt.rendered
    //   }
    // ]);
  }

}