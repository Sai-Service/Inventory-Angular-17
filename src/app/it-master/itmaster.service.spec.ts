import { TestBed } from '@angular/core/testing';

import { ItmasterService } from './itmaster.service';

describe('ItmasterService', () => {
  let service: ItmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
