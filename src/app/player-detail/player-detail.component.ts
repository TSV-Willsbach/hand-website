import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsService } from '@wh-share/news.service';
import { TeamService } from '@wh-share/team.service';
import { Player } from '@wh-objects/team';
import { SeoService } from '@wh-share/seo.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  private sub: any;
  player: Player;

  constructor(private route: ActivatedRoute, private httpService: HttpClient, private news: NewsService, teams: TeamService, private seo: SeoService) {
    this.player = new Player();
    this.sub = this.route.params.subscribe(params => {
      teams.getPlayer(params['id'], params['name']).subscribe(
        player => this.player = player,
        error => { console.log(error) },
        () => {
          this.seo.generateTags({
            title: this.player.name + ", " + this.player.prename,
            description: this.player.prename + " " + this.player.name,
            image: this.player.picture
          });
        });
    }, error => {
      console.log(error);
    }, () => { });
  }

  ngOnInit() {

  }

}
