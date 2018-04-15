import { StatGame, Statistik } from "@wh-objects/hvw";
import { Globals } from "@wh-objects/globals";

export class teamStatistics {
    constructor(private global: Globals) { }
    calcStatistic(data: any) {
        let games = data.content.futureGames.games;
        data.statistik = new Statistik();
        let statistik = data.statistik;

        games.forEach(element => {
            if (element.gGuestTeam === this.global.clubName) {
                this.awayStatLogic(statistik, element);
            } else if (element.gHomeTeam === this.global.clubName) {
                this.homeStatLogic(statistik, element);
            }
        });

        this.calcAverage(statistik);
    }

    private calcAverage(statistik: any) {
        // if (statistik.awayGoalsShot.avarageGoals === null) { statistik.awayGoalsShot.avarageGoals = 0; }

        statistik.homeGoalsShot.avarageGoals = statistik.homeGoalsShot.totalGoals / statistik.homeGoalsShot.gameAmount;
        statistik.homeGoalsGot.avarageGoals = statistik.homeGoalsGot.totalGoals / statistik.homeGoalsGot.gameAmount;
        statistik.homeWins.procentualWins = statistik.homeWins.wins / statistik.homeWins.gameAmount;
        statistik.awayGoalsShot.avarageGoals = statistik.awayGoalsShot.totalGoals / statistik.awayGoalsShot.gameAmount;
        statistik.awayGoalsGot.avarageGoals = statistik.awayGoalsGot.totalGoals / statistik.awayGoalsGot.gameAmount;
        statistik.awayWins.procentualWins = statistik.awayWins.wins / statistik.awayWins.gameAmount;

        // set value to 0 if undefinded (NaN)
        statistik.awayGoalsShot.avarageGoals = statistik.awayGoalsShot.avarageGoals || 0;
        statistik.homeGoalsGot.avarageGoals = statistik.homeGoalsGot.avarageGoals || 0;
        statistik.awayGoalsShot.avarageGoals = statistik.awayGoalsShot.avarageGoals || 0;
        statistik.awayGoalsGot.avarageGoals = statistik.awayGoalsGot.avarageGoals || 0;
        statistik.homeWins.procentualWins = statistik.homeWins.procentualWins || 0;
        statistik.awayWins.procentualWins = statistik.awayWins.procentualWins || 0;
    }
    private homeStatLogic(statistik: any, element: any) {

        if (element.gHomeGoals != " " || element.gGuestGoals != " ") {
            this.homeGoalLogic(statistik, element);
        }

        let diff = +element.gHomeGoals - +element.gGuestGoals;
        if (element.gHomePoints === '2') {
            statistik.homeWins.wins++;
            if (diff > statistik.homeHighestWinDiff) {
                statistik.homeHighestWinDiff = diff;
                statistik.homeHighestWin = this.buildWLText(element, element.gGuestTeam);
            }
        }
        else if (element.gHomePoints === '0' && diff < statistik.homeHighestLoseDiff) {
            statistik.homeHighestLoseDiff = diff;
            statistik.homeHighestLose = this.buildWLText(element, element.gGuestTeam);
        }
    }

    private homeGoalLogic(statistik: any, goals: any) {
        statistik.homeWins.gameAmount++;
        statistik.homeGoalsShot.gameAmount++;
        statistik.homeGoalsGot.gameAmount++;
        statistik.homeGoalsShot.totalGoals = statistik.homeGoalsShot.totalGoals + +goals.gHomeGoals;
        statistik.homeGoalsGot.totalGoals = statistik.homeGoalsGot.totalGoals + +goals.gGuestGoals;

    }

    private awayGoalLogic(statistik: any, goals: any) {
        statistik.awayWins.gameAmount++;
        statistik.awayGoalsShot.gameAmount++;
        statistik.awayGoalsGot.gameAmount++;
        statistik.awayGoalsShot.totalGoals = statistik.awayGoalsShot.totalGoals + +goals.gGuestGoals;
        statistik.awayGoalsGot.totalGoals = statistik.awayGoalsGot.totalGoals + +goals.gHomeGoals;
    }

    private awayStatLogic(statistik: any, element: any) {
        if (element.gHomeGoals != " " || element.gGuestGoals != " ") {
            this.awayGoalLogic(statistik, element);
        }
        let diff = +element.gGuestGoals - +element.gHomeGoals;
        if (element.gGuestPoints === '2') {
            statistik.awayWins.wins++;
            if (diff > statistik.awayHighestWinDiff) {
                statistik.awayHighestWinDiff = diff;
                statistik.awayHighestWin = this.buildWLText(element, element.gHomeTeam);
            }
        }
        else if (element.gGuestPoints === '0' && diff < statistik.awayHighestLoseDiff) {
            statistik.awayHighestLoseDiff = diff;
            statistik.awayHighestLose = this.buildWLText(element, element.gHomeTeam);
        }
    }

    private buildWLText(element: any, teamName: string): StatGame {
        let stat = new StatGame();

        stat.teamName = teamName;
        stat.result = element.gHomeGoals + " : " + element.gGuestGoals;
        return stat;
    }
}