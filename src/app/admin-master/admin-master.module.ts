import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule,Validators} from '@angular/forms';
import { AdminMasterRoutingModule } from './admin-master-routing.module';
import { ItemMasterComponent } from './item-master/item-master.component';
import { VendorMasterComponent } from './vendor-master/vendor-master.component';
import { DocumentMasterComponent } from './document-master/document-master.component';


@NgModule({
  declarations: [
    ItemMasterComponent,
    VendorMasterComponent,
    DocumentMasterComponent
  ],
  imports: [
    CommonModule,
    AdminMasterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminMasterModule { }
