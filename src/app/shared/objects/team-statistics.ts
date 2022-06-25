import { GameHistory } from "./hvw";
import { StatGame, Statistik } from "@wh-share/objects/hvw";
import { Globals } from "@wh-share/objects/globals";

export class TeamStatistics {
  constructor(private global: Globals) {}
  calcStatistic(data: any) {
    const games = data.content.futureGames.games;
    data.statistik = new Statistik();
    const statistik = data.statistik;
    statistik.GameHistory = new Array<GameHistory>();

    games.forEach((element) => {
      if (this.global.isOwnClub(element.gGuestTeam)) {
        this.awayStatLogic(statistik, element);
        this.historyStatistik(element, statistik, false);
      }
      if (this.global.isOwnClub(element.gHomeTeam)) {
        this.homeStatLogic(statistik, element);
        this.historyStatistik(element, statistik, true);
      }
    });

    this.calcAverage(statistik);
  }

  private historyStatistik(element: any, statistik: any, team: boolean) {
    const hist = new GameHistory();
    hist.date = element.gDate;
    if (element.sGID !== 0) {
      if (team) {
        // is home Team
        hist.result = this.calcResult(element.gHomeGoals, element.gGuestGoals);
        hist.opponent = element.gGuestTeam;
      } else {
        hist.result = this.calcResult(element.gGuestGoals, element.gHomeGoals);
        hist.opponent = element.gHomeTeam;
      }
      statistik.GameHistory.push(hist);
    }
  }

  private calcResult(goal1: number, goal2: number): number {
    if (goal1 === goal2) {
      // draft
      return 0;
    } else if (goal1 > goal2) {
      // win
      return 1;
    } else {
      // lose
      return -1;
    }
  }

  private calcAverage(statistik: any) {
    statistik.homeGoalsShot.avarageGoals =
      statistik.homeGoalsShot.totalGoals / statistik.homeGoalsShot.gameAmount;
    statistik.homeGoalsGot.avarageGoals =
      statistik.homeGoalsGot.totalGoals / statistik.homeGoalsGot.gameAmount;
    statistik.homeWins.procentualWins =
      statistik.homeWins.wins / statistik.homeWins.gameAmount;

    statistik.awayGoalsShot.avarageGoals =
      statistik.awayGoalsShot.totalGoals / statistik.awayGoalsShot.gameAmount;
    statistik.awayGoalsGot.avarageGoals =
      statistik.awayGoalsGot.totalGoals / statistik.awayGoalsGot.gameAmount;
    statistik.awayWins.procentualWins =
      statistik.awayWins.wins / statistik.awayWins.gameAmount;
    // set value to 0 if undefinded (NaN)
    statistik.homeGoalsShot.avarageGoals =
      statistik.homeGoalsShot.avarageGoals || 0;
    statistik.homeGoalsGot.avarageGoals =
      statistik.homeGoalsGot.avarageGoals || 0;
    statistik.awayGoalsShot.avarageGoals =
      statistik.awayGoalsShot.avarageGoals || 0;
    statistik.awayGoalsGot.avarageGoals =
      statistik.awayGoalsGot.avarageGoals || 0;
    statistik.homeWins.procentualWins = statistik.homeWins.procentualWins || 0;
    statistik.awayWins.procentualWins = statistik.awayWins.procentualWins || 0;
  }
  private homeStatLogic(statistik: any, element: any) {
    if (element.gHomeGoals !== " " || element.gGuestGoals !== " ") {
      this.homeGoalLogic(statistik, element);
    }

    const diff = +element.gHomeGoals - +element.gGuestGoals;
    if (element.gHomePoints === "2") {
      statistik.homeWins.wins++;
      if (diff > statistik.homeHighestWinDiff) {
        statistik.homeHighestWinDiff = diff;
        statistik.homeHighestWin = this.buildWLText(
          element,
          element.gGuestTeam
        );
      }
    } else if (
      element.gHomePoints === "0" &&
      diff < statistik.homeHighestLoseDiff
    ) {
      statistik.homeHighestLoseDiff = diff;
      statistik.homeHighestLose = this.buildWLText(element, element.gGuestTeam);
    }
  }

  private homeGoalLogic(statistik: any, goals: any) {
    statistik.homeWins.gameAmount++;
    statistik.homeGoalsShot.gameAmount++;
    statistik.homeGoalsGot.gameAmount++;
    statistik.homeGoalsShot.totalGoals =
      statistik.homeGoalsShot.totalGoals + +goals.gHomeGoals;
    statistik.homeGoalsGot.totalGoals =
      statistik.homeGoalsGot.totalGoals + +goals.gGuestGoals;
  }

  private awayGoalLogic(statistik: any, goals: any) {
    statistik.awayWins.gameAmount++;
    statistik.awayGoalsShot.gameAmount++;
    statistik.awayGoalsGot.gameAmount++;
    statistik.awayGoalsShot.totalGoals =
      statistik.awayGoalsShot.totalGoals + +goals.gGuestGoals;
    statistik.awayGoalsGot.totalGoals =
      statistik.awayGoalsGot.totalGoals + +goals.gHomeGoals;
  }

  private awayStatLogic(statistik: any, element: any) {
    if (element.gHomeGoals !== " " || element.gGuestGoals !== " ") {
      this.awayGoalLogic(statistik, element);
    }
    const diff = +element.gGuestGoals - +element.gHomeGoals;
    if (element.gGuestPoints === "2") {
      statistik.awayWins.wins++;
      if (diff > statistik.awayHighestWinDiff) {
        statistik.awayHighestWinDiff = diff;
        statistik.awayHighestWin = this.buildWLText(element, element.gHomeTeam);
      }
    } else if (
      element.gGuestPoints === "0" &&
      diff < statistik.awayHighestLoseDiff
    ) {
      statistik.awayHighestLoseDiff = diff;
      statistik.awayHighestLose = this.buildWLText(element, element.gHomeTeam);
    }
  }

  private buildWLText(element: any, teamName: string): StatGame {
    const stat = new StatGame();

    stat.teamName = teamName;
    stat.result = element.gHomeGoals + " : " + element.gGuestGoals;
    return stat;
  }
}
