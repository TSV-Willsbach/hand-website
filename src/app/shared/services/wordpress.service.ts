import { WillsbachApiService } from "./willsbach-api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "@wh-share/objects/post";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WordpressService extends WillsbachApiService {
  private totalPages: number;

  constructor(private http: HttpClient) {
    super();
    this.url = this.url + "wp/";
  }

  getMaxPages(): number {
    return this.totalPages;
  }

  getPost(id: number): Observable<any> {
    return this.http.get<any>(this.url + "posts/" + id);
  }

  fetchReports(
    wpCat?: number,
    page?: number,
    sticky?: boolean
  ): Observable<Post[]> {
    this.initUrlParams();
    this.addUrlParam("page", page);
    this.addUrlParam("category", wpCat);
    this.addUrlParam("sticky", sticky);

    return this.http
      .get<any>(this.url + "posts", { params: this.urlParams })
      .pipe(
        map((posts) => {
          this.totalPages = posts.maxPages;
          return posts.posts;
        })
      );
  }

  getTeamPictures(archived?: boolean, teamId?: string) {
    this.initUrlParams();
    this.addUrlParam("archived", archived);
    this.addUrlParam("teamId", teamId);

    return this.http.get<any>(this.url + "media/teams", {
      params: this.urlParams,
    });
  }

  getDownloads(archived?: boolean) {
    this.initUrlParams();
    this.addUrlParam("archived", archived);
    this.addUrlParam("search", "downloads");

    return this.http.get<any>(this.url + "media/all", {
      params: this.urlParams,
    });
  }

  getTeamPicture(id) {
    return this.getTeamPictures(false, id);
  }

  getSponsors(archived: boolean, type?: string) {
    this.initUrlParams();
    this.addUrlParam("archived", archived);
    this.addUrlParam("type", type);
    return this.http.get<any>(this.url + "media/sponsors", {
      params: this.urlParams,
    });
  }
}
