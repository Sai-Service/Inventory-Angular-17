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
  selector: 'app-manual-gate-pass-report',
  templateUrl: './manual-gate-pass-report.component.html',
  styleUrl: './manual-gate-pass-report.component.css'
})
export class ManualGatePassReportComponent {
  gatepassrepoform:FormGroup;
  fromDate: Date| null;
  toDate: Date|null;
  locName: string;
  ouId: number |null;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  public RepLocationList: any = [];

  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute, ) {
    this.gatepassrepoform = this.fb.group({
    fromDate: [],
      toDate: [],
      locName: [],
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

  get f() { return this.gatepassrepoform.controls; }
  adgatepassReport(gatepassrepoform: any) {
  }

  public validation() {
    this.closeResetButton = false;
    this.progress = 0;
    var locName = this.gatepassrepoform.get('locName')?.value;


    if (locName === undefined || locName === null || locName === '') {
      alert('Please Select Location .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Location .!';
      return;
    }

  
  }

  reportDetails() {   
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.gatepassrepoform.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.gatepassrepoform.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    const fileName = 'GATEPASS REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    var locName = this.gatepassrepoform.get('locName')?.value;
    if (locName === null) { locName = undefined}
alert(locName)
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminGatepssReport(locName,fromDate, toDate)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })
  }



}