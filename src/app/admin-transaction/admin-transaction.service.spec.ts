import { TestBed } from '@angular/core/testing';

import { AdminTransactionService } from './admin-transaction.service';

describe('AdminTransactionService', () => {
  let service: AdminTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
