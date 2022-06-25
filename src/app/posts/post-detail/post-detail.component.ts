import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SeoService } from "@wh-share/services/seo.service";
import { WordpressService } from "@wh-share/services/wordpress.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public href = "";
  id: number;
  post: any;
  private sub: any;
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wp: WordpressService,
    private seo: SeoService
  ) {
    // this.post = new Post();
    this.getPostData();
    this.href = window.location.href;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getPostData() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"]; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.wp.getPost(this.id).subscribe(
        (post) => (this.post = post),
        (error) => {
          if (error.status === 404) {
            console.log("Error", error);
            this.router.navigate(["/home/404"], { skipLocationChange: true });
          }
        },
        () => {
          this.showSpinner = false;

          this.seo.generateTags({
            title: this.post.title,
            description: this.post.excerpt,
            image: this.post.picture.url,
            height: this.post.picture.height,
            width: this.post.picture.width,
            mime_type: this.post.picture.mime_type,
            type: "article",
          });
          this.seo.articleTags(this.post.author);
        }
      );
    });
  }
}
