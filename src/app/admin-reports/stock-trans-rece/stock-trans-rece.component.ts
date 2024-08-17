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
  selector: 'app-stock-trans-rece',
  templateUrl: './stock-trans-rece.component.html',
  styleUrl: './stock-trans-rece.component.css'
})
export class StockTransReceComponent {
  StktrnsreciptForm:FormGroup;
  stockTransNo:string;
  ouId:number;
  displayButton = true;
  purchaseDt:Date;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
///private service: ReportServiceService,
//private reportService: ReportServiceService

  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute) {
    this.StktrnsreciptForm = this.fb.group({
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

  get f() { return this.StktrnsreciptForm.controls; }
  stktrnsreciptForm(StktrnsreciptForm: any) {
    
  }

  // reportDetails() {
  //   this.closeResetButton = false;
  //   this.progress = 0;
  //   this.dataDisplay = 'Report Is Running....Do not refresh the Page';
  //   const fileName = 'Asset Installation Form' + '.pdf';
  //   var stockTransNo = this.StktrnsreciptForm.get('stockTransNo')?.value;
  //   alert(stockTransNo);
    
  //   // const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  //   this.service.AdStktranReciptForm(stockTransNo)
  //     // .subscribe(data => {
  //     //   saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
  //     //   this.closeResetButton = true;
  //     //   this.dataDisplay = ''
       
  //     // })
  // }

  StockReciptView(){
    var orderNumber = this.StktrnsreciptForm.get('stockTransNo')?.value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.viewStkreciptviewFn(orderNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
      })
   }

}
