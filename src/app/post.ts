export class Post {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: Object;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    media_details: Object;
    _embedded: Object;
    thumbnail: string;
    author: string;
    slug: string;
}
