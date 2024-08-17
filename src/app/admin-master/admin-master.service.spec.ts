import { TestBed } from '@angular/core/testing';


import { AdminMasterService } from './admin-master.service';

describe('AdminMasterService', () => {
  let service: AdminMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
