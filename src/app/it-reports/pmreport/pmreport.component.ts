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
  selector: 'app-pmreport',
  templateUrl: './pmreport.component.html',
  styleUrl: './pmreport.component.css'
})
export class PMReportComponent {
PMreportForm:FormGroup;
ouId:number;
locId:number;
dept:number;
ouCity:string;
closeResetButton = true;
dataDisplay: any;
progress = 0;

public AccRepLocationList: any = [];
public AccRepDepartmentList:any = [];
constructor(private fb: FormBuilder, private router: Router, private service: ItReportService, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
  this.PMreportForm = this.fb.group({

    fromDate:[],
    toDate: [],
    ouId:[],
    locId:[],
    dept:[],
    itemTypeId:[],
    ouName:[],
    ouCity:[],
    
    
  })
}

refresh() {
  window.location.reload();
}

close() {
  this.location1.back();
}

get f() { return this.PMreportForm.controls; }
PMreport(PMreportForm: any) {
}



ngOnInit(): void {
  $("#wrapper").toggleClass("toggled");
  
  this.PMreportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
  this.PMreportForm.patchValue({ ouCity: sessionStorage.getItem('ouCity') })
  // this.ouCity = sessionStorage.getItem('ouCity');
  this.service.getAccLocationSearch(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.AccRepLocationList = data.obj;
        console.log(this.AccRepLocationList);
      }
    );

 
    this.service.getAccDepartmentSearch()
    .subscribe(
      data => {
        this.AccRepDepartmentList = data.obj;
        console.log(this.AccRepDepartmentList);
      }
    );


  

}

reportDetails() {
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Report Is Running....Do not refresh the Page';
  var locId = this.PMreportForm.get('locId')?.value;
  var ouId = this.PMreportForm.get('ouId')?.value;
  var depName = this.PMreportForm.get('dept')?.value;
  if (locId === null) { locId = '' }
  if (depName === null) { depName = '' }
  const fileName = 'PM INVENTORY REPORT -' + locId +'.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.PMInvReport(sessionStorage.getItem('ouId'),locId,depName)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      // this.isDisabled3 = false;
      this.closeResetButton = true;
      this.dataDisplay = 'PM Report Generate Succefully.'
    })
}

reportExcelDetails() {
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Report Is Running....Do not refresh the Page';
  var locId = this.PMreportForm.get('locId')?.value;
  var ouId = this.PMreportForm.get('ouId')?.value;
  var depName = this.PMreportForm.get('dept')?.value;
  if (locId === null) { locId = '' }
  if (depName === null) { depName = '' }
  const fileName = 'PM INVENTORY REPORT -' + locId +'.xlsx';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.PMInvExcelReport(sessionStorage.getItem('ouId'),locId,depName)
    .subscribe(data => {
      saveAs(new Blob([data],{ type: MIME_TYPES[EXT] }), fileName);
    
      this.closeResetButton = true;
      this.dataDisplay = 'PM Report Generate Succefully.'
    })
}





}







