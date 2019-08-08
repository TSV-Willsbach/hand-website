import { WillsbachApiService } from './willsbach-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '@wh-objects/post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService extends WillsbachApiService {

  totalPages: number;

  constructor(private http: HttpClient) {
    super();
    this.url = this.url + 'wp/';
  }

  getMaxPages(): number {
    return this.totalPages;
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<any>(this.url + 'posts/' + id)
      .pipe(
        map(posts => {
          this.totalPages = posts.maxPages;
          return posts.posts;
        }));
  }

  fetchReports(wpCat?: number, page?: number, sticky?: boolean): Observable<Post[]> {
    this.initUrlParams();
    this.addUrlParam('page', page);
    this.addUrlParam('category', wpCat);
    this.addUrlParam('sticky', sticky);

    return this.http.get<any>(this.url + 'posts', { params: this.urlParams })
      .pipe(
        map(posts => {
          this.totalPages = posts.maxPages;
          return posts.posts;
        }));
  }

}
