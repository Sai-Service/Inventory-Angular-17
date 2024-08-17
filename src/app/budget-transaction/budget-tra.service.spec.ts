import { TestBed } from '@angular/core/testing';

import { BudgetTraService } from './budget-tra.service';

describe('BudgetTraService', () => {
  let service: BudgetTraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetTraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
