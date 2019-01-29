import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@wh-objects/post';
import { NewsService } from '@wh-share/news.service';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  public href = '';
  id: number;
  post: Post;
  private sub: any;

  constructor(private route: ActivatedRoute, private news: NewsService, private seo: SeoService) {
    this.post = new Post();
    this.getPostData();
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
      this.news.fetchSinglePost(this.id).subscribe(post => this.post = post,
        error => {
          console.log(error);
        },
        () => {
          this.seo.generateTags({
            title: this.post.title.rendered,
            description: this.post.excerpt.rendered,
            image: this.post.picture.url,
            type: 'article'
          });
          this.seo.articleTags(this.post.author);
        });
    });
  }
}
