import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualGatePassReportComponent } from './manual-gate-pass-report.component';

describe('ManualGatePassReportComponent', () => {
  let component: ManualGatePassReportComponent;
  let fixture: ComponentFixture<ManualGatePassReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualGatePassReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualGatePassReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
