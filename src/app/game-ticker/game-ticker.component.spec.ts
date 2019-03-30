import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTickerComponent } from './game-ticker.component';

describe('GameTickerComponent', () => {
  let component: GameTickerComponent;
  let fixture: ComponentFixture<GameTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
