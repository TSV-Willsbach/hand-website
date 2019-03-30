import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GameTickerInfo, GameTickerDetail, PlayerInfo, GameTickerTeams } from '@wh-objects/hvw';

@Component({
  selector: 'app-game-ticker',
  templateUrl: './game-ticker.component.html',
  styleUrls: ['./game-ticker.component.scss']
})
export class GameTickerComponent implements OnInit {

  private sub: any;
  tokenId: string;
  gameInfo: GameTickerInfo;
  gameDetail: GameTickerDetail[];
  url: string;
  teams: GameTickerTeams;
  gameTime: number;
  gameScore: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.initData();

    this.sub = this.route.params.subscribe(
      params => {
        this.tokenId = params['gToken'];
        this.url = `https://spo.handball4all.de/service/if_ticker_data.php?token=${this.tokenId}&appid=&cmd=`;
        this.getData();
      },
      error => { console.log(error); },
      () => { }
    );
  }

  private getData() {
    this.initData();

    this.http.get<GameTickerInfo>(`${this.url}getGameInfo`)
      .subscribe(gameInfo => {
        this.gameInfo = gameInfo;
      });
    this.http.get<GameTickerDetail[]>(`${this.url}getAllTickerMessages`)
      .subscribe(gameDetail => {
        this.gameDetail = gameDetail;

        this.gameDetail.forEach(element => {
          if (element.message.includes('Spielzeit') || element.message.includes('Spielstand')) {
          } else if (element.message.includes('Gastmannschaft')) {
            if (this.teams.guest === undefined) {
              this.teams.guest = new Array<PlayerInfo>();
            }
            this.playerInfoLogic(element, this.teams.guest);
          } else if (element.message.includes('Heimmannschaft')) {
            if (this.teams.home === undefined) {
              this.teams.home = new Array<PlayerInfo>();
            }
            this.playerInfoLogic(element, this.teams.home);
          }
        });
      }, error => { console.log(error); },
        () => {
          this.gameDetail.sort((a, b) => b.game_time - a.game_time);
          const lastDetail = this.gameDetail[0];
          this.gameTime = lastDetail.game_time;
          this.gameScore = `${lastDetail.home_score}:${lastDetail.guest_score}`;
          // this.teams.home.sort((a, b) => a.number.localeCompare(b.number));
          // this.teams.guest.sort((a, b) => a.number.localeCompare(b.number));
        });
  }

  private initData() {
    this.gameInfo = new GameTickerInfo();
    this.gameDetail = new Array<GameTickerDetail>();
    this.teams = new GameTickerTeams();
    this.gameTime = 0;
    this.gameScore = '0:0';
  }

  private playerInfoLogic(element: GameTickerDetail, team: PlayerInfo[]) {
    let number = element.message.split('Nummer ')[1];
    number = number.substr(0, 2).replace(/\s/g, '');

    if (element.message.includes('Tor')) {
      this.addValue(team, 'goals', '', 1, number);
    } else if (element.message.includes('7m-Wurf')) {
      if (element.message.includes('Erfolgreicher')) {
        this.addValue(team, 'penalties', 'done', 1, number);
        this.addValue(team, 'penalties', 'goals', 1, number);
      } else {
        this.addValue(team, 'penalties', 'done', 1, number);
      }
    } else if (element.message.includes('Verwarnung')) {
      this.addValue(team, 'yellow_card', '', element.game_time, number);
    } else if (element.message.includes('2-min')) {
      this.addValue(team, 'two_minute', '', element.game_time, number);
    }
  }

  private addValue(team: PlayerInfo[], type: string, type2: string, value: any, number: string) {
    const foundIndex = team.findIndex(x => x.number === number);
    let playerIndex;
    if (foundIndex === -1) {
      playerIndex = team.push({
        goals: 0,
        number: number,
        penalties: {
          done: 0,
          goals: 0
        },
        yellow_card: 0,
        two_minute: {
          one: 0,
          two: 0,
          three: 0
        }
      });
      playerIndex--;
    } else {
      playerIndex = foundIndex;
    }
    const foundPlayer = team[playerIndex];

    if (type === 'two_minute') {
      if (foundPlayer[type]['one'] === 0) {
        type2 = 'one';
      } else if (foundPlayer[type]['two'] === 0) {
        type2 = 'two';
      } else {
        type2 = 'three';
      }
    }

    if (type2 === '') {
      foundPlayer[type] = foundPlayer[type] + value;
    } else {
      foundPlayer[type][type2] = foundPlayer[type][type2] + value;
    }

    team[playerIndex] = foundPlayer;
  }

  ngOnInit() {
  }

}
