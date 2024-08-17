import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../it-master/dashboard/dashboard.component';
import { BudgetTransactionComponent } from './budget-transaction/budget-transaction.component';

const routes: Routes = [
  {path:'BudgetTransaction',component:BudgetTransactionComponent},
  {path:'Dashboard',component:DashboardComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetTransactionRoutingModule { }
