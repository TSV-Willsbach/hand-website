import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../shared/news.service';
import { Post } from '../post';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  public href: string = "";
  id: number;
  post: Post;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private news: NewsService, private seo: SeoService) {
    this.post = new Post();
    this.getPostData();
  }

  ngOnInit() {
    this.href = "https://willsbach-handball.de" + this.router.url;

    this.seo.generateTags({
      title: this.post.title.rendered,
      description: this.post.excerpt.rendered,
      image: this.post.thumbnail,
      slug: this.router.url
    });
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
            image: this.post.thumbnail,
            slug: this.router.url
          });
        });
    });
  }
}
