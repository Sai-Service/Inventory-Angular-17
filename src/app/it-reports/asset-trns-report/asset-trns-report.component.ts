import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service'
import { DatePipe, Location } from '@angular/common';

import { saveAs } from 'file-saver'

const MIME_TYPES:any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-asset-trns-report',
  templateUrl: './asset-trns-report.component.html',
  styleUrl: './asset-trns-report.component.css'
})
export class AssetTrnsReportComponent {
  TransferReportForm:FormGroup;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  fromDate: Date;
  toDate: Date;
  ouId:number;
  ouCity:string| null;

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled1 = false;
  reportName: string;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.TransferReportForm = this.fb.group({
      fromDate:[],
      toDate: [],
      ouId:[],
      ouCity:[],


    })

  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  get f() { return this.TransferReportForm.controls; }
  TransReport(TransferReportForm: any) {
  }




  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.TransferReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
    this.ouCity = sessionStorage.getItem('ouCity');


  }

  reportDetails() {
   this.closeResetButton = false;
   this.progress = 0;
   this.dataDisplay = 'Report Is Running....Do not refresh the Page';
   var accDt1 = this.TransferReportForm.get('fromDate')?.value;
   var fromDate = this.pipe.transform(accDt1, 'dd-MMM-yyyy');
   var accDt2 = this.TransferReportForm.get('toDate')?.value;
   var toDate = this.pipe.transform(accDt2, 'dd-MMM-yyyy');
   const fileName = 'ASSET TRANSFER REPORT -' + '.xlsx';
   var ouId = this.TransferReportForm.get('ouId')?.value;
   const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
   this.reportService.TransferItemReport(fromDate,toDate,sessionStorage.getItem('ouId'), )
     .subscribe(data => {
       saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
       // this.isDisabled3 = false;
       this.closeResetButton = true;
       this.dataDisplay = ''
     })
 }

}
