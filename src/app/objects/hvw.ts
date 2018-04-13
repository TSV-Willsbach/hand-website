export class Ligue {
    head: Head;
    content: Content;

    constructor() { }
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

    constructor() { }
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