import { Component, OnInit } from '@angular/core';
import { FileServiceService } from '@wh-share/file-service.service';
import { Attachment } from '@wh-objects/attachment';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  attachments: Attachment[];

  constructor(private file: FileServiceService) {

    this.file.fetchFiles()
      .subscribe(attachment => this.attachments = attachment);

  }

  iconStyle(color: string) {
    const myStyles = {
      'color': color
    };
    return myStyles;
  }

  ngOnInit() {
  }

}
