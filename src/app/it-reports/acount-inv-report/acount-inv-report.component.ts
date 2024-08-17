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
  selector: 'app-acount-inv-report',
  templateUrl: './acount-inv-report.component.html',
  styleUrl: './acount-inv-report.component.css'
})
export class AcountInvReportComponent {
  AccountReportForm:FormGroup;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  fromDate: Date;
  toDate: Date;
  ouId:number;
  locId:number;
  dept:number;
  itemTypeId:number;
  ouName:string;
  ouCity:string | null;


  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled1 = false;
  reportName: string;
  ///service//
  public AccRepLocationList: any = [];
public AccRepDepartmentList:any = [];
public AccRepItemTypeList:any =[];
public AccountInvReport:any = [];



  constructor(private fb: FormBuilder, private router: Router, private service: ItReportService, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.AccountReportForm = this.fb.group({

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

  get f() { return this.AccountReportForm.controls; }
  AccReport(AccountReportForm: any) {
  }







  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    
    this.AccountReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
    this.ouCity = sessionStorage.getItem('ouCity');
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



      this.service.getAccItemtypeSearch()
      .subscribe(
        data => {
          this.AccRepItemTypeList = data.obj;
          console.log(this.AccRepItemTypeList);
        }
      )


  }

  reportDetails() {
   
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
  
    const fileName = 'ACCOUNT INVENTORY REPORT -' + '.xlsx';
   
    var locId = this.AccountReportForm.get('locId')?.value;
    var ouId = this.AccountReportForm.get('ouId')?.value;
    var depName = this.AccountReportForm.get('dept')?.value;
    var prodName = this.AccountReportForm.get('itemTypeId')?.value;
  
    if (locId === null) { locId = '' }
    if (depName === null) { depName = '' }
    if (prodName === null) { prodName = '' }
    // alert(prodName + '---locId' + locId);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.AccountInvReport(sessionStorage.getItem('ouId'),locId,depName,prodName )
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        // this.isDisabled3 = false;
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generate Succefully.'
      })
  }
  
  }





  
