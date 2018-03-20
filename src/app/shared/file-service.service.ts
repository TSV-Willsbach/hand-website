import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Attachment } from '@wh-objects/attachment';
import { HttpClient } from '@angular/common/http';

const apiFiles = "https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=downloads";

@Injectable()
export class FileServiceService {

  constructor(private http: HttpClient) { }

  fetchFiles(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(apiFiles)
      .map(attachments => {
        return attachments.map(attachment => {
          return this.getIconForType(attachment);
        });
      });
  }

  private getIconForType(attachment: Attachment): Attachment {
    var icon: string;

    switch (attachment.mime_type) {
      case "application/pdf": {
        attachment.iconColor = "red";
        icon = "fa-file-pdf-o";
        break;
      }
      case "application/msword": {
        attachment.iconColor = "blue";
        icon = "fa-file-word-o";
        break;
      }
      case "application/msexcel": {
        attachment.iconColor = "green";
        icon = "fa-file-excel-o";
        break;
      }
      default: {
        attachment.iconColor = "black";
        icon = "fa-file-o";
      }
    }

    attachment.icon = "fa " + icon;
    return attachment;
  }

}
