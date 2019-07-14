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

  constructor(private http: HttpClient) {
    super();
    this.url = this.url + 'wp/';
  }

  fetchReports(wpCat: string, page: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + 'posts');
    // return this.http.get<Post[]>(this.url, { observe: 'response' })
    // .pipe(
    //   map(posts => {
    //     this.totalPages = +posts.headers.get('X-WP-TotalPages');
    //     return posts.body.map(post => {
    //       this.mapFields(post);
    //       return post;
    //     });
    //   })
    // );
  }
}
