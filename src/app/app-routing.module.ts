import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AboutComponent } from './about/about.component';
import { ChronicleComponent } from './chronicle/chronicle.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ResultsComponent } from './results/results.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'report',
    component: ReportComponent
  }, {
    path: 'about',
    component: AboutComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
