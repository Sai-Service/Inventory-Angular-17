import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountInvReportComponent } from './acount-inv-report.component';

describe('AcountInvReportComponent', () => {
  let component: AcountInvReportComponent;
  let fixture: ComponentFixture<AcountInvReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcountInvReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcountInvReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
