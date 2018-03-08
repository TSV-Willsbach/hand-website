import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publishReplay';
import { timer } from 'rxjs/observable/timer';
import { switchMap, take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post';

const apiPosts = "https://wp.willsbach-handball.de/wp-json/wp/v2/posts?_embed&_embed";
const apiReports = "https://wp.willsbach-handball.de/wp-json/wp/v2/posts?tags=11&_embed";
const apiPost = "https://wp.willsbach-handball.de/wp-json/wp/v2/posts/";
const embed = "?_embed";

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  fetchNews(): Observable<Post[]> {
    return this.http.get<Post[]>(apiPosts)
      .map(posts => {
        return posts.map(post => {
          this.mapFields(post);
          return post;
        });
      });

    /*         (post: Post) => {
      post.thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
      return post
    } */

  }

  fetchReports(): Observable<Post[]> {
    return this.http.get<Post[]>(apiReports)
      .map(posts => {
        return posts.map(post => {
          this.mapFields(post);
          return post;
        });
      });
  }

  fetchSinglePost(id: number): Observable<any> {
    var link = apiPost + id + embed;
    return this.http.get<Post>(link).map(post => {
      this.mapFields(post);
      return post;
    });
  }

  private mapFields(post: Post) {
    try {
      post.thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url;
    }
    catch (e) {
      /* Fallback smaller picture */
      try {
        post.thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      }
      catch (e) {
        try {
          post.thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
        }
        catch (e) { post.thumbnail = 'https://wp.willsbach-handball.de/wp-content/uploads/samples/Handball_1520472636-768x512.jpg'; }
      }
    }

    try {
      post.author = post._embedded['author'][0].name;
    }
    catch (e) { console.log('Error:', e); }
  }
}