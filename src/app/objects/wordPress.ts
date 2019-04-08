export class Author {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
}

export class WPTerm {
    id: number;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
}

export class TeamWP {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: Object;
    title: Object;
    content: Object;
    media_details: {
        width: number;
        height: number;
        sizes: {
            thumbnail: MediaObject;
            medium: MediaObject;
            medium_large: MediaObject;
            large: MediaObject;
        };
    };
    _embedded: Object;
    thumbnail: string;
    alt_text: string;
    caption: {
        rendered: string;
    };
    acf: {
        archive: Boolean;
        sponsorUrl: string;
        team: string;
    };
}

export class MediaObject {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
}
