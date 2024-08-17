import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItTransService} from '../it-trans.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import * as xlsx from 'xlsx';
import { trim } from 'jquery';
import { TypeofExpr } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver'
import {  Location } from '@angular/common';


const MIME_TYPES:any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface ItrnsitemMaster {

  itemId: number;
  itemCode: string;
  itemType: string;
  itemsubType: string;
  itemTypeId: Number
  typeId: number;
  srlNo: Number;
  ownership: string;
  city: number;
  ouId: number;
  legalEntity: number;
  location: number;
  location1:number;
  locId: number;
  division: number;
  dept: number;
  noofUsers: number;
  usertktNo: string;
  userName: string;
  userDesigntn: string;
  usercontactNo: string;
  emailId: string;
  emailPassword: string;
  emailType: string;
  emailPackage: string;
  codesubName: string;
  codesubType: number;
  codeDesc: string;
  region: string;
  productMake: String;
  productmodelDetails: String;
  productserialNo: String;
  cpu: string;
  ram: string;
  hdd: string;
  config4: string;
  os: string;
  oslicMode: string;
  oslicKey: string;
  officeSW: string;
  licMode: string;
  licKey: string;
  avSW: string;
  avexpDate: string;
  avlicKey: string;
  purchaserefNo: Number;
  purchaseInvNo: string;
  purchaseCost: string;
  purchaseDt: Date;
  warrntyDt: Date;
  vendorName: string;
  addinfo: string;
  amcSupport: string;
  dongleAttached: string;
  internetStatus: string;
  ipAddress: string;
  usbBlocked: string;
  discardReason: string;
  discardDt: Date;
  dtofInstall: Date;
  faNo: string;
  insuDetails: string;
  monitemCode: string;
  monitorModel: string;
  monitorserialNo: string;
  type: string;
  weDt: Date;
  monitorfaNo: string;
  remarks: string;
  createdBy: string;
  creationDate: Date;
  monitorMake: string;
  lastUpdatedBy: string;
  lastUpdationDt: Date;
  startDate: Date;
  endDate: string;
  subtypeName: string;
  // attribute1:number;
  cmntypeId: Number;
  prodName: string;
  status: string;

  bajjajRyn: string;
  erpYn: string;
  dmsYn: string;
  myear: string;
  monRemarks:string;



  todaysDataTime: Date;

  displayEndDate: false;
  displaystartDate: true;

  closeResetButton: true;
  displayStatus: false;
  progress: 0;

  generalValue: string;
  loginArray: string;
  loginArray1: string;
  fanoYN:string;
  mtmNo:string;
  avlicKeyYN:string;



  (startDate: DatePipe, todaysDataTime: DatePipe): DatePipe;





}

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.css'
})

export class ItemMasterComponent {
  @ViewChild('itemMtable1', { static: false }) itemMtable1: ElementRef;
  itemMasterForm: FormGroup;
  srlNo: Number;
  itemId: number;
  itemCode: string;
  typeId: number;
  itemType: string;
  itemsubType: string;
  itemTypeId: Number;
  ownership: string;
  city: number;
  ouId: number;

  legalEntity: number;
  location: number;
  location1:number;
  locId: number;

  division: number;
  dept: number;
  usertktNo: string;
  userName: string;
  userDesigntn: string;
  usercontactNo: string;
  noofUsers: number;
  emailId: string;
  emailPassword: string;
  emailType: string;
  emailPackage: string;
  codesubName: string;
  codesubType: number;
  codeDesc: string;
  region: string;
  productMake: String;
  productmodelDetails: String;
  productserialNo: String;
  cpu: string;
  ram: string;
  hdd: string;
  config4: string;
  os: string;
  oslicMode: string;
  oslicKey: string;
  officeSW: string;
  licMode: string;
  licKey: string;
  avSW: string;
  avexpDate: string;
  avlicKey: string;
  purchaserefNo: Number;
  purchaseInvNo: string;
  purchaseCost: String;
  purchaseDt: Date;
  warrntyDt: Date;
  vendorName: string;
  addinfo: string;
  amcSupport: string;
  dongleAttached: string;
  internetStatus: string;
  ipAddress: string;
  usbBlocked: string;
  discardReason: string;
  discardDt: Date;
  dtofInstall: Date;
  faNo: string;
  insuDetails: string;
  monitorModel: string;
  monitorserialNo: string;
  monitemCode: string;
  type: string;
  weDt: Date;
  monitorfaNo: string;
  remarks: string;
  createdBy: string;
  creationDate: Date;
  monitorMake: string;
  lastUpdatedBy: string;
  lastUpdationDt: Date;
  subtypeName: string;
  startDate: Date;
  status: string;
  displayButton1 = true;
  displayButton2 = true;
  displayButton3 = true;
  displayButton4 = true;
  typeList: string;
  allitemMasterList: any[];
  prodName: string;
  cmntypeId: Number;

  bajjajRyn: string;
  erpYn: string;
  dmsYn: string;
  myear: string;
  monRemarks:string;
  data: any[] = [
    { itemId: 36, startDate: '2023-09-2008:44:54' },
  ];
  todaysDataTime: any[] = [];

  todayData: any[] = [];
  

  generalValue: string;
  loginArray: string | null;
  loginArray1: string | null;
  fanoYN:String;
  mtmNo:string;
  private sub: any;
  // role:string;
  avlicKeyYN:string;

  // oldDate:Date;
  onSelectItemTypeFnList: any=[];

  public AllproducttypeList: any=[];

  public AllvendornameList: any=[];

  public AllligelentityList: any=[];

  public AllllocationitemList: any=[];

  public AllcityitemList: any=[];

  public AlldivisionitemList: any=[];

  public AlldepartmentitemList: any=[];

  public AlldesignationitemList: any=[];

  public AllemailtypeitemList: any=[];

  public AllemailpackageiList: any=[];

  public AllmakeitemList: any=[];

  public AllregionitemList: any=[];

  public AllconfigcpuitemList: any=[];

  public AllconfigramitemList: any=[];

  public AllconfighdditemList: any=[];

  public AllopratingsysitemList: any=[];

  public AlloslicmodeitemList: any=[];

  public AllswpkglicmodeitemList: any=[];

  public AllswlicmodeitemList: any=[];

  public AllavantivsysitemList: any=[];
  public AlldongalattachitemList: any=[];

  public AllinternetstusitemList: any=[];
  public ipaddresslist:Array<string>=[];
  public getLocationId: any=[];
  public locIdList: any=[];

  isEisableLocationcityInSearch = false;
  showFADetails=false;
  showIPDetails=false;
  showAVLiceKeyDetails=false;

  displayMonitor = true;

  displayEndDate = false;
  displaystartDate = true;
  pipe = new DatePipe('en-US');
  closeResetButton = true;
  display = false;
  progress = 0;
  dataDisplay :any;
  d1: any[];
  d2: any[];
  vehicleForm: any[];
  // isVisibleitemMbuton:boolean=true;
  isVisibleupdateB:Boolean=true;
 
  isVisibleupdateBIM:boolean=true;
 
 

  isDisabled = false;
  ipAddressD:string;

  constructor(private fb: FormBuilder, private location2: Location, private router: Router,private router1: ActivatedRoute, private service: ItTransService) {
    this.itemMasterForm = fb.group({
      itemId: [],
      itemCode: [],
      itemsubType: [],
      ownership: [],
      itemTypeId: [],
      srlNo: [],
      city: [],
      legalEntity: [],
      location: [],
      location1:[],
      locId: [],
      division: [],
      dept: [],
      usertktNo: [],
      userName: [],
      noofUsers: [],
      userDesigntn: [],
      usercontactNo: [],
      emailId: ['',Validators.email],
      emailPassword: [],
      emailType: [],
      typeList: [],
      emailPackage: [],
      codesubName: [],
      codeDesc: [],
      codesubType: [],
      region: [],
      productMake: [],
      productmodelDetails: [],
      productserialNo: [],
      cpu: [],
      ram: [],
      hdd: [],
      config4: [],
      os: [],
      oslicMode: [],
      oslicKey: [],
      officeSW: [],
      licMode: [],
      avSW: [],
      avexpDate: [],
      avlicKey: [],
      licKey: [],
      purchaserefNo: [],
      purchaseInvNo: [],
      purchaseCost: [],
      purchaseDt: [],
      warrntyDt: [],
      vendorName: [],
      addinfo: [],
      amcSupport: [],
      dongleAttached: [],
      internetStatus: [],
      ipAddress: [],
      usbBlocked: [],
      discardReason: [],
      discardDt: [],
      dtofInstall: [],
      faNo: [],
      insuDetails: [],
      monitorModel: [],
      monitemCode: [],
      monitorserialNo: [],
      type: [],
      weDt: [],
      monitorfaNo: [],
      remarks: [],
      bajjajRyn: [],
      erpYn: [],
      dmsYn: [],
      createdBy: [],
      creationDate: [],
      monitorMake: [],
      lastUpdatedBy: [],
      lastUpdationDt: [],
      startDate: [],
      endDate: [],
      subtypeName: [],
      status: [],
      myear: [],
      monRemarks:[],
      loginArray: [],
      loginArray1: [],
      fanoYN:[],
      mtmNo:[],
      avlicKeyYN:[],
      cmntypeId: [],
      dt1: [],
      dt2: [],
      todaysDataTime: [],
      itemform: [],
      generalValue: [],
      ipAddressD:[],

    })


    this.itemMasterForm.get('startDate')?.value
  }

  itemcodeFindFN(itemCode:any) {
   
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Data Searching in progress....Do not refresh the Page';
    this.displayButton1 = false;
    this.displayButton2 = false;
    this.displayButton3 = false;
    this.displayButton4 = false;
    this.displaystartDate = false;
    this.itemMasterForm.get('itemCode')?.disable();
    this.itemMasterForm.get('itemId')?.disable();
    this.itemMasterForm.get('division')?.disable();
    // this.isVisibleitemMbuton=false;
    var itemType = this.itemMasterForm.get('typeList')?.value;
    if (itemType == 'ItemCode') {
      this.service.itemcodeFindFN(sessionStorage.getItem('city'),itemCode)
        .subscribe( 
          data => {
            
            if (data.code === 400) {
            alert("This Item Code Not Found/This Asset Allready Discarded !!!");
            this.closeResetButton = false;
            this.progress = 0;
            // this.dataDisplay = data.message;
            return;
          }
          if (data.code === 200) {
            this.closeResetButton = true;
    this.progress = 0;
    // this.dataDisplay = data.message;
    this.dataDisplay ='Data Display Sucessfully....';
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails=true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });
            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });
            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });
            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });
            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });
            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });
            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            if (data.obj.ipAddress != null || data.obj.ipAddress != undefined || data.obj.ipAddress != ''){
              this.itemMasterForm.patchValue({ ipAddressD:'IPADDS'})
            }
            if (data.obj.faNo != null || data.obj.faNo != undefined || data.obj.faNo != ''){
              this.itemMasterForm.patchValue({ fanoYN:'GENRATE'})
            }
            
            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
              if (data.obj.itemTypeId===120){
                this.displayMonitor=true;
              }
              else{
                this.displayMonitor=false;
              }
          }
    }
    )
    }
    if (itemType == 'SerialNo') {
      this.service.serialenoFindFN(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("This Serial No Not Found/This Asset Allready Discarded !!!");
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay = data.message;
              return;
            }
            if (data.code === 200) {
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay ='Data Display Sucessfully....';
              // this.dataDisplay = data.message;
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails=true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
          }
    })
        }

    if (itemType == 'TicketNo') {
      this.service.usertktnoFindFN(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("This Ticket No Not Found /This Asset Allready Discarded !!!");
              this.closeResetButton = false;
              this.progress = 0;
              this.dataDisplay = data.message;
              return;
            }
            if (data.code === 200) {
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay ='Data Display Sucessfully....';
              // this.dataDisplay = data.message;
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails =true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
          }
         } )
    }


    if (itemType =='faNo') {
      
      this.service.FAnOFindFN(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("This FaNo No Not Found /This Asset Allready Discarded !!!");
              this.closeResetButton = false;
              this.progress = 0;
              this.dataDisplay = data.message;
              return;
            }
            if (data.code === 200) {
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay = data.message;
              this.dataDisplay ='Data Display Sucessfully....';
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails=true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
          }
    })
    }

    if (itemType == 'userName') {
      this.service.UserNameFindFN(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("This Employee Not Found /This Asset Allready Discarded !!!");
              this.closeResetButton = false;
              this.progress = 0;
              this.dataDisplay = data.message;
              return;
            }
            if (data.code === 200) {
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay ='Data Display Sucessfully....';
              this.dataDisplay = data.message;
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails=true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
          }
         } )
    }

    if (itemType == 'productInvoiceNo') {
      this.service.invoiceFindFN(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("This Invoice No Not Found /This Asset Allready Discarded !!!");
              this.closeResetButton = false;
              this.progress = 0;
              this.dataDisplay = data.message;
              return;
            }
            if (data.code === 200) {
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay ='Data Display Sucessfully....';
              this.dataDisplay = data.message;
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails=true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
          }
         })
    }

      
  }
  
  

  



  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.loadDefaultValues();
    this.itemMasterForm.patchValue({ itemsubType: sessionStorage.getItem('subtypeName') });
    this.itemMasterForm.patchValue({ status: sessionStorage.getItem('status') });
    this.itemMasterForm.patchValue({ city: sessionStorage.getItem('locId') });
    this.itemMasterForm.patchValue({ division: sessionStorage.getItem('divisionId') });
    this.itemMasterForm.patchValue({createdBy:sessionStorage.getItem('loginName')}); 
    this.itemMasterForm.patchValue({lastUpdatedBy:sessionStorage.getItem('loginName')});
    // this.role= sessionStorage.getItem('role');
    const todaysDataTime = new Date();

    this.todayData = this.data.filter(item => {
      const startDate = new Date(item.startDate);
      return startDate.toDateString() === todaysDataTime.toDateString();
    })


    // alert( sessionStorage.getItem('role'))
    if(  sessionStorage.getItem('role')==='Admin') {
      // alert('Admin'+'-------In1')
      this.isVisibleupdateBIM=true;
      
    }
    if(sessionStorage.getItem('role')==='User')
    {
      this.isVisibleupdateBIM=false;
      ;
    }
    if(  sessionStorage.getItem('role')==='SuperAdmin') {
      // alert('Admin'+'-------In1')
        this.isVisibleupdateBIM=true;
      }
  
    this.sub = this.router1.params.subscribe(params => {
      this.itemCode = params['itemCode'];
      if ( this.itemCode != undefined) {
        this.closeResetButton = true;
        this.itemcodeFindFN(this.itemCode);
        this.displayButton4 = false;
        this.displaystartDate = false;
        this.service.itemcodeFindFN(sessionStorage.getItem('city'),this.itemCode)
        .subscribe( 
          data => {
            this.closeResetButton = true;
            this.displayButton4 = false;
            this.dataDisplay ='Data Display Sucessfully....';
            this.itemMasterForm.patchValue(data.obj);
            this.showFADetails = true;
            this.showIPDetails=true;
            this.showAVLiceKeyDetails=true;
            this.itemMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ warrntyDt: this.pipe.transform(data.obj.warrntyDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ weDt: this.pipe.transform(data.obj.weDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ avexpDate: this.pipe.transform(data.obj.avexpDate, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ discardDt: this.pipe.transform(data.obj.discardDt, 'yyyy-MM-dd') });

            this.itemMasterForm.patchValue({ dtofInstall: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });

            this.service.onSelectItemTypeFn(data.obj.itemTypeId)
              .subscribe(
                data => {
                  this.onSelectItemTypeFnList = data.obj;
                  console.log(this.onSelectItemTypeFnList);
                }
              );
          }
  
    )
  }  
      

    });


    this.service.AllproducttypeList()
      .subscribe(
        data => {
          this.AllproducttypeList = data.obj;
          console.log(this.AllproducttypeList);
        }
      );


    this.service.gpTovendornameList()
      .subscribe(
        data => {
          this.AllvendornameList = data.obj;
          console.log(this.AllvendornameList);
        }
      );

    this.service.AllligelentityList()
      .subscribe(
        data => {
          this.AllligelentityList = data.obj;
          console.log(this.AllligelentityList);
        }
      );

    this.service.AllcityitemList()
      .subscribe(
        data => {
          this.AllcityitemList = data.obj;
          console.log(this.AllcityitemList);
        }
      );

    this.service.AllllocationitemList(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.AllllocationitemList = data.obj;
          console.log(this.AllllocationitemList);
        }
      );

    this.service.getLocationId(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.locIdList = data.obj;
          console.log(this.locIdList);

        }
      );


    this.service.getLocationId(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.locIdList = data.obj;
          console.log(this.locIdList);

        }
      );


    this.service.AlldivisionitemList()
      .subscribe(
        data => {
          this.AlldivisionitemList = data.obj;
          console.log(this.AlldivisionitemList);
        }
      );

    this.service.AlldepartmentitemList()
      .subscribe(
        data => {
          this.AlldepartmentitemList = data.obj;
          console.log(this.AlldepartmentitemList);
        }
      );

    this.service.AlldesignationitemList()
      .subscribe(
        data => {
          this.AlldesignationitemList = data.obj;
          console.log(this.AlldesignationitemList);
        }
      );

    var typ = 'EMAIL TYPE'
    this.service.AllemailtypeitemList(typ)
      .subscribe(
        data => {
          this.AllemailtypeitemList = data.obj;
          console.log(this.AllemailtypeitemList);
        }
      );

    var pkg = 'EMAIL PACKAGE'
    this.service.AllemailpackageiList(pkg)
      .subscribe(
        data => {
          this.AllemailpackageiList = data.obj;
          console.log(this.AllemailpackageiList);
        }
      );

    this.service.AllregionitemList()
      .subscribe(
        data => {
          this.AllregionitemList = data.obj;
          console.log(this.AllregionitemList);
        }
      );

    this.service.AllmakeitemList()
      .subscribe(
        data => {
          this.AllmakeitemList = data.obj;
          console.log(this.AllmakeitemList);
        }
      );


    this.service.AllconfigcpuitemList()
      .subscribe(
        data => {
          this.AllconfigcpuitemList = data.obj;
          console.log(this.AllconfigcpuitemList);
        }
      );


    this.service.AllconfigramitemList()
      .subscribe(
        data => {
          this.AllconfigramitemList = data.obj;
          console.log(this.AllconfigramitemList);
        }
      );


    this.service.AllconfighdditemList()
      .subscribe(
        data => {
          this.AllconfighdditemList = data.obj;
          console.log(this.AllconfighdditemList);
        }
      );

    var ops = 'OPERATING SYSTEM'
    this.service.AllopratingsysitemList(ops)
      .subscribe(
        data => {
          this.AllopratingsysitemList = data.obj;
          console.log(this.AllopratingsysitemList);
        }
      );

    var osl = 'LICENCE MODE'
    this.service.AlloslicmodeitemList(osl)
      .subscribe(
        data => {
          this.AlloslicmodeitemList = data.obj;
          console.log(this.AlloslicmodeitemList);
        }
      );

    var ospkg = 'OFFICE PACKAGES'
    this.service.AllswpkglicmodeitemList(ospkg)
      .subscribe(
        data => {
          this.AllswpkglicmodeitemList = data.obj;
          console.log(this.AllswpkglicmodeitemList);
        }
      );

    var oslic = 'LICENCE MODE'
    this.service.AllswlicmodeitemList(oslic)
      .subscribe(
        data => {
          this.AllswlicmodeitemList = data.obj;
          console.log(this.AllswlicmodeitemList);
        }
      );
    var antiv = 'ANTIVIRUS SYSTEM'
    this.service.AllavantivsysitemList(antiv)
      .subscribe(
        data => {
          this.AllavantivsysitemList = data.obj;
          console.log(this.AllavantivsysitemList);
        }
      );


    var dnl = 'DONGLE  LOCK'
    this.service.AlldongalattachitemList(dnl)
      .subscribe(
        data => {
          this.AlldongalattachitemList = data.obj;
          console.log(this.AlldongalattachitemList);
        }
      );
    var ints = 'ACCESS MODE'
    this.service.AllinternetstusitemList(ints)
      .subscribe(
        data => {
          this.AllinternetstusitemList = data.obj;
          console.log(this.AllinternetstusitemList);
        }
      );

      
      this.service.ipaddresslist()
      .subscribe(
        data => {
          this.ipaddresslist = data.obj;
          console.log(this.ipaddresslist);
        }
      );
    

      this.itemMasterForm.get('itemId')?.disable();
      // this.itemMasterForm.get('itemCode')?.disable();
      this.itemMasterForm.get('loginArray1')?.disable();
      this.itemMasterForm.get('city')?.disable();
      this.itemMasterForm.get('purchaseDt')?.disable();
      this.itemMasterForm.get('warrntyDt')?.disable();
      this.itemMasterForm.get('monitemCode')?.disable();

    


  }

  loadDefaultValues() {
    this.loginArray = sessionStorage.getItem('divisionName');

    this.loginArray1 = sessionStorage.getItem('ouCity');

  }

 



 
  get f() { return this.itemMasterForm.controls; }

  itemMaster(itemMasterForm: any) { }


  resetMast() {
    window.location.reload();
  }

  closeMast() {
    // debugger;
    this.router.navigate(['admin']);
    // this.location2.back();
  }

  transData(val: any) {
    delete val.city;
    delete val.discardReason;
    delete val.discardDt;
    return val;
  }

  public validation() {
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
var itemTypeId = this.itemMasterForm.get('itemTypeId')?.value;
var itemsubType = this.itemMasterForm.get('itemsubType')?.value;
var ownership = this.itemMasterForm.get('ownership')?.value;
var legalEntity = this.itemMasterForm.get('legalEntity')?.value;
var location = this.itemMasterForm.get('location')?.value;
var region = this.itemMasterForm.get('region')?.value;
var division = this.itemMasterForm.get('division')?.value;
var dept = this.itemMasterForm.get('dept')?.value;

var productMake = this.itemMasterForm.get('productMake')?.value;
var productserialNo = this.itemMasterForm.get('productserialNo')?.value;
var productmodelDetails = this.itemMasterForm.get('productmodelDetails')?.value;
var cpu = this.itemMasterForm.get('cpu')?.value;
var ram = this.itemMasterForm.get('ram')?.value;
var hdd = this.itemMasterForm.get('hdd')?.value;
var config4 = this.itemMasterForm.get('config4')?.value;
var myear = this.itemMasterForm.get('myear')?.value;
var purchaserefNo = this.itemMasterForm.get('purchaserefNo')?.value;
var purchaseInvNo = this.itemMasterForm.get('purchaseInvNo')?.value;
var purchaseCost = this.itemMasterForm.get('purchaseCost')?.value;
var warrntyDt = this.itemMasterForm.get('warrntyDt')?.value;
var amcSupport = this.itemMasterForm.get('amcSupport')?.value;
var usbBlocked = this.itemMasterForm.get('usbBlocked')?.value;
var dtofInstall = this.itemMasterForm.get('dtofInstall')?.value;
var fanoYN = this.itemMasterForm.get('fanoYN')?.value;
var avlicKeyYN = this.itemMasterForm.get('avlicKeyYN')?.value;
var avlicKey = this.itemMasterForm.get('avlicKey')?.value;

if (itemTypeId ===undefined || itemTypeId === null || itemTypeId===''){
  alert('Please Select Item Type.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Item Type.!';
  return;
}

if (itemsubType  ===undefined || itemsubType  === null || itemsubType ===''){
  alert('Please Select Item Sub Type.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Item Sub Type.!';
  return;
}
if (ownership ===undefined || ownership === null || ownership===''){
  alert('Please Select Ownership  Name.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Ownership  Name.!';
  return;
}
if (legalEntity ===undefined || legalEntity === null || legalEntity===''){
  alert('Please Select Legal  Entity.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Legal  Entity.!';
  return;
}
if (location ===undefined || location === null || location===''){
  alert('Please Select location.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select location.!';
  return;
}
if (region ===undefined || region === null || region===''){
  alert('Please Select region.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select region.!';
  return;
}
if (division ===undefined || division === null || division===''){
  alert('Please Select division.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select division.!';
  return;
}
if (dept ===undefined || dept === null || dept===''){
  alert('Please Select Department.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Department.!';
  return;
}
// if (usertktNo ===undefined || usertktNo === null || usertktNo===''){
//   alert('Please Select User Ticket No.!');
//   this.closeResetButton = false;
//   this.progress = 0;
//   this.dataDisplay = 'Please Select User Ticket No.!';
//   return;
// }
// if (userName ===undefined || userName === null || userName===''){
//   alert('Please Select User Name.!');
//   this.closeResetButton = false;
//   this.progress = 0;
//   this.dataDisplay = 'Please Select User Name.!';
//   return;
// }
if (productMake ===undefined || productMake === null || productMake===''){
  alert('Please Select Make.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Make.!';
  return;
}
if (productserialNo ===undefined || productserialNo === null || productserialNo===''){
  alert(' Please Select Serial No.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Serial No.!';
  return;
}
if (productmodelDetails ===undefined || productmodelDetails === null || productmodelDetails===''){
  alert('Please Select Model Details.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Model Details.!';
  return;
}
if (cpu ===undefined || cpu === null || cpu===''){
  alert('Please Select Config-1 / CPU.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Config-1 / CPU.!';
  return;
}
if (ram ===undefined || ram === null || ram===''){
  alert('Please Select Config-2 / RAM.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Config-2 / RAM.!';
  return;
}
if (hdd ===undefined || hdd === null || hdd===''){
  alert('Please Select Config-3 / HDD.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Config-3 / HDD.!';
  return;
}
// if (config4 ===undefined || config4 === null || config4===''){
//   alert('Please Select Config-4.!');
//   this.closeResetButton = false;
//   this.progress = 0;
//   this.dataDisplay = 'Please Select Config-4.!';
//   return;
// }
if (myear ===undefined || myear === null || myear===''){
  alert('Please Select Manufacturing Year.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Manufacturing Year.!';
  return;
  if (myear.length !=4){
    alert('Please Select Manufacturing Year more than 4 No.!');
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Please Select Manufacturing Year more than 4 No.!';
    return;
  }
}
// if (mtmNo ===undefined || mtmNo === null || mtmNo===''){
//   alert('Please Select MTM No.!');
//   this.closeResetButton = false;
//   this.progress = 0;
//   this.dataDisplay = 'Please Select MTM No.!';
//   return;
// }
if (purchaserefNo ===undefined || purchaserefNo === null || purchaserefNo===''){
  alert('Please Select Purchase Ref .Id.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Purchase Ref .Id.!';
  return;
}
if (purchaseCost ===undefined || purchaseCost === null || purchaseCost===''){
  alert('Please Select Purchase Cost.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Purchase Cost.!';
  return;
}
if (purchaseInvNo ===undefined || purchaseInvNo === null || purchaseInvNo===''){
  alert('Please Select Purchase Inv No.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Purchase Inv No.!';
  return;
}
if (warrntyDt ===undefined || warrntyDt === null || warrntyDt===''){
  alert('Please Select Warranty End Date.!');
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Please Select Warranty End Date.!';
  return;
}
if (itemsubType==='DESKTOP'){
  var monitorModel = this.itemMasterForm.get('monitorModel')?.value;
  var monitorserialNo = this.itemMasterForm.get('monitorserialNo')?.value;
  var weDt = this.itemMasterForm.get('weDt')?.value;
  var monitorfaNo = this.itemMasterForm.get('monitorfaNo')?.value;
  // var MtmNo = this.itemMasterForm.get('mtmNo').value;
  if (monitorModel ===undefined || monitorModel === null || monitorModel===''){
    alert('Please Select Model  Details.!');
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Please Select Model  Details.!';
    return;
  }
  if (monitorserialNo ===undefined || monitorserialNo === null || monitorserialNo===''){
    alert('Please Select Serial No.!');
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Please Select monitor Serial No';
    return;
  }
  if (weDt ===undefined || weDt === null || weDt===''){
    alert('Please Select WE  Date.!');
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Please Select WE  Date.!';
    return;
  }
  if (monitorfaNo ===undefined || monitorfaNo === null || monitorfaNo===''){
    alert('Please Select Monitor Fixed Asset No.!');
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Please Select Monitor Fixed Asset No.!';
    return;
  }
  if ( avlicKeyYN ==='CONSLOE'){
    if (avlicKey === undefined || avlicKey===null || avlicKey===''){
      alert('Please Enter AV Lice Key.!');
      return;
    }
  }
    
}
if (itemsubType==='LAPTOP'){
 
}
  }

  newMast() {
    // var isvaliddata1 = this.validation();
    // if (isvaliddata1 === false) {   
    //   return;
    // }
    // alert('------Save-----')
    const formValue: ItrnsitemMaster = this.transData(this.itemMasterForm.getRawValue());

    formValue.city = Number(sessionStorage.getItem('ouId'));
    console.log(formValue);
    this.service.TransctionitemMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.itemMasterForm.disable();
        this.closeResetButton = true;
        this.progress = 0;
        this.dataDisplay = 'Details Inserted Successfully';
        // this.itemcodeFindFN(res.obj.itemCode)
        this.itemMasterForm.patchValue({ itemId: res.obj.itemId });
        this.itemMasterForm.patchValue({ itemCode: res.obj.itemCode });
        this.itemMasterForm.patchValue({ monitemCode: res.obj.monitemCode });
        this.displayButton1 = false;
        this.displayButton2 = false;
        this.displayButton3 = false;
        this.displayButton4 = false;
        this.itemMasterForm.patchValue({createdBy:sessionStorage.getItem('loginName')});
        this.isEisableLocationcityInSearch = false;

        // this.employeesMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.employeeMasterForm.reset();
        }
      }
    });
    // }
  }


  updateMast() {
    // alert("Done !!")
    var isvaliddata1 = this.validation();
    // if (isvaliddata1 === false) {
    //   return;
    // }
    const formValue: ItrnsitemMaster = this.itemMasterForm.getRawValue();
    this.itemMasterForm.patchValue({ lastUpdatedBy:sessionStorage.getItem('loginName') });
    this.service.UpdateTransactionitemMasterById(formValue, formValue.itemCode).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.closeResetButton = true;
        this.dataDisplay = 'Detailes Update Successfully..';
        this.itemMasterForm.disable();
        this.itemMasterForm.patchValue({ lastUpdatedBy:sessionStorage.getItem('loginName') });
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.itemMasterForm.disable();
          this.itemMasterForm.reset();
        }
      }
    });
  }
  // }


  onSelectItemType(event:any) {
    var itemType = event.target.value;
    // alert(itemType)
    var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    var itemType12 = trim(itemType1);
    this.service.onSelectItemTypeFn(itemType12)
      .subscribe(
        data => {
          this.onSelectItemTypeFnList = data.obj;
          console.log(this.onSelectItemTypeFnList);
        }
      );
    // alert(itemType12);
    if (itemType12 == '120') {
      // alert('inMoni')
      this.displayMonitor = true;
    }
    else if (itemType12 != '120') {
      this.displayMonitor = false;
    }
  }

  FaNoYN(event:any) {
    //  alert (event.target.value);
    var fanoYN = event.target.value;
    var loga = this.itemMasterForm.get('fanoYN')?.value;
    if (fanoYN === 'PENDING') {
      this.showFADetails = false;
      this.itemMasterForm.patchValue({ faNo: 'PENDING FROM ACCOUNT' })
      // this.fanoYN = 'YES';
      
    }
   if (fanoYN==='GENRATE') {
      this.showFADetails = true;
      this.itemMasterForm.patchValue({ faNo: '' })
      // this.fanoYN = 'NO';
     
      
    }
  }

  IPaddYN(event:any) {
    //  alert (event.target.value);
    var ipAddressD = event.target.value;
    // var loga = this.itemMasterForm.get('fanoYN').value;
    if (ipAddressD === 'DHCP') {
      this.showIPDetails = false;
      this.itemMasterForm.patchValue({ ipAddress: 'DHCP' })
      // this.fanoYN = 'YES'; 
    }
   if (ipAddressD ==='IPADDS') {
      this.showIPDetails = true;
      this.itemMasterForm.patchValue({ ipAddress: '' })
      // this.fanoYN = 'NO'; 
    }

    if (ipAddressD ==='NOTAPP') {
      this.showIPDetails = false;
      this.itemMasterForm.patchValue({ ipAddress: 'NOT APLLICABLE' })
      // this.fanoYN = 'NO';  
    }
  }



  AvlicKeyYN(event:any) {
    //  alert (event.target.value);
    var log = event.target.value;
    var loga = this.itemMasterForm.get('avlicKeyYN')?.value;
    if (log === 'YES') {
      this.showAVLiceKeyDetails = true;
      this.avlicKeyYN = 'YES';
      
    }
    else {
      this.showAVLiceKeyDetails = false;
      this.avlicKeyYN = 'NO';
      this.itemMasterForm.patchValue({ avlicKey: 'key on consol' })
      
    }
  }

  


  searchMast() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Data Searching in progress....Do not refresh the Page';
    var searchText = this.itemMasterForm.get('status')?.value;
    // alert(searchText);
    this.service.allitemMasterSearch(sessionStorage.getItem('ouId'),searchText)
      .subscribe(
        data => {
        if (data.code===200){
          this.closeResetButton = true;
          this.progress = 0;
          this.dataDisplay = data.message;
          this.allitemMasterList = data.obj;
          console.log(this.allitemMasterList);
        }
        else{
          this.closeResetButton = false;
          this.dataDisplay = data.message;
        }
         
          // this.displayButton=false;
        }
      );
  }


  OnSelectTypeList(event:any) {
  }


  onNavigatePurchaseForm() {
    // debugger;
    // alert(this.itemMasterForm.get('purchaserefNo').value);
    var transId = this.itemMasterForm.get('purchaserefNo')?.value;
    this.router.navigate(['/admin/transaction/BillRecorderNew', transId])

  }


  exportToExcel1() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.itemMtable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'ITEM MASTER Data.xlsx');
  }



  reportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'Asset Acknowledgment Form' + '.pdf';
    var ITEMCODE = this.itemMasterForm.get('itemCode')?.value;
    // alert(ITEMCODE);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.AcknowledgementForm(sessionStorage.getItem('ouId'),ITEMCODE)
      .subscribe(data => {
         saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        //  var url = URL.createObjectURL(blob);
        //  var printWindow = window.open(url, '', 'width=800,height=500');
        //  printWindow.open
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  purchaseNoSearch(purchaseInvNo:any){
 
    this.service.purchaseNoSearcheFn(sessionStorage.getItem('ouId'),purchaseInvNo)
    .subscribe(
      data => {
        this.itemMasterForm.patchValue({purchaserefNo:data.obj.headerId,purchaseDt:this.pipe.transform(data.obj.billDate, 'yyyy-MM-dd'),vendorName:data.obj.suppName,warrntyDt:this.pipe.transform(data.obj.serviceTo, 'yyyy-MM-dd')})
     
      }
    );
  }

  TicketNoSearch(usertktNo:any){
    this.service.TicketNoSearchFn(sessionStorage.getItem('ouId'),usertktNo)
    .subscribe(
      data => {
        if (data.code === 200) {
          this.itemMasterForm.patchValue({userName:data.obj.empName,emailId:data.obj.emailId,usercontactNo:data.obj.contactNo,userDesigntn:data.obj.designation})
          this.itemMasterForm.get('usertktNo')?.disable();
          this.itemMasterForm.get('userName')?.disable();
          this.itemMasterForm.get('usercontactNo')?.disable();
          this.itemMasterForm.get('userDesigntn')?.disable();
          
        } else {
          if (data.code === 400) {
            alert(data.message);
            
          }
        }
      }
    );
  }




  purchaseRefNoSearch(purchaserefNo:any){

    this.service.purchaseRefNoSearchFn(sessionStorage.getItem('ouId'),purchaserefNo)
    .subscribe(
      data => {
        this.itemMasterForm.patchValue({purchaserefNo:data.obj.headerId,purchaseDt:this.pipe.transform(data.obj.billDate, 'yyyy-MM-dd'),vendorName:data.obj.suppName,purchaseInvNo:data.obj.billNo,warrntyDt:this.pipe.transform(data.obj.serviceTo, 'yyyy-MM-dd')})
      
      }
    );
  }
  searchLocWiseMast(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Data Searching in progress....Do not refresh the Page';
    var searchText = this.itemMasterForm.get('status')?.value;
    var locId = this.itemMasterForm.get('location1')?.value;
    
    this.service.allitemMasterLocationSearch(sessionStorage.getItem('ouId'),locId)
      .subscribe(
        data => {
          if (data.code===200){
          this.allitemMasterList = data.obj;
          console.log(this.allitemMasterList);
          this.closeResetButton = true;
          this.progress = 0;
          this.dataDisplay = data.message;
        }
        else{
          this.closeResetButton = false;
          this.progress = 0;
          this.dataDisplay = data.message;
        }
       
        }
      );
  }



  message: string = "Confirmation..!";
      msgType:string ="closeMast";
      getMessage(msgType: string) {
        this.msgType = msgType;
        if (msgType.includes("newMast")) {
          this.message = "Do you want to Save the changes(Yes/No)?"
        }
     if (msgType.includes("resetMast")) {
            this.message = "Do you want to Reset the changes(Yes/No)?"
          }
     
      if (msgType.includes("closeMast")) {
              this.message = "Do you want to Close the Form(Yes/No)?"
            } 
    if (msgType.includes("updateMast")) {
              this.message = "Do you want to upadate this Form(Yes/No)?"
    }     
      return;
      }
    executeAction() {
          
      
          if (this.msgType.includes("resetMast")) {
            this.resetMast();
          }
          if (this.msgType.includes("closeMast")) {
            this.router.navigate(['admin']);
          }
          if (this.msgType.includes("updateMast")) {
            this.updateMast()
          }
          if (this.msgType.includes("newMast")) {
            this.newMast()
          }
          return;
        }

}

