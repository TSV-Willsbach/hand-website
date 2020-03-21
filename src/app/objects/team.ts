export class Team {
    name: string;
    picture: string;
    wp: {
        id: string;
        cat: string;
    };
    hvw: {
        liga: string;
        pokal?: string;
        quali?: string;
    };
    trainer: Coach[];
    players: Player[];

    constructor() {
    }
}
export class Coach {
    name: string;
    prename: string;
    picture: string;

    constructor() { }
}

export class Player {
    _id: string;
    position: string[];
    number: number;
    name: string;
    prename: string;
    nickname: string;
    birthday: Date;
    picture: string;
    joinedClub: string;
    lastClubs: string[];
    socialMedia: {
        instagram: string;
        facebook: string;
        twitter: string;
    };
    sponsor: {
        picture: string;
        name: string;
    };

    constructor() { }
}
