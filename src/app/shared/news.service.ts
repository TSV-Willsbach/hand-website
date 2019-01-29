import { Globals } from './../objects/globals';

import { TeamService } from '@wh-share/team.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post, Picture } from '@wh-objects/post';

const apiPosts = 'https://wp.willsbach-handball.de/wp-json/wp/v2/posts?_embed&_embed';
const apiReports = 'https://wp.willsbach-handball.de/wp-json/wp/v2/posts?categories=6';
const apiPost = 'https://wp.willsbach-handball.de/wp-json/wp/v2/posts/';
const embed = '_embed';
const cat = '&categories=';
const catHerren = '&categories=10';
const catDamen = '&categories=5';
const catmA = '&categories=17';
const catmB = '&categories=18';
const catmC = '&categories=19';
const catwC = '&categories=40';
const catmD = '&categories=20';
const catmE = '&categories=21';
const catMinis = '&categories=22';
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
      .map(posts => {
        this.totalPages = +posts.headers.get('X-WP-TotalPages');
        return posts.body.map(post => {
          this.mapFields(post);
          post.isNew = this.global.isPostNew(post.date);

          return post;
        });
      });
  }

  fetchReports(id: string, page: number): Observable<Post[]> {
    let link: string;
    this.page = page;

    switch (id) {
      case 'herren': {
        link = apiReports + catHerren + '&' + embed;
        break;
      }

      case 'damen': {
        link = apiReports + catDamen + '&' + embed;
        break;
      }

      case 'majugend': {
        link = apiReports + catmA + '&' + embed;
        break;
      }

      case 'mbjugend': {
        link = apiReports + catmB + '&' + embed;
        break;
      }

      case 'wcjugend': {
        link = apiReports + catwC + '&' + embed;
        break;
      }

      case 'mcjugend': {
        link = apiReports + catmC + '&' + embed;
        break;
      }

      case 'mdjugend': {
        link = apiReports + catmD + '&' + embed;
        break;
      }

      case 'mejugend': {
        link = apiReports + catmE + '&' + embed;
        break;
      }

      case 'minis': {
        link = apiReports + catMinis + '&' + embed;
        break;
      }

      default: {
        link = apiReports + '&' + embed;
      }

    }
    return this.http.get<Post[]>(this.getLink(link), { observe: 'response' })
      .map(posts => {
        this.totalPages = +posts.headers.get('X-WP-TotalPages');
        return posts.body.map(post => {
          this.mapFields(post);
          return post;
        });
      });
  }

  fetchSinglePost(id: number): Observable<any> {
    const link = apiPost + id + '?' + embed;
    return this.http.get<Post>(link).map(post => {
      this.mapFields(post);
      return post;
    });
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
    } catch (e) {
      /* Fallback smaller picture */
      try {
        post.picture.url = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        post.picture.width = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.width;
        post.picture.height = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.height;
      } catch (e) {
        try {
          post.picture.url = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
          post.picture.width = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.width;
          post.picture.height = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.height;
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
