import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationNode, VersionInfo } from '../navigation/navigation.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  @Input() nodes: NavigationNode[];
  @Input() versionInfo: VersionInfo;

  ngOnInit() { }

}
