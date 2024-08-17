import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AdminTransactionRoutingModule } from './admin-transaction-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { AdRequsitionComponent } from './ad-requsition/ad-requsition.component';
import { AdRequListComponent } from './ad-requ-list/ad-requ-list.component';
import { AdUserRequFormComponent } from './ad-user-requ-form/ad-user-requ-form.component';
import { StockAvailableFromComponent } from './stock-available-from/stock-available-from.component';
import { PendingShipmentListComponent } from './pending-shipment-list/pending-shipment-list.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { DirectReqFormComponent } from './direct-req-form/direct-req-form.component';
import { MiscellaneousTrascComponent } from './miscellaneous-trasc/miscellaneous-trasc.component';
import { AdmingatepassgenComponent } from './admingatepassgen/admingatepassgen.component';


@NgModule({
  declarations: [
    
    PurchaseComponent,
             AdRequsitionComponent,
             AdRequListComponent,
             AdUserRequFormComponent,
             StockAvailableFromComponent,
             PendingShipmentListComponent,
             StockTransferComponent,
             ReceiptFormComponent,
             DirectReqFormComponent,
             MiscellaneousTrascComponent,
             AdmingatepassgenComponent
  ],
  imports: [
    CommonModule,
    AdminTransactionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminTransactionModule { }
