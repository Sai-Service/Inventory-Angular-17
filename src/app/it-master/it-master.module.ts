import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { ItMasterRoutingModule } from './it-master-routing.module';
import { BudgetMasterComponent } from './budget-master/budget-master.component';
import { CodeMasterComponent } from './code-master/code-master.component';
import { CodeSubTypeComponent } from './code-sub-type/code-sub-type.component';
import { CodeTypeComponent } from './code-type/code-type.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductSubTypeComponent } from './product-sub-type/product-sub-type.component';
import { LocationComponent } from './location/location.component';
import { OuComponent } from './ou/ou.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorItemComponent } from './vendor-item/vendor-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    BudgetMasterComponent,
    CodeMasterComponent,
    CodeSubTypeComponent,
    CodeTypeComponent,
    CompanyMasterComponent,
    EmployeeComponent,
    ProductSubTypeComponent,
    LocationComponent,
    OuComponent,
    VendorComponent,
    VendorItemComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ItMasterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItMasterModule { }
