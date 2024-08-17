import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingatepassgenComponent } from './admingatepassgen.component';

describe('AdmingatepassgenComponent', () => {
  let component: AdmingatepassgenComponent;
  let fixture: ComponentFixture<AdmingatepassgenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmingatepassgenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmingatepassgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
