import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStockReportComponent } from './all-stock-report.component';

describe('AllStockReportComponent', () => {
  let component: AllStockReportComponent;
  let fixture: ComponentFixture<AllStockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllStockReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
