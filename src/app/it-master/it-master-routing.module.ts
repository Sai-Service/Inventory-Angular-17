import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetMasterComponent } from './budget-master/budget-master.component';
import { CodeMasterComponent } from './code-master/code-master.component';
import { CodeSubTypeComponent } from './code-sub-type/code-sub-type.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductSubTypeComponent } from './product-sub-type/product-sub-type.component';
import { LocationComponent } from './location/location.component';
import { OuComponent } from './ou/ou.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorItemComponent } from './vendor-item/vendor-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CodeTypeComponent } from './code-type/code-type.component';

const routes: Routes = [
  { path:'budgetMaster',component:BudgetMasterComponent},
  {path:'codeMaster',component:CodeMasterComponent},
  {path:'codesubtypeMaster',component:CodeSubTypeComponent},
  {path:'companyMaster',component:CompanyMasterComponent},
  {path:'empMaster',component:EmployeeComponent},
  {path:'inventorysubMaster',component:ProductSubTypeComponent},
  {path:'locationMaster',component:LocationComponent},
  {path:'ouMaster',component:OuComponent},
  {path:'vendorMaster',component:VendorComponent},
  {path:'vendoritemMaster',component:VendorItemComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'CodetypeMaster',component:CodeTypeComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItMasterRoutingModule { }
