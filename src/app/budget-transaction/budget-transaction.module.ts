import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule,Validators} from '@angular/forms';
import { BudgetTransactionRoutingModule } from './budget-transaction-routing.module';
import { BudgetTransactionComponent } from './budget-transaction/budget-transaction.component';


@NgModule({
  declarations: [
    BudgetTransactionComponent
  ],
  imports: [
    CommonModule,
    BudgetTransactionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BudgetTransactionModule { }
