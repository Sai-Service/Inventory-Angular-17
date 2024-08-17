import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellReportComponent } from './miscell-report.component';

describe('MiscellReportComponent', () => {
  let component: MiscellReportComponent;
  let fixture: ComponentFixture<MiscellReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscellReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscellReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
