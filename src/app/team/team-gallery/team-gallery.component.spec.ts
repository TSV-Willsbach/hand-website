import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamGalleryComponent } from './team-gallery.component';

describe('TeamGalleryComponent', () => {
  let component: TeamGalleryComponent;
  let fixture: ComponentFixture<TeamGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
