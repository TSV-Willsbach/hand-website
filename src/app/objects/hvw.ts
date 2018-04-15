export class Ligue {
    head: Head;
    content: Content;
    statistik: Statistik;

    constructor() {
        this.head = new Head();
        this.content = new Content();
        this.statistik = new Statistik();
    }
}

export class Club {
    head: Head;
    content: {
        classes: Classes[];
    };
    constructor() {
        this.head = new Head;
    }
}

export class Head {
    name: string;
    sname: string;
    headline2: string;
    actualized: string;

    constructor() { }
}

export class Content {
    actualGames: {
        games: Game[]
    };
    score: Score[];
    scoreComments: string[];
    futureGames: {
        games: Game[];
    }

    constructor() {
        this.actualGames = { games: new Array<Game>() }
        this.futureGames = { games: new Array<Game>() }
    }
}

export class Classes {
    gClassId: string;
    gClassSname: string;
    games: Game[];
    constructor() { }
}

export class Game {
    gID: string;
    sGID: string;
    gNo: string;
    live: Boolean;
    gDate: string;
    gTime: string;
    gGymnasiumID: string;
    gGymnasiumNo: string;
    gGymnasiumName: string;
    gGymnasiumPostal: string;
    gGymnasiumTown: string;
    gGymnasiumStreet: string;
    gHomeTeam: string;
    gGuestTeam: string;
    gHomeGoals: string;
    gGuestGoals: string;
    gHomeGoals_1: string;
    gGuestGoals_1: string;
    gHomePoints: string;
    gGuestPoints: string;
    gComment: string;
    gReferee: string;

    constructor() {
        this.gGuestGoals = this.gGuestGoals_1 = "0";
        this.gHomeGoals = this.gHomeGoals_1 = "0";
    }
}

export class Score {
    tabScore: string;
    tabTeamID: string;
    tabTeamname: string;
    numPlayedGames: number;
    numWonGames: number;
    numEqualGames: number;
    numLostGames: number;
    numGoalsShot: number;
    numGoalsGot: number;
    difference: number;
    pointsPlus: number;
    pointsMinus: number;

    constructor() { }
}

export class Statistik {
    homeWins: StatWins;
    homeGoalsShot: StatGoals;
    homeGoalsGot: StatGoals;
    homeHighestWin: StatGame;
    homeHighestWinDiff: number;
    homeHighestLose: StatGame;
    homeHighestLoseDiff: number;
    awayWins: StatWins;
    awayGoalsShot: StatGoals;
    awayGoalsGot: StatGoals;
    awayHighestWin: StatGame;
    awayHighestWinDiff: number;
    awayHighestLose: StatGame;
    awayHighestLoseDiff: number;
    constructor() {

        this.homeGoalsShot = new StatGoals();
        this.homeGoalsGot = new StatGoals();
        this.homeHighestWin = new StatGame();
        this.homeHighestLose = new StatGame();
        this.homeWins = new StatWins();
        this.homeHighestWinDiff = this.homeHighestLoseDiff = 0;

        this.awayGoalsShot = new StatGoals();
        this.awayGoalsGot = new StatGoals();
        this.awayHighestWin = new StatGame();
        this.awayHighestLose = new StatGame();
        this.awayWins = new StatWins();
        this.awayHighestWinDiff = this.awayHighestLoseDiff = 0;


    }
}

export class StatGame {
    teamName: string;
    result: string;

    constructor() {
        this.teamName = this.result = "-";
    }

}

export class StatWins {
    wins: number;
    procentualWins: number;
    gameAmount: number;

    constructor() {
        this.wins = this.gameAmount = 0;
        this.procentualWins = 0;
    }
}
export class StatGoals {
    totalGoals: number;
    avarageGoals: number;
    gameAmount: number;

    constructor() {
        this.totalGoals = this.avarageGoals = this.gameAmount = 0;
    }

}