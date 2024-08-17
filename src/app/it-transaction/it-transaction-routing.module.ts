import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'},
  {path:'AseetDiscard',component:AssetDiscardComponent},
  {path:'BillRecorder',component:BillRecordComponent},
  {path:'BillRecorder/:transId',component:BillRecordComponent},
  {path:'BillRecorder/:headerId:',component:BillRecordComponent},
  {path:'Billrcdsrchfrm',component:BillrcdSrcFormComponent},
  {path:'Itemmaster',component:ItemMasterComponent},
  {path:'Itemmaster/:itemCode',component:ItemMasterComponent},
  {path:'GatePasGen',component:GatePassGenComponent},
  {path:'itemMsrchFrm',component:ItemMstSearchFrmComponent},
  {path:'trasform',component:TranasferFormComponent},
  {path:'tranaList',component:TrasListFormComponent},
  {path:'recvdForm',component:RecievedListFormComponent},
  {path:'recvdForm/:transId',component:RecievedListFormComponent},
  {path:'recvdList',component:RecievdListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItTransactionRoutingModule { }
