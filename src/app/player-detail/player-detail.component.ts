import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsService } from '@wh-share/news.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  name: string;
  id: string;
  private sub: any;
  player: any;

  constructor(private route: ActivatedRoute, private httpService: HttpClient, private news: NewsService) {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.id = params['id'];

      // In a real app: dispatch action to load the details here.
      this.httpService.get('./assets/generated/teams.json').subscribe(
        data => {
          let team = data[this.id];
          let players = team.players;
          let playerNames = this.name.split("_");

          this.player = players.find(item =>
            item.name === playerNames[1] &&
            item.prename === playerNames[0]
          );
          console.log(this.player);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    });
  }

  ngOnInit() {
  }

}
