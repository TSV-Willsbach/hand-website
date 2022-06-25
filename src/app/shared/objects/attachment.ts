export class Attachment {
    id: number;
    title: string;
    caption: string;
    alt_text: string;
    mime_type: string;
    url: string;
    icon: string;
    iconColor: string;
    fileType: string;
    archived: Boolean;
    sponsor: {
        url: string;
        type: string;
    };
    team: string;
    desciption: string;
}
