import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievdListComponent } from './recievd-list.component';

describe('RecievdListComponent', () => {
  let component: RecievdListComponent;
  let fixture: ComponentFixture<RecievdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecievdListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecievdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
