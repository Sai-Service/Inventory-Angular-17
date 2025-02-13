import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../it-master/dashboard/dashboard.component';
import { BudgetTransactionComponent } from './budget-transaction/budget-transaction.component';
import { BudgetSummaryRepoComponent } from './budget-summary-repo/budget-summary-repo.component';
import { BudgetSearchFormComponent } from './budget-search-form/budget-search-form.component';

const routes: Routes = [
  {path:'BudgetTransaction',component:BudgetTransactionComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'SummaryRepo',component:BudgetSummaryRepoComponent},
  {path:'BdgSearchFrom',component:BudgetSearchFormComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetTransactionRoutingModule { }
