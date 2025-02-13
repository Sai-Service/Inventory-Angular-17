import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSummaryRepoComponent } from './budget-summary-repo.component';

describe('BudgetSummaryRepoComponent', () => {
  let component: BudgetSummaryRepoComponent;
  let fixture: ComponentFixture<BudgetSummaryRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetSummaryRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetSummaryRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
