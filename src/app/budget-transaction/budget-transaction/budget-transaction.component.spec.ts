import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTransactionComponent } from './budget-transaction.component';

describe('BudgetTransactionComponent', () => {
  let component: BudgetTransactionComponent;
  let fixture: ComponentFixture<BudgetTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
