import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule,NgForm } from '@angular/forms';
import { ItReportsRoutingModule } from './it-reports-routing.module';
import { AssetInstallFormComponent } from './asset-install-form/asset-install-form.component';
import { AllInvReportComponent } from './all-inv-report/all-inv-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { AcountInvReportComponent } from './acount-inv-report/acount-inv-report.component';
import { AssetTrnsReportComponent } from './asset-trns-report/asset-trns-report.component';
import { AssetScrapReportComponent } from './asset-scrap-report/asset-scrap-report.component';


@NgModule({
  declarations: [
    AssetInstallFormComponent,
    AllInvReportComponent,
    PurchaseReportComponent,
    AcountInvReportComponent,
    AssetTrnsReportComponent,
    AssetScrapReportComponent
  ],
  imports: [
    CommonModule,
    ItReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItReportsModule { }
