import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodRequisionFormComponent } from './hod-requision-form.component';

describe('HodRequisionFormComponent', () => {
  let component: HodRequisionFormComponent;
  let fixture: ComponentFixture<HodRequisionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodRequisionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HodRequisionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
