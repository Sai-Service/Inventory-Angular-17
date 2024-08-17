import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service'
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';
import { trim } from 'jquery';

const MIME_TYPES :any= {
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

  purchaseReportForm: FormGroup;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  purchasereportName: string;
  fromDate: Date;
  toDate: Date;
  locId: number;
  ouId: number;
  vendorId: number;
  status: string;
  ouCity:string | null;
  expType: string;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled1 = false;

  reportName: string;

  //////TEMPORARY//////
  public RepLocationList: any = [];
  public ExpTypeList: any = [];
  public AllVendorList: any = [];
  public AssetPurchaseReport: any = [];
  isVisibleloactionReport :boolean=true;
  isVisibleOuReport:boolean=true;
  isVisibleLocAdmin:boolean=true;
  isVisibleLoclovAdmin:boolean=true;
  isVisibleCitysupAdmin:boolean=true;
  isVisiblelovCitysupAdmin:boolean=true;
  isVisibleLocsupAdmin:boolean=true;
  isVisibleLoclovsupAdmin:boolean=true;

  isVisiblesupAdmin:Boolean=true;
  isVisibleAdmin:boolean=true;


  getAllOuLocationIdFn:any=[];
  public AlllocationitemList: any=[];

  constructor(private fb: FormBuilder, private router: Router, private service: ItReportService, private location1: Location, private router1: ActivatedRoute,private reportService: ItReportService) {
    this.purchaseReportForm = this.fb.group({
      fromDate: [],
      toDate: [],
      locId: [],
      ouId: [],
      vendorId: [],
      status: [],
      expType: [],
      ouCity:[],


    })
  }



  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  get f() { return this.purchaseReportForm.controls; }
  purchaseReport(purchaseReportForm: any) {
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");

    this.ouCity = sessionStorage.getItem('ouCity');
  
    
    this.service.getLocationSearch(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.RepLocationList = data.obj;
          console.log(this.RepLocationList);
        }
      );


    this.service.ExpTypeList()
      .subscribe(
        data => {
          this.ExpTypeList = data.obj;
          console.log(this.ExpTypeList);
        }
      );

    this.service.AllVendorList()
      .subscribe(
        data => {
          this.AllVendorList = data.obj;
          console.log(this.AllVendorList);
        }
      );
      


      this.service.AlllocationitemList()
        .subscribe(
          data => {
            this.AlllocationitemList = data.obj;
            console.log(this.AlllocationitemList);
          }
        );


      
      if(  sessionStorage.getItem('role')==='Admin') {
        this.purchaseReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
        this.isVisibleOuReport=false;
        this.isVisibleloactionReport=true;
        this.isVisibleLocAdmin=true;
        this.isVisibleLoclovAdmin=true;
        this.isVisibleCitysupAdmin=false;
        this.isVisiblelovCitysupAdmin=false;
        this.isVisibleLocsupAdmin=false;
        this.isVisibleLoclovsupAdmin=false;

        this.isVisiblesupAdmin=false;
        this.isVisibleAdmin=true;
          
        }
        if(  sessionStorage.getItem('role')==='SuperAdmin') {
          this.isVisibleOuReport=true;
          this.isVisibleloactionReport=false;
          this.isVisibleLocAdmin=false;
        this.isVisibleLoclovAdmin=false;
        this.isVisibleCitysupAdmin=true;
        this.isVisiblelovCitysupAdmin=true;
        this.isVisibleLocsupAdmin=true;
        this.isVisibleLoclovsupAdmin=true;

        this.isVisiblesupAdmin=true;
        this.isVisibleAdmin=false;
          
          }
        if(sessionStorage.getItem('role')==='User')
        {
          this.purchaseReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
          this.isVisibleOuReport=false;
          this.isVisibleloactionReport=true;
          this.isVisibleLocAdmin=true;
        this.isVisibleLoclovAdmin=true;
        this.isVisibleCitysupAdmin=false;
        this.isVisiblelovCitysupAdmin=false;
        this.isVisibleLocsupAdmin=false;
        this.isVisibleLoclovsupAdmin=false;

        this.isVisiblesupAdmin=false;
        this.isVisibleAdmin=true;
        
        }
    


  }
  
  reportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.purchaseReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.purchaseReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    const fileName = 'PURCHASE REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    var exptypText = this.purchaseReportForm.get('expType')?.value;
    // alert(exptypText);
    var locId = this.purchaseReportForm.get('locId')?.value;
    var ouId = this.purchaseReportForm.get('ouId')?.value;
    var vendorId = this.purchaseReportForm.get('vendorId')?.value;
    if (locId === null) { locId = '' }
    if (vendorId === null) { vendorId = '' }
    if (exptypText === null) { exptypText = '' }
    // alert(vendorId + '---locId' + locId);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.AssetPurchaseReport(sessionStorage.getItem('ouId'), fromDate, toDate, locId, vendorId, exptypText)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }


  SuperAdmimreportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.purchaseReportForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.purchaseReportForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    const fileName = 'PURCHASE REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    var exptypText = this.purchaseReportForm.get('expType')?.value;
    alert(exptypText);
    var locId = this.purchaseReportForm.get('locId')?.value;
    var ouId = this.purchaseReportForm.get('ouId')?.value;
    var vendorId = this.purchaseReportForm.get('vendorId')?.value;
    if (locId === null) { locId = '' }
    if (vendorId === null) { vendorId = '' }
    if (exptypText === null) { exptypText = '' }
    if (ouId === null) { ouId = '' }
    alert(vendorId + '---locId' + locId);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.AssetPurchaseReport(ouId,fromDate, toDate, locId, vendorId, exptypText)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
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






