import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Paginator } from '@wh-objects/pagination';
import { Post } from '@wh-objects/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-cards',
  templateUrl: './report-cards.component.html',
  styleUrls: ['./report-cards.component.scss']
})
export class ReportCardsComponent implements OnInit, OnChanges {
  @Input() pages: Paginator[];
  @Input() posts: Post[];
  @Input() myData: any;
  @Input() maxPages: number;

  @Output() callParentMethods = new EventEmitter<any>();
  @Output() pagesEvent = new EventEmitter<number>();

  public nextDisabled: string;
  public prevDisabled: string;
  page = 1;
  private fragment: string;

  constructor(private route: ActivatedRoute) { this.nextPrevAvailability(); }

  callApi() {
    this.callParentMethods.next('callApi');
  }

  nextPrevAvailability() {
    console.log('Max pages ', this.maxPages);
    if (this.page === 1 && this.maxPages === this.page || this.maxPages === undefined) {
      this.nextDisabled = this.prevDisabled = 'disabled';
    } else if (this.page === 1) {
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

  ngOnInit() {
  }

  ngOnChanges() {
    this.nextPrevAvailability();
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
    document.querySelector('#Cards').scrollIntoView();
  }



}
