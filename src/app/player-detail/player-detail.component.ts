import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsService } from '@wh-share/news.service';
import { TeamService } from '@wh-share/team.service';
import { Player } from '@wh-objects/team';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  private sub: any;
  player: Player;

  constructor(private route: ActivatedRoute, private httpService: HttpClient, private news: NewsService, teams: TeamService) {
    this.sub = this.route.params.subscribe(params => {
      teams.getPlayer(params['id'], params['name']).subscribe(player => this.player = player);
    });
  }

  ngOnInit() {
  }

}
