import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    clubName = 'TSV Willsbach';
    readonly VAPID_PUBLIC_KEY = 'BIsi_9ZfOjP2Swwy45c9bTQR722-KW71YhH0_QfkFjEUj79HtAWObCsKy3W51jC30uvEOzUoZwKMPjbaKlBXaPk';
    gMapsSearch = 'https://www.google.de/maps/search/';

    public isOwnClub(club: string): Boolean {
        if (club.match(this.clubName)) {
            return true;
        } else {
            return false;
        }
    }

    public isPostNew(date: Date): Boolean {
        const today = new Date();
        const last3Days = new Date();
        last3Days.setDate(today.getDate() - 4);
        const testDate = new Date(date);
        console.log(testDate);
        if (today >= testDate && last3Days <= testDate) {
            return true;
        }
        return false;
    }

}
