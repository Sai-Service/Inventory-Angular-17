import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { AdRequsitionComponent } from './ad-requsition/ad-requsition.component';
import { AdRequListComponent } from './ad-requ-list/ad-requ-list.component';
import { AdUserRequFormComponent } from './ad-user-requ-form/ad-user-requ-form.component';
import { StockAvailableFromComponent } from './stock-available-from/stock-available-from.component';
import { PendingShipmentListComponent } from './pending-shipment-list/pending-shipment-list.component';
import { DashboardComponent } from '../it-master/dashboard/dashboard.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { DirectReqFormComponent } from './direct-req-form/direct-req-form.component';
import { MiscellaneousTrascComponent } from './miscellaneous-trasc/miscellaneous-trasc.component';
import { GatePassGenComponent } from '../it-transaction/gate-pass-gen/gate-pass-gen.component';
import { AdmingatepassgenComponent } from './admingatepassgen/admingatepassgen.component';

const routes: Routes = [

  {path:'AdminPurchase',component:PurchaseComponent},
  {path:'AdminRequForm',component:AdRequsitionComponent},
  {path:'AdREqList',component:AdRequListComponent},
  {path:'AdminRequForm/:reqhdNo',component:AdRequsitionComponent},
  {path:'AdminUserRequ',component:AdUserRequFormComponent},
  {path:'StkAvailFrom',component:StockAvailableFromComponent},
  {path:'PendShipForm',component:PendingShipmentListComponent},
  {path:'StockTransfer',component:StockTransferComponent},
  {path:'ReceiptForm',component:ReceiptFormComponent},
  {path:'ReceiptForm/:shipmentNumber',component:ReceiptFormComponent},
  {path:'Directreq',component:DirectReqFormComponent},
  {path:'miscellusform',component:MiscellaneousTrascComponent},
  {path:'gatepassform',component:AdmingatepassgenComponent},
  {path:'Dashboard',component:DashboardComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTransactionRoutingModule { }
