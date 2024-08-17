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
  selector: 'app-all-stock-report',
  templateUrl: './all-stock-report.component.html',
  styleUrl: './all-stock-report.component.css'
})
export class AllStockReportComponent {
  allStockForm:FormGroup;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  fromDate: Date;
  toDate: Date;
  ouId:number;
  locId:number;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  RepLocationList:any[];

  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute, ) {
    this.allStockForm = this.fb.group({
      toDate:[],
      fromDate:[],
      ouId:[],
      locId:[],

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

  get f() { return this.allStockForm.controls; }
  allStock(allStockForm: any) {
  }

  reportDetails(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    
    const fileName = 'ADMIN STOCK REPORT' +'.xlsx';
    var locId = this.allStockForm.get('locId')?.value;
    if (locId === null) { locId = undefined }

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminStockAvaiReport(sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })


  }
}