import { Component, OnInit } from "@angular/core";
import { FileServiceService } from "@wh-share/services/file-service.service";
import { Attachment } from "@wh-share/objects/attachment";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.component.html",
  styleUrls: ["./downloads.component.scss"],
})
export class DownloadsComponent implements OnInit {
  attachments: Attachment[];
  showSpinner = true;

  constructor(private file: FileServiceService) {
    this.file.fetchFiles().subscribe(
      (attachment) => (this.attachments = attachment),
      (error) => console.log("Error: ", error),
      () => {
        console.log(this.attachments);
        this.showSpinner = false;
      }
    );
  }

  iconStyle(color: string) {
    const myStyles = {
      color: color,
    };
    return myStyles;
  }

  ngOnInit() {}
}
