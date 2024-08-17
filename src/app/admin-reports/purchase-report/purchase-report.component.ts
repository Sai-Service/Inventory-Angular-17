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
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrl: './purchase-report.component.css'
})
export class PurchaseReportComponent {
  adpurReportForm: FormGroup;
  fromDate: Date| null;
  toDate: Date|null;
  locId: number|null;
  ouId: number |null;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  public RepLocationList: any = [];

  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute) {
    this.adpurReportForm = this.fb.group({
    fromDate: [],
      toDate: [],
      locId: [],
      ouId: [],
    })
   }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");

    this.service.getLocationSearch(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.RepLocationList = data.obj;
          console.log(this.RepLocationList);
        }
      );

    



  }



  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  get f() { return this.adpurReportForm.controls; }
  adpurchaseReport(adpurReportForm: any) {
  }

  public validation() {
    this.closeResetButton = false;
    this.progress = 0;
    var locId = this.adpurReportForm.get('locId')?.value;


    if (locId === undefined || locId === null || locId === '') {
      alert('Please Select Location .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Enter Bill No .!';
      return;
    }

  
  }

  reportDetails() {
    // var isvaliddata1 = this.validation();
    //       if (isvaliddata1 === false) {
    //         return;
    //       }     
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.adpurReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.adpurReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    const fileName = 'ADMIN STOCK PURCHASE REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    var locId = this.adpurReportForm.get('locId')?.value;
    if (locId === null) { locId = undefined }

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminPurchaseReport(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })
  }



}

// }