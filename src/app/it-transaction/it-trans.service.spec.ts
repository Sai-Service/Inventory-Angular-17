import { TestBed } from '@angular/core/testing';

import { ItTransService } from './it-trans.service';

describe('ItTransService', () => {
  let service: ItTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }); 
});
