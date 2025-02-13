import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSearchFormComponent } from './budget-search-form.component';

describe('BudgetSearchFormComponent', () => {
  let component: BudgetSearchFormComponent;
  let fixture: ComponentFixture<BudgetSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
