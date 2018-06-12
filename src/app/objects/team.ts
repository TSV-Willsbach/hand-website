export class Team {
    title: string;
    ligaID: string;
    pokalID: string;
    qualID: string;
    picture: string;
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
    position: string;
    number: number;
    name: string;
    prename: string;
    nickname: string;
    birthday: Date;
    picture: string;
    joinedClub: string;
    lastClubs: string;

    constructor() { }
}
