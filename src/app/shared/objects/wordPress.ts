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

export class Embedded {
    author: Author[];
}

export class TeamWP {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: Object;
    title: Object;
    content: Object;
    media_details: MediaDetails;
    _embedded: Embedded;
    thumbnail: string;
    alt_text: string;
    caption: {
        rendered: string;
    };
    acf: MediaACF;
}

export class WPPicture {
    id: number;
    alt_text: string;
    acf: MediaACF;
    media_details: MediaDetails;
    media_type: string;
    mime_type: string;
    slug: string;
    type: string;
    title: {
        rendered: string;
    };
    caption: {
        rendered: string;
    };
    description: {
        rendered: string;
    };
    source_url: string;
    _embedded: Embedded;
}

export class MediaACF {
    archive: Boolean;
    sponsorType: string;
    sponsorUrl: string;
    team: string;
}

export class MediaDetails {
    width: number;
    height: number;
    sizes: {
        thumbnail: MediaObject;
        medium: MediaObject;
        medium_large: MediaObject;
        large: MediaObject;
    };
}

export class MediaObject {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
}
