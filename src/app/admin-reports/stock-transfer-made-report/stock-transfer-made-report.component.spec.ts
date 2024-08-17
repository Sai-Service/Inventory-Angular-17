import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferMadeReportComponent } from './stock-transfer-made-report.component';

describe('StockTransferMadeReportComponent', () => {
  let component: StockTransferMadeReportComponent;
  let fixture: ComponentFixture<StockTransferMadeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockTransferMadeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockTransferMadeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
