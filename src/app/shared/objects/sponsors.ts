import { MediaDetails, Embedded, MediaACF } from './wordPress';

export class Sponsors {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: Object;
    title: Object;
    content: Object;
    media_details: MediaDetails;
    _embedded: Embedded;
    source_url: string;
    alt_text: string;
    caption: {
        rendered: string;
    };
    acf: MediaACF;
    thumbnail: string;
}
