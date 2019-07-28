import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@wh-objects/team';
import { TeamService } from '@wh-share/team.service';
import { SeoService } from '@wh-share/seo.service';
import { CarouselService } from '@wh-share/carousel.service';
import { WPPicture } from '@wh-objects/wordPress';

@Component({
  selector: 'app-team-gallery',
  templateUrl: './team-gallery.component.html',
  styleUrls: ['./team-gallery.component.scss']
})
export class TeamGalleryComponent implements OnInit {

  teamID: any;
  private sub: any;
  team: Team;
  pictures: WPPicture[];
  showSpinner = true;

  constructor(private route: ActivatedRoute, private teams: TeamService, private seo: SeoService) {
    this.team = new Team();


    this.sub = this.route.params.subscribe(params => {
      this.teamID = params['id'];
      this.teams.getTeam(this.teamID).subscribe(
        team => this.team = team,
        error => { console.log(error); },
        () => {
          this.teams.getTeamPictures(this.team.wpID).subscribe(pic => this.pictures = pic,
            error => { console.log(error); },
            () => {
              this.showSpinner = false;
            });
        });
    });
  }

  ngOnInit() {
  }

}
