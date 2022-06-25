import { TestBed } from '@angular/core/testing';

import { WillsbachApiService } from './willsbach-api.service';

describe('WillsbachApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WillsbachApiService = TestBed.get(WillsbachApiService);
    expect(service).toBeTruthy();
  });
});
