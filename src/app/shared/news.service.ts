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

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  fetchNews(): Observable<Post[]> {
    return this.http.get<Post[]>(apiPosts)
      .map(posts => {
        return posts.map(post => {
          post.thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
          return post;
        });
      });

    /*         (post: Post) => {
      post.thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
      return post
    } */

  }

}