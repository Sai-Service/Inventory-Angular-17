import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule,Validators} from '@angular/forms';
import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { MiscellReportComponent } from './miscell-report/miscell-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { RequitionReportComponent } from './requition-report/requition-report.component';
import { StocktransferReportComponent } from './stocktransfer-report/stocktransfer-report.component';
import { StockTransferMadeReportComponent } from './stock-transfer-made-report/stock-transfer-made-report.component';
import { AllStockReportComponent } from './all-stock-report/all-stock-report.component';
import { ManualGatePassReportComponent } from './manual-gate-pass-report/manual-gate-pass-report.component';
import { DirectreqRepoComponent } from './directreq-repo/directreq-repo.component';
import { StockTransReceComponent } from './stock-trans-rece/stock-trans-rece.component';
import { AdminStktrnsReportComponent } from './admin-stktrns-report/admin-stktrns-report.component';


@NgModule({
  declarations: [
    MiscellReportComponent,
    PurchaseReportComponent,
    RequitionReportComponent,
    StocktransferReportComponent,
    StockTransferMadeReportComponent,
    AllStockReportComponent,
    ManualGatePassReportComponent,
    DirectreqRepoComponent,
    StockTransReceComponent,
    AdminStktrnsReportComponent
  ],
  imports: [
    CommonModule,
    AdminReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminReportsModule { }
