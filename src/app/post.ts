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
        this.id = 0;
        this.date = new Date();
        this.date_gmt = new Date();
        this.title = { rendered: "Eintrag nicht gefunden" };
        this.content = { rendered: "<h2>Eintrag wurde nicht gefunden.<\/h2><a href=\"#\">Zur Startseite<\/a>" };
        this.author = "not found";
        this.thumbnail = "https://willsbach-handball.de/assets/images/handball_willsbach.png";
    }
}
