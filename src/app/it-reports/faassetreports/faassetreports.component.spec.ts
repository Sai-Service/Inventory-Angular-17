import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAassetreportsComponent } from './faassetreports.component';

describe('FAassetreportsComponent', () => {
  let component: FAassetreportsComponent;
  let fixture: ComponentFixture<FAassetreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FAassetreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FAassetreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
