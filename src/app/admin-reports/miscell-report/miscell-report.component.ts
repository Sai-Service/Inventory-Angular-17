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
  selector: 'app-miscell-report',
  templateUrl: './miscell-report.component.html',
  styleUrl: './miscell-report.component.css'
})
export class MiscellReportComponent {
  AdminmiscellReport:FormGroup;
  locId: number;
  ouId: number |null;
  city:string;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  RepLocationList:any[];

  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService,  private router1: ActivatedRoute) {
    this.AdminmiscellReport = this.fb.group({
      locId: [],
      ouId: [],
      city:[],
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
      this.AdminmiscellReport.patchValue({city:sessionStorage.getItem('ouName')})
      
      this.allFiledDisable()
  }
  allFiledDisable(){
    this.AdminmiscellReport.get('city')?.disable() 
  }

  refresh() {
    window.location.reload();
  }

  close() {
    // this.location1.back();
    this.router.navigate(['admin']);
  }

  get f() { return this.AdminmiscellReport.controls; }
  admiscellReport(AdminmiscellReport: any) {
  }

  reportDetails(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'ADMIN STOCK MISSCELLANEOUS REPORT'+ '.xlsx';
    var locId = this.AdminmiscellReport.get('locId')?.value;
    if (locId === null) { locId = " " }
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminMisscellReport(sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })

  }
}