import { WordpressService } from "@wh-share/services/wordpress.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Attachment } from "@wh-share/objects/attachment";
import { map } from "rxjs/operators";

const apiFiles =
  "https://wp.willsbach-handball.de/wp-json/wp/v2/media?_embed&search=downloads";

@Injectable()
export class FileServiceService {
  constructor(private wp: WordpressService) {}

  fetchFiles(): Observable<Attachment[]> {
    return this.wp.getDownloads(false).pipe(
      map((attachments) => {
        return attachments.map((attachment) => {
          return this.getIconForType(attachment);
        });
      })
    );
  }

  private getIconForType(attachment: Attachment): Attachment {
    let icon: string;

    switch (attachment.mime_type) {
      case "application/pdf": {
        attachment.iconColor = "red";
        attachment.fileType = "PDF";
        icon = "fa-file-pdf-o";
        break;
      }
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        attachment.iconColor = "blue";
        attachment.fileType = "Word";
        icon = "fa-file-word-o";
        break;
      }
      case "application/msexcel":
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        attachment.iconColor = "green";
        attachment.fileType = "Excel";
        icon = "fa-file-excel-o";
        break;
      }
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      case "application/vnd.openxmlformats-officedocument.presentationml.template": {
        attachment.iconColor = "orange";
        attachment.fileType = "Power Point";
        icon = "fa-file-powerpoint-o";
        break;
      }
      default: {
        attachment.iconColor = "black";
        attachment.fileType = attachment.mime_type.replace("application/", " ");
        icon = "fa-file-o";
      }
    }

    attachment.icon = "fa " + icon;
    return attachment;
  }
}
