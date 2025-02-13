import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAupdateFormComponent } from './faupdate-form.component';

describe('FAupdateFormComponent', () => {
  let component: FAupdateFormComponent;
  let fixture: ComponentFixture<FAupdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FAupdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FAupdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
