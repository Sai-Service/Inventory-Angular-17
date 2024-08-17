import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service'
import { DatePipe, Location } from '@angular/common';

import { saveAs } from 'file-saver'
import { trim } from 'jquery';

const MIME_TYPES:any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-all-inv-report',
  templateUrl: './all-inv-report.component.html',
  styleUrl: './all-inv-report.component.css'
})
export class AllInvReportComponent {
  InventoryItemReportForm:FormGroup;
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
  ouCity:string|null;


  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled1 = false;
  reportName: string;

  public invItmRepLocationList: any = [];
public invItmRepDepartmentList:any = [];
public inItmRepItemTypeList:any =[];
public AccountInvReport:any = [];
isVisibleloactionReport:boolean=true;
isVisibleOuReport:boolean=true;
isVisibleSuperAdmin:boolean=true;
isVisibleAdmin:boolean=true;
getAllOuLocationIdFn:any=[];
public AlllocationitemList:any=[];


  constructor(private fb: FormBuilder, private router: Router, private service: ItReportService, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.InventoryItemReportForm = this.fb.group({

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

  get f() { return this.InventoryItemReportForm.controls; }
  invitem(InventoryItemReportForm: any) {
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    
    
    this.ouCity = sessionStorage.getItem('ouCity');


    this.service.getAccLocationSearchAllInv(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.invItmRepLocationList = data.obj;
          console.log(this.invItmRepLocationList);
        }
      );

   
      this.service.getAccDepartmentSearchAllInv()
      .subscribe(
        data => {
          this.invItmRepDepartmentList = data.obj;
          console.log(this.invItmRepDepartmentList);
        }
      );
      

      this.service.getAccItemtypeSearchAllInv()
      .subscribe(
        data => {
          this.inItmRepItemTypeList = data.obj;
          console.log(this.inItmRepItemTypeList);
        }
      )
      
      if(  sessionStorage.getItem('role')==='Admin') {
        this.InventoryItemReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
        this.isVisibleOuReport=false;
        this.isVisibleloactionReport=true;
        this.isVisibleSuperAdmin=false;
        this.isVisibleAdmin=true;
          
        }
        if(  sessionStorage.getItem('role')==='SuperAdmin') {
          this.isVisibleOuReport=true;
          this.isVisibleloactionReport=false;
          this.isVisibleSuperAdmin=true;
          this.isVisibleAdmin=false;
          }
        if(sessionStorage.getItem('role')==='User')
        {
          this.InventoryItemReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
          this.isVisibleOuReport=false;
          this.isVisibleloactionReport=true;
          this.isVisibleSuperAdmin=false;
          this.isVisibleAdmin=true;
        }
    

        this.service.AlllocationitemList()
        .subscribe(
          data => {
            this.AlllocationitemList = data.obj;
            console.log(this.AlllocationitemList);
          }
        );

  }


  reportDetails() {
   
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'ALL INVENTORY REPORT -' + '.xlsx';
    var locId = this.InventoryItemReportForm.get('locId')?.value;
    var ouId = this.InventoryItemReportForm.get('ouId')?.value;
    var depName = this.InventoryItemReportForm.get('dept')?.value;
    
    var prodName = this.InventoryItemReportForm.get('itemTypeId')?.value;
 
    if (locId === null) { locId = '' }
    if (depName === null) { depName = '' }
    if (prodName === null) { prodName = '' }
    // alert(prodName + '---locId' + locId);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.InventoryItemReport(sessionStorage.getItem('ouId'),locId,depName,prodName )
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        // this.isDisabled3 = false;
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generate Succefully.'
      })
  }

 SupperAdminreportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page'
    const fileName = 'ALL INVENTORY REPORT -' + '.xlsx';
    var locId = this.InventoryItemReportForm.get('locId')?.value;
    var ouId = this.InventoryItemReportForm.get('ouCity')?.value;
    var depName = this.InventoryItemReportForm.get('dept')?.value; 
    var prodName = this.InventoryItemReportForm.get('itemTypeId')?.value;
    if (locId === null) { locId = '' }
    if (depName === null) { depName = '' }
    if (prodName === null) { prodName = '' }
    if (ouId === null) { ouId = '' }
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.InventoryItemReport(ouId,locId,depName,prodName )
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generate Succefully.'
      })
  }




  onSelectOuCity(event:any) {
    var itemType = event.target.value;
    var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    var itemType12 = trim(itemType1);
    this.service.getAllOuLocationId(itemType12)
      .subscribe(
        data => {
          this.getAllOuLocationIdFn = data.obj;
          console.log(this.getAllOuLocationIdFn);
        }
      );
  }

 

  }










