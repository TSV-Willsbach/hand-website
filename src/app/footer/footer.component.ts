import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationNode, VersionInfo, NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() nodes: NavigationNode[];
  @Input() versionInfo: VersionInfo;
  constructor(private navigationService: NavigationService) {

  }

  ngOnInit() {
    this.navigationService.versionInfo.subscribe(vi => {
      this.versionInfo = vi
    });

    this.navigationService.navigationViews.subscribe(nodes => this.nodes = nodes.Footer);

  }

}
