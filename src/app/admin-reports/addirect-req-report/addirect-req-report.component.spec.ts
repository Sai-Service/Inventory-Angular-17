import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddirectReqReportComponent } from './addirect-req-report.component';

describe('AddirectReqReportComponent', () => {
  let component: AddirectReqReportComponent;
  let fixture: ComponentFixture<AddirectReqReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddirectReqReportComponent],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddirectReqReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
