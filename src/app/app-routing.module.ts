import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ResultsComponent } from './results/results.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'reports',
    component: ReportComponent
  }, {
    path: 'downloads',
    component: DownloadsComponent
  }, {
    path: 'results',
    component: ResultsComponent
  }, {
    path: 'chronicle',
    component: DocViewerComponent
  }, {
    path: 'sponsors',
    component: SponsorsComponent
  }, {
    path: 'referee',
    component: DocViewerComponent
  }, {
    path: 'imprint',
    component: DocViewerComponent
  }, {
    path: 'training',
    component: DocViewerComponent
  }, {
    path: 'contact',
    component: DocViewerComponent
  }, {
    path: 'aidAssociation',
    component: DocViewerComponent
  },
  {
    path: 'postDetail/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
