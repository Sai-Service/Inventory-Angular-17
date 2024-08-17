import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AdminReportsService } from '../admin-reports.service';
import { saveAs } from 'file-saver';
import { trim } from 'jquery';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-stock-transfer-made-report',
  templateUrl: './stock-transfer-made-report.component.html',
  styleUrl: './stock-transfer-made-report.component.css'
})
export class StockTransferMadeReportComponent {
  StoktrnsMadeForm:FormGroup;
  stockTransNo:string;
  ouId:number;
  displayButton = true;
  purchaseDt:Date;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
///private service: ReportServiceService

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: AdminReportsService) {
    this.StoktrnsMadeForm = this.fb.group({
      stockTransNo:[],
      ouId:[],


    })
 }
 ngOnInit(): void {
  $("#wrapper").toggleClass("toggled");
}

transData(val:any) {
  return val;
}

 refresh() {
  window.location.reload();
}

close() {
  this.location1.back();
}

get f() { return this.StoktrnsMadeForm.controls; }
stktrnMadeForm(StoktrnsMadeForm: any) { 
}

StockTransMadeView(){
  var orderNumber = this.StoktrnsMadeForm.get('stockTransNo')?.value;
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.viewStkTransMadeFn(orderNumber)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      // printWindow.open
    })
 }

}
