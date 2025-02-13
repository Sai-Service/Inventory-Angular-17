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
  selector: 'app-gate-pass-report',
  templateUrl: './gate-pass-report.component.html',
  styleUrl: './gate-pass-report.component.css'
})
export class GatePassReportComponent {
  GatepassReportForm:FormGroup;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  fromDate: Date;
  toDate: Date;
  ouId:number;
  ouCity:string | null;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled1 = false;
  reportName: string;

  constructor(private fb: FormBuilder, private router: Router,private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.GatepassReportForm = this.fb.group({
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

get f() { return this.GatepassReportForm.controls; }
gpReport(GatepassReportForm: any) {}


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.GatepassReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
    this.ouCity = sessionStorage.getItem('ouCity');
  }


  reportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var accDt1 = this.GatepassReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(accDt1, 'dd-MMM-yyyy');
    var accDt2 = this.GatepassReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(accDt2, 'dd-MMM-yyyy');
    const fileName = 'GATE PASS REPORT -' + fromDate + '-TO-' + toDate + '.xlsx';
    var ouId = this.GatepassReportForm.get('ouId')?.value;
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.GatePassSummuryReport(fromDate,toDate,sessionStorage.getItem('ouId'), )
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }
}
