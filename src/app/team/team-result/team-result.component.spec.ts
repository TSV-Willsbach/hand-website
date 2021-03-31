import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamResultComponent } from './team-result.component';

describe('TeamResultComponent', () => {
  let component: TeamResultComponent;
  let fixture: ComponentFixture<TeamResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
