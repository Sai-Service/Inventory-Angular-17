import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMReportComponent } from './pmreport.component';

describe('PMReportComponent', () => {
  let component: PMReportComponent;
  let fixture: ComponentFixture<PMReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PMReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PMReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
