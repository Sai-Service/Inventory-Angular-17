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
}

@Component({
  selector: 'app-requition-report',
  templateUrl: './requition-report.component.html',
  styleUrl: './requition-report.component.css'
})
export class RequitionReportComponent {
  AdminReqReportForm:FormGroup;
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


  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute, ) {
    this.AdminReqReportForm = this.fb.group({
      fromDate: [],
      toDate: [],
      locId: [],
      ouId: [],

    })

   }

  ngOnInit(): void {

  }
  get f() { return this.AdminReqReportForm.controls; }
  adRequReport(AdminReqReportForm: any) {
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  reportDetails() {

    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.AdminReqReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.AdminReqReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    const fileName = 'ADMIN REQUSISION REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminRequsitionReport(sessionStorage.getItem('ouId'),fromDate, toDate)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })
  }

}