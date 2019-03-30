import { Globals } from './../objects/globals';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post, Picture } from '@wh-objects/post';
import { map } from 'rxjs/operators';

const apiPosts = 'https://wp.willsbach-handball.de/wp-json/wp/v2/posts?_embed&_embed';
const apiReports = 'https://wp.willsbach-handball.de/wp-json/wp/v2/posts?categories=6';
const apiPost = 'https://wp.willsbach-handball.de/wp-json/wp/v2/posts/';
const embed = '_embed';
const cat = '&categories=';
const maxPosts = '&per_page=6';

@Injectable()
export class NewsService {


  totalPages: number;
  page: number;

  constructor(private http: HttpClient, private global: Globals) {

  }

  getMaxPages(): number {
    return this.totalPages;
  }

  fetchNews(page: number): Observable<Post[]> {
    this.page = page;
    return this.http.get<Post[]>(this.getLink(apiPosts), { observe: 'response' })
      .pipe(
        map(posts => {
          this.totalPages = +posts.headers.get('X-WP-TotalPages');
          return posts.body.map(post => {
            this.mapFields(post);
            post.isNew = this.global.isPostNew(post.date);

            return post;
          });
        })
      );
  }

  fetchReports(wpCat: string, page: number): Observable<Post[]> {
    let link: string;
    this.page = page;

    if (wpCat !== '') {
      link = apiReports + cat + wpCat + '&' + embed;
    } else {
      link = apiReports + '&' + embed;
    }

    return this.http.get<Post[]>(this.getLink(link), { observe: 'response' })
      .pipe(
        map(posts => {
          this.totalPages = +posts.headers.get('X-WP-TotalPages');
          return posts.body.map(post => {
            this.mapFields(post);
            return post;
          });
        })
      );
  }

  fetchSinglePost(id: number): Observable<any> {
    const link = apiPost + id + '?' + embed;
    return this.http.get<Post>(link).pipe(
      map(post => {
        this.mapFields(post);
        return post;
      })
    );
  }

  private getLink(link: string): string {

    if ((this.page == null) || (this.page === 0)) {
      // page undefined or null or 0
      this.page = 1;
    }
    return link + maxPosts + '&page=' + this.page;
  }

  private mapFields(post: Post) {

    post.content.rendered = this.responsiveImgs(post.content.rendered);
    post.picture = new Picture();

    try {
      post.picture.url = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url;
      post.picture.width = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.width;
      post.picture.height = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.height;
      post.picture.mime_type = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.mime_type;
    } catch (e) {
      /* Fallback smaller picture */
      try {
        post.picture.url = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        post.picture.width = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.width;
        post.picture.height = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.height;
        post.picture.mime_type = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.mime_type;
      } catch (e) {
        try {
          post.picture.url = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
          post.picture.width = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.width;
          post.picture.height = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.height;
          post.picture.mime_type = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.mime_type;
        } catch (e) { post.picture.url = 'https://wp.willsbach-handball.de/wp-content/uploads/samples/Handball_1520472636-768x512.jpg'; }
      }
    }

    try {
      post.author = post._embedded['author'][0].name;
    } catch (e) { console.log('Error:', e); }
  }

  responsiveImgs(content: string): string {
    // Make all images responsive
    return content.replace(new RegExp('<img', 'g'), '<img class="img-fluid"');
  }
}
