import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule,NgForm } from '@angular/forms';
import { ItTransactionRoutingModule } from './it-transaction-routing.module';
import { AssetDiscardComponent } from './asset-discard/asset-discard.component';
import { BillRecordComponent } from './bill-record/bill-record.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { GatePassGenComponent } from './gate-pass-gen/gate-pass-gen.component';
import { ItemMstSearchFrmComponent } from './item-mst-search-frm/item-mst-search-frm.component';
import { BillrcdSrcFormComponent } from './billrcd-src-form/billrcd-src-form.component';
import { TranasferFormComponent } from './tranasfer-form/tranasfer-form.component';
import { TrasListFormComponent } from './tras-list-form/tras-list-form.component';
import { RecievedListFormComponent } from './recieved-list-form/recieved-list-form.component';
import { RecievdListComponent } from './recievd-list/recievd-list.component';



@NgModule({
  declarations: [
    AssetDiscardComponent,
    BillRecordComponent,
    ItemMasterComponent,
    GatePassGenComponent,
    ItemMstSearchFrmComponent,
    BillrcdSrcFormComponent,
    TranasferFormComponent,
    TrasListFormComponent,
    RecievedListFormComponent,
    RecievdListComponent
  ],
  imports: [
    CommonModule,
    ItTransactionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItTransactionModule { }
