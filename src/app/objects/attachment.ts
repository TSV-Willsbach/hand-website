export class Attachment {
    id: number;
    title: {
        rendered: string;
    }
    caption: {
        rendered: string;
    }
    alt_text: string;
    mime_type: string;
    source_url: string;
    icon: string;
    iconColor: string;
    fileType: string;
}