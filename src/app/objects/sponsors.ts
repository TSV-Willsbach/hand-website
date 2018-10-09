export class Sponsors {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: Object;
    title: Object;
    content: Object;
    media_details: {
        width: number;
        height: number;
    };
    _embedded: Object;
    source_url: string;
    alt_text: string;

    acf: {
        sponsorUrl: string;
        archive: Boolean;
    };
    thumbnail: string;
}
