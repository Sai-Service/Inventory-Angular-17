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
import { ITFAcsvUploadFormComponent } from './itfacsv-upload-form/itfacsv-upload-form.component';
import { FAassetreportsComponent } from './faassetreports/faassetreports.component';
import { GatePassReportComponent } from './gate-pass-report/gate-pass-report.component';
import { ItinventoryDocumentryFormComponent } from './itinventory-documentry-form/itinventory-documentry-form.component';
import { FaCommonRepoComponent } from './fa-common-repo/fa-common-repo.component';
import { AssetHistoryFormComponent } from './asset-history-form/asset-history-form.component';
import { PMReportComponent } from './pmreport/pmreport.component';
import { PovExpMasterReporComponent } from './pov-exp-master-repor/pov-exp-master-repor.component';


@NgModule({
  declarations: [
    AssetInstallFormComponent,
    AllInvReportComponent,
    PurchaseReportComponent,
    AcountInvReportComponent,
    AssetTrnsReportComponent,
    AssetScrapReportComponent,
    ITFAcsvUploadFormComponent,
    FAassetreportsComponent,
    GatePassReportComponent,
    ItinventoryDocumentryFormComponent,
    FaCommonRepoComponent,
    AssetHistoryFormComponent,
    PMReportComponent,
    PovExpMasterReporComponent
  ],
  imports: [
    CommonModule,
    ItReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItReportsModule { }
