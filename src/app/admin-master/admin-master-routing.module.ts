import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../it-master/dashboard/dashboard.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { DocumentMasterComponent } from './document-master/document-master.component';
import { VendorComponent } from '../it-master/vendor/vendor.component';

const routes: Routes = [
  {path:'itemMaster',component:ItemMasterComponent},
  {path:'DocMaster',component:DocumentMasterComponent},
  {path:'NewVendorMst',component:VendorComponent},
  {path:'Dashboard',component:DashboardComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMasterRoutingModule { }
