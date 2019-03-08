import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitterComponent } from './outfitter.component';

describe('OutfitterComponent', () => {
  let component: OutfitterComponent;
  let fixture: ComponentFixture<OutfitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
