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
    title: string;
    content: string;
    media_details: Object;
    _embedded: {
        author: Author[];
        term: WPTerm[];
    };
    picture: Picture;
    author: string;
    slug: string;
    excerpt: string;
    sticky: boolean;
    categories: [{
        id: number,
        name: string
    }];
    tags: [{
        id: number,
        name: string
    }];

    constructor() {
        // Default values
        this.date = new Date();
        this.date_gmt = new Date();
        this.title = '';
        this.content = '';
        this.excerpt = '';
        this.isNew = false;
        this.picture = { url: '', height: 0, width: 0, mime_type: '' };
        this._embedded = { author: new Array<Author>(), term: new Array() };
    }
}
