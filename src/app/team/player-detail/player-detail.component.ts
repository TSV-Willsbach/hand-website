import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, teams: TeamService, private seo: SeoService) {
    this.player = new Player();
    this.sub = this.route.params.subscribe(params => {
      teams.getPlayer(params['playerId']).subscribe(
        player => this.player = player,
        error => { console.log(error); },
        () => {
          console.log('player', this.player);
          this.seo.generateTags({
            title: this.player.name + ', ' + this.player.prename,
            description: this.player.prename + ' ' + this.player.name,
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
