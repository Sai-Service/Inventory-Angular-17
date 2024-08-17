import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStktrnsReportComponent } from './admin-stktrns-report.component';

describe('AdminStktrnsReportComponent', () => {
  let component: AdminStktrnsReportComponent;
  let fixture: ComponentFixture<AdminStktrnsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStktrnsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminStktrnsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
