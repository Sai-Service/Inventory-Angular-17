import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodapprovalFormComponent } from './hodapproval-form.component';

describe('HodapprovalFormComponent', () => {
  let component: HodapprovalFormComponent;
  let fixture: ComponentFixture<HodapprovalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodapprovalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HodapprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
