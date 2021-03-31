import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerGameTableComponent } from './player-game-table.component';

describe('PlayerGameTableComponent', () => {
  let component: PlayerGameTableComponent;
  let fixture: ComponentFixture<PlayerGameTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGameTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGameTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
