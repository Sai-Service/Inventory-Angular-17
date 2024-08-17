import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedListFormComponent } from './recieved-list-form.component';

describe('RecievedListFormComponent', () => {
  let component: RecievedListFormComponent;
  let fixture: ComponentFixture<RecievedListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecievedListFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecievedListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
