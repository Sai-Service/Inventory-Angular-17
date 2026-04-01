import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path:'AssetInstallForm',component:AssetInstallFormComponent},
  {path:'AllinvReport',component:AllInvReportComponent},
  {path:'purchReport',component:PurchaseReportComponent},
  {path:'AccInvReport',component:AcountInvReportComponent},
  {path:'AssetTrnsReport',component:AssetTrnsReportComponent},
  {path:'AssetScrapReport',component:AssetScrapReportComponent},
  {path:'ITFacsvFile',component:ITFAcsvUploadFormComponent},
  {path:'FAreport',component:FAassetreportsComponent},
  {path:'GpReport' ,component:GatePassReportComponent},
  {path:'docform', component:ItinventoryDocumentryFormComponent},
  {path:'FacomRepo',component:FaCommonRepoComponent},
  {path:'AssetHstFrm' , component:AssetHistoryFormComponent},
  {path:'PMReport' , component:PMReportComponent},
  {path:'povexpRepo', component:PovExpMasterReporComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItReportsRoutingModule { }
