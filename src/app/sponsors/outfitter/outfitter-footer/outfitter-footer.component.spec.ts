import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitterFooterComponent } from './outfitter-footer.component';

describe('OutfitterFooterComponent', () => {
  let component: OutfitterFooterComponent;
  let fixture: ComponentFixture<OutfitterFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OutfitterFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
