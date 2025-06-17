import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpenseMasterComponent } from './budget-expense-master.component';

describe('BudgetExpenseMasterComponent', () => {
  let component: BudgetExpenseMasterComponent;
  let fixture: ComponentFixture<BudgetExpenseMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetExpenseMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetExpenseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
