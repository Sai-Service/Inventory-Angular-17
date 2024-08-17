import { TestBed } from '@angular/core/testing';

import { ItReportService } from './it-report.service';

describe('ItReportService', () => {
  let service: ItReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
