import { TestBed, inject } from '@angular/core/testing';

import { HvwService } from './hvw.service';

describe('HvwService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HvwService]
    });
  });

  it('should be created', inject([HvwService], (service: HvwService) => {
    expect(service).toBeTruthy();
  }));
});
