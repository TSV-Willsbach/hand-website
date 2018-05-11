import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paginator } from '@wh-objects/pagination';
import { Post } from '@wh-objects/post';

@Component({
  selector: 'app-report-cards',
  templateUrl: './report-cards.component.html',
  styleUrls: ['./report-cards.component.scss']
})
export class ReportCardsComponent implements OnInit {
  @Input() pages: Paginator[];
  @Input() posts: Post[];
  @Input() myData: any;
  @Input() maxPages: number;

  @Output() callParentMethods = new EventEmitter<any>();
  @Output() pagesEvent = new EventEmitter<number>();

  public nextDisabled: string;
  public prevDisabled: string;
  page = 1;

  callApi() {
    this.callParentMethods.next('callApi');
  }

  nextPrevAvailability() {
    if (this.page === 1) {
      this.prevDisabled = 'disabled';
      this.nextDisabled = '';
    } else if (this.page === this.maxPages) {
      this.nextDisabled = 'disabled';
      this.prevDisabled = '';
    } else {
      this.prevDisabled = '';
      this.nextDisabled = '';
    }
  }

  constructor() { this.prevDisabled = 'disabled'; }

  ngOnInit() {
  }

  prevPage() {
    this.page--;
    this.jumpToPage(this.page);
  }

  nextPage() {
    this.page++;
    this.jumpToPage(this.page);
  }

  jumpToPage(page: number) {
    this.pagesEvent.next(page);
    this.page = page;
    this.nextPrevAvailability();

    this.myData.unsubscribe();
    this.callApi();
  }

}
