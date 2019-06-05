import { Author, WPTerm } from './wordPress';

export class Picture {
    width: number;
    height: number;
    url: string;
    mime_type: string;
}

export class Post {
    id: number;
    date: Date;
    date_gmt: Date;
    isNew: Boolean;
    guid: Object;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    media_details: Object;
    _embedded: {
        author: Author[];
        term: WPTerm[];
    };
    picture: Picture;
    author: string;
    slug: string;
    excerpt: {
        rendered: string;
    };
    sticky: boolean;

    constructor() {
        // Default values
        this.date = new Date();
        this.date_gmt = new Date();
        this.title = { rendered: '' };
        this.content = { rendered: '' };
        this.excerpt = { rendered: '' };
        this.isNew = false;
        this.picture = { url: '', height: 0, width: 0, mime_type: '' };
        this._embedded = { author: new Array<Author>(), term: new Array() };
    }
}
