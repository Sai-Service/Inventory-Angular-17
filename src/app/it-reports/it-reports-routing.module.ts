import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetInstallFormComponent } from './asset-install-form/asset-install-form.component';
import { AllInvReportComponent } from './all-inv-report/all-inv-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { AcountInvReportComponent } from './acount-inv-report/acount-inv-report.component';
import { AssetTrnsReportComponent } from './asset-trns-report/asset-trns-report.component';
import { AssetScrapReportComponent } from './asset-scrap-report/asset-scrap-report.component';

const routes: Routes = [
  {path:'AssetInstallForm',component:AssetInstallFormComponent},
  {path:'AllinvReport',component:AllInvReportComponent},
  {path:'purchReport',component:PurchaseReportComponent},
  {path:'AccInvReport',component:AcountInvReportComponent},
  {path:'AssetTrnsReport',component:AssetTrnsReportComponent},
  {path:'AssetScrapReport',component:AssetScrapReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItReportsRoutingModule { }
