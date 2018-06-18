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
    }
}

export class MediaObject {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
}