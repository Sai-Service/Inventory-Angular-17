import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '', component: AdminPageComponent, children: [
      {
        path: 'itMaster',
        loadChildren: () => import('../it-master/it-master.module').then(mod => mod.ItMasterModule)
      },
      {
        path: 'itTransaction',
        loadChildren: () => import('../it-transaction/it-transaction.module').then(mod => mod.ItTransactionModule)
      },
      {
        path: 'itReports',
        loadChildren: () => import('../it-reports/it-reports.module').then(mod => mod.ItReportsModule)
      },
      {
        path: 'adminReports',
        loadChildren: () => import('../admin-reports/admin-reports.module').then(mod => mod.AdminReportsModule)
      },
      {
        path: 'adminMaster',
        loadChildren: () => import('../admin-master/admin-master.module').then(mod => mod.AdminMasterModule)
      },
      {
        path: 'adminTransaction',
        loadChildren: () => import('../admin-transaction/admin-transaction.module').then(mod => mod.AdminTransactionModule)
      },
      {
        path: 'budgetTransaction',
        loadChildren: () => import('../budget-transaction/budget-transaction.module').then(mod => mod.BudgetTransactionModule)
      },
      { path : '' ,redirectTo: 'itMaster', pathMatch: 'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
