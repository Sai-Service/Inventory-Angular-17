import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequitionReportComponent } from './requition-report.component';

describe('RequitionReportComponent', () => {
  let component: RequitionReportComponent;
  let fixture: ComponentFixture<RequitionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequitionReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequitionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
