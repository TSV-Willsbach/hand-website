import { NewsComponent } from "./news/news.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { ReportComponent } from "./report/report.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PostsRoutingModule } from "./posts-routing.module";
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareButtonsConfig } from "ngx-sharebuttons";

const customConfig: ShareButtonsConfig = {
  include: ["facebook", "whatsapp", "copy", "twitter", "email", "print", "sms"],
  tags: "tsvWillsbach",
  theme: "default",
  gaTracking: true,
  autoSetMeta: true,
  twitterAccount: "willsbach_hndbl",
  prop: {
    copy: {
      text: "Link kopieren",
    },
    print: {
      text: "Drucken",
    },
    // and so on...
  },
};

@NgModule({
  declarations: [ReportComponent, PostDetailComponent, NewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PostsRoutingModule,
    ShareButtonsModule.withConfig(customConfig),
  ],
})
export class PostsModule {}
