import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../it-master/dashboard/dashboard.component';
import { MiscellReportComponent } from './miscell-report/miscell-report.component';
import { PurchaseComponent } from '../admin-transaction/purchase/purchase.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { RequitionReportComponent } from './requition-report/requition-report.component';
import { StocktransferReportComponent } from './stocktransfer-report/stocktransfer-report.component';
import { StockTransferMadeReportComponent } from './stock-transfer-made-report/stock-transfer-made-report.component';
import { AllStockReportComponent } from './all-stock-report/all-stock-report.component';
import { ManualGatePassReportComponent } from './manual-gate-pass-report/manual-gate-pass-report.component';
import { DirectReqFormComponent } from '../admin-transaction/direct-req-form/direct-req-form.component';
import { DirectreqRepoComponent } from './directreq-repo/directreq-repo.component';
import { StockTransReceComponent } from './stock-trans-rece/stock-trans-rece.component';
import { AdminStktrnsReportComponent } from './admin-stktrns-report/admin-stktrns-report.component';

const routes: Routes = [
  {path: 'miscellReport',component:MiscellReportComponent},
  {path:'purchaseReport',component:PurchaseReportComponent},
  {path:'requitionReport',component:RequitionReportComponent},
  {path:'stockTransReport',component:StocktransferReportComponent},
  {path:'stockMadeReport',component:StockTransferMadeReportComponent},
  {path:'allStockReport',component:AllStockReportComponent},
  {path:'manualGatePassReport',component:ManualGatePassReportComponent},
  {path:'directreq',component:DirectreqRepoComponent},
  // {path:'stockTransRece',component:StockTransReceComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'Stkrecipt',component:StockTransReceComponent},
  {path:'Adstktrnsrepo',component:AdminStktrnsReportComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReportsRoutingModule { }
