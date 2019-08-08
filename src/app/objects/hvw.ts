export class Game {
    id: string;
    date: string;
    live: boolean;
    team: {
        home: string;
        guest: string;
    };
    goals: {
        end: {
            home: number;
            guest: number;
        };
        halfTime: {
            home: number;
            guest: number;
        };
    };
    points: {
        home: number;
        guest: number;
    };
    gymnasium: {
        id: string;
        number: string;
        name: string;
        street: string;
        postal: string;
        city: string;
    };
    referees: string;
    comment: string;
    sortText: string;
    appId: string;
    token: string;
    report: string;
}

export class Score {
    id: string;
    rank: number;
    live: boolean;
    name: string;
    games: {
        played: number;
        won: number;
        equal: number;
        lost: number;
    };
    goals: {
        shot: number;
        got: number;
        difference: number;
    };
    points: {
        plus: number;
        minus: number;
    };
    statistics: Statistik;
}

export class StatGame {
    teamName: string;
    result: string;

    constructor() {
        this.teamName = this.result = '-';
    }

}

export class Club {
    id: string;
    name: string;
    shortName: string;
    headline1: string;
    headline2: string;
    actualized: string;
    ligues: Ligue[];
}


export class GameHistory {
    date: Date;
    result: number;
    opponent: string;
}

export class Statistik {
    gameWon: {
        home: {
            amount: number;
            games: number;
            percentage: number;
        };
        away: {
            amount: number;
            games: number;
            percentage: number;
        };
    };
    goalsShot: {
        home: {
            goals: number;
            average: number;
        },
        away: {
            goals: number;
            average: number;
        };
    };
    goalsGot: {
        home: {
            goals: number;
            average: number;
        };
        away: {
            goals: number;
            average: number;
        };
    };
    highestWin: {
        home: {
            name: string;
            result: string;
        };
        away: {
            name: string;
            result: string;
        };
    };
    highestLose: {
        home: {
            name: string;
            result: string;
        };
        away: {
            name: string;
            result: string;
        };
    };
}


export class Ligue {
    id: string;
    name: string;
    shortName: string;
    headline1: string;
    headline2: string;
    actualized: string;
    comment: string;
    scores: Score[];
    games: Game[];
}

export class Referee {
    name: string;
    prename: string;
}

export class GameTickerInfo {
    class_lname: string;
    guest_lname: string;
    home_lname: string;
    datetime: Date;
    gym_name: string;
    gym_town: string;
    report: {
        refereeA: Referee;
        refereeB: Referee;
    };
    status: number;
    status_description: string;
    constructor() {
        this.report = {
            refereeA: new Referee(),
            refereeB: new Referee()
        };
    }
}

export class GameTickerDetail {
    game_time: number;
    home_score: string;
    guest_score: string;
    message: string;
    stops_time: boolean;
    status: number;
    status_description: string;
}

export class PlayerInfo {
    number: string;
    goals: number;
    penalties: {
        done: number;
        goals: number;
    };
    yellow_card: number;
    two_minute: {
        one: number,
        two: number,
        three: number
    };
    red_card: number;
    blue_card: number;

    constructor() {
        this.penalties = {
            done: 0,
            goals: 0
        };
        this.two_minute = {
            one: 0,
            two: 0,
            three: 0
        };
    }
}

export class GameTickerTeams {
    home: PlayerInfo[];
    guest: PlayerInfo[];
}
