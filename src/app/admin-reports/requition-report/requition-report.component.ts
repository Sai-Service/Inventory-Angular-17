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
  locName:string;
  locationId:number;
  deptId:number;

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  locIdList:any=[];
  isVisibletoadmin:boolean;
  isVisibletocmn:boolean;
  isVisibleViewAdmin:boolean;


  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute, ) {
    this.AdminReqReportForm = this.fb.group({
      fromDate: [],
      toDate: [],
      locId: [],
      ouId: [],
      locName:[],
      locationId:[],
  deptId:[],

    })

   }

  ngOnInit(): void {

    
if( sessionStorage.getItem('role') ==='Admin')  {

  this.isVisibletoadmin=true;
  this.isVisibleViewAdmin=true;
  this.isVisibletocmn=true;
 
  }
  if( sessionStorage.getItem('role') ==='SupAdmin')  {

    this.isVisibletoadmin=true;
    this.isVisibleViewAdmin=true;
    this.isVisibletocmn=true;
   
    }
  if(sessionStorage.getItem('role')  ==='User')  
  {
  this.isVisibletoadmin=false;
  this.isVisibleViewAdmin=false;
  this.isVisibletocmn=false;
 
  }

  this.service.TolocationIdList(sessionStorage.getItem('ouId') )
  .subscribe((data:any) => {
    this.locIdList = data.obj;
    let locCodeList = this.locIdList.filter((locId:any) => (locId.locId))
    console.log(locCodeList);
    this.locIdList=locCodeList;
    })



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

  reportDetailsAdmin() {

    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.AdminReqReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.AdminReqReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    var ouId = sessionStorage.getItem('ouId');
    var cmntypeId=this.AdminReqReportForm.get('deptId')?.value;   
    var locId = this.AdminReqReportForm.get('locationId')?.value;
    var attribute='';
    if (locId === null) { ouId = sessionStorage.getItem('ouId'); locId=''}
    if (cmntypeId === null) { cmntypeId = '' }
    const fileName = 'ADMIN REQUSISION REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminRequsitionReport(ouId,fromDate,toDate,locId,cmntypeId,attribute)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })
  }




  reportDetailsuser() {

    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.AdminReqReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.AdminReqReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    var ouId = sessionStorage.getItem('ouId');
   var cmntypeId =sessionStorage.getItem('deptId')
   var locId = sessionStorage.getItem('locId')
   var attribute = sessionStorage.getItem('tktNo')
    if (locId === null) { ouId = sessionStorage.getItem('ouId'); locId=''}
    if (cmntypeId === null) { cmntypeId = '' }
    const fileName = 'ADMIN REQUSISION REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AdminRequsitionReport(ouId,fromDate,toDate,locId,cmntypeId,attribute)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
      })
  }



  onlocationissueselect(event:any){
    var locName = event.target.value;
    // debugger;
    // alert('-------'+locName+'--------');
    console.log( this.locIdList);
    var locNameList = this.locIdList.find((d:any) => d.locName === locName)
    console.log(locNameList);
    var locaId=locNameList.locId;
    // alert(locaId)
    this.AdminReqReportForm.patchValue({locationId:locNameList.locId});
   
    }
}