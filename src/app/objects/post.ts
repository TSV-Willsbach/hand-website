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
    excerpt: {
        rendered: string;
    }

    constructor() {
        // Default values
        this.date = new Date();
        this.date_gmt = new Date();
        this.title = { rendered: "" };
        this.content = { rendered: "" };
        this.excerpt = { rendered: "" };
    }
}
