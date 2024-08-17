import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReqFormComponent } from './direct-req-form.component';

describe('DirectReqFormComponent', () => {
  let component: DirectReqFormComponent;
  let fixture: ComponentFixture<DirectReqFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectReqFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectReqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
