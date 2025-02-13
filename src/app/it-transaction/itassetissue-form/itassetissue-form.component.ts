import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItTransService } from '../it-trans.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import * as xlsx from 'xlsx';
import { trim } from 'jquery';
import { TypeofExpr } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

interface AssetissueForm {
  itemCode:string;
  itemTypeId: Number;
  loginArray: string;
  loginArray1: string;
  city:Number;
  legalEntity:String;
  location:string;
  division:number;
  dept:number;
  region:string;
  usertktNo:string;
  userName:string;
  noofUsers:number;
  userDesigntn:string;
  usercontactNo:string;
  emailId:string;
  emailPassword:string;
  emailType:string;
  emailPackage:string;
  //////
  codesubName: string;
  codesubType: number;
  codeDesc: string;
  productMake: String;
  productmodelDetails: String;
  productserialNo: String;
  cpu:string;
  ram:string;
  hdd:string;
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


}

@Component({
  selector: 'app-itassetissue-form',
  templateUrl: './itassetissue-form.component.html',
  styleUrl: './itassetissue-form.component.css'
})
export class ItassetissueFormComponent {
  Assetiussesform :FormGroup;
  itemCode:string;
  itemTypeId: Number;
  loginArray: string;
  loginArray1: string;
  city:Number;
  legalEntity:String;
  location:string;
  division:number;
  dept:number;
  region:string;
  usertktNo:string;
  userName:string;
  noofUsers:number;
  userDesigntn:string;
  usercontactNo:string;
  emailId:string;
  emailPassword:string;
  emailType:string;
  emailPackage:string;

  /////////////////
  codesubName: string;
  codesubType: number;
  codeDesc: string;
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

  isEisableLocationcityInSearch = false;
  public locIdList: any=[];
  public AllligelentityList: any=[];
  public AllllocationitemList: any=[];
  public AlldivisionitemList: any=[];
  
  public AlldepartmentitemList: any=[];

  public AlldesignationitemList: any=[];

  public AllemailtypeitemList: any=[];

  public AllemailpackageiList: any=[];

  public AllmakeitemList: any=[];

  public AllregionitemList: any=[];
  displayButton4 = true;
  displayStatus: false;
  progress: 0;
  closeResetButton = true;
  display = false;
  dataDisplay :any;

  constructor(private fb: FormBuilder, private router: Router, private service: ItTransService ) {

    this.Assetiussesform = fb.group({
      itemCode:[],
      itemTypeId:[],
      loginArray:[],
      loginArray1:[],
      legalEntity:[],
      location:[],
      division:[],
      dept:[],
      city:[],
      region:[],
      usertktNo:[],
      userName:[],
      noofUsers:[],
      userDesigntn:[],
      usercontactNo:[],
      emailId:[],
      emailPassword:[],
      emailType:[],
      emailPackage:[],
      /////////
  codesubName: [],
  codesubType: [],
  codeDesc: [],
  productMake: [],
  productmodelDetails: [],
  productserialNo: [],
  cpu:[],
  ram:[],
  hdd:[],
  config4: [],
  os: [],
  oslicMode: [],
  oslicKey: [],
  officeSW: [],
  licMode: [],
  licKey: [],
  avSW: [],
  avexpDate: [],
  avlicKey: [],
  purchaserefNo:[],
  purchaseInvNo: [],
  purchaseCost: [],
  purchaseDt: [],
  warrntyDt: [],
  vendorName:[],
  addinfo: [],
  amcSupport: [],
  dongleAttached: [],
  internetStatus: [],
  ipAddress: [],
  usbBlocked: [],
  discardReason:[],
  discardDt:[],
  dtofInstall: [],
  faNo: [],
  insuDetails: [],
  monitemCode: [],
  monitorModel: [],
  monitorserialNo: [],
  type: [],
  weDt: [],
  monitorfaNo:[],
  remarks:[],
  createdBy: [],
  creationDate: [],
  monitorMake: [],
  lastUpdatedBy: [],
  lastUpdationDt: [],
  startDate: [],
  endDate: [],
  subtypeName:[],
  // attribute1:number;
  cmntypeId:[],
  prodName:[],
  status:[],
  bajjajRyn:[],
  erpYn: [],
  dmsYn: [],
  myear: [],
  monRemarks:[],
  todaysDataTime:[],

    })}



  get f() { return this.Assetiussesform.controls; }

  Assetiussesfor(Assetiussesform:any) {  }



  resetMast() {
    window.location.reload();
  }

  closeMast() {
    // debugger;
    this.router.navigate(['admin']);
    // this.location2.back();
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    
  this.service.AllllocationitemList(sessionStorage.getItem('ouId'))
  .subscribe(
    data => {
      this.AllllocationitemList = data.obj;
      console.log(this.AllllocationitemList);
    }
  );

  this.service.AllligelentityList()
      .subscribe(
        data => {
          this.AllligelentityList = data.obj;
          console.log(this.AllligelentityList);
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
    

  }

  transitemcodeFindFN(itemCode:any){
    alert(itemCode)
    // this.displayButton=false;
    // this.displaystartDate=false;
    // this.isDisablerecivedbutton=true;
    this.Assetiussesform.get('city')?.disable();
    this.Assetiussesform.get('legalEntity')?.disable();
    this.Assetiussesform.get('division')?.disable();
    this.Assetiussesform.get('location')?.disable();
    this.Assetiussesform.get('division')?.disable();
    this.Assetiussesform.get('region')?.disable();
  // this.Assetiussesform.get('dept')?.disable();
  
    this.service.AssetissuseitemcodeFN(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 200) {
              alert(data.message); 
            this.Assetiussesform.patchValue(data.obj);
            this.Assetiussesform.patchValue({ loginArray1: data.obj.cityName });
            this.Assetiussesform.patchValue({ itemTypeId: data.obj.itemTypeId });
            this.displayButton4=false;
            this.Assetiussesform.patchValue({ lastUpdatedBy:sessionStorage.getItem('loginName') });
          }
          if (data.code === 400) {
            alert(data.message);
            
          }
        }
       
        )
        
        
  }





  TicketNoSearch(usertktNo:any){
    this.service.TicketNoSearchFn(sessionStorage.getItem('ouId'),usertktNo)
    .subscribe(
      data => {
        if (data.code === 200) {
          this.Assetiussesform.patchValue({userName:data.obj.empName,emailId:data.obj.emailId,usercontactNo:data.obj.contactNo,userDesigntn:data.obj.designation})
          this.Assetiussesform.get('usertktNo')?.disable();
          this.Assetiussesform.get('userName')?.disable();
          this.Assetiussesform.get('usercontactNo')?.disable();
          this.Assetiussesform.get('userDesigntn')?.disable();
          
        } else {
          if (data.code === 400) {
            alert(data.message);
            
          }
        }
      }
    );
  }

  updateMast(){
    const formValue: AssetissueForm = this.Assetiussesform.getRawValue();
    this.Assetiussesform.patchValue({ lastUpdatedBy:sessionStorage.getItem('loginName') });
    this.service.UpdateTransactionitemMasterById(formValue, formValue.itemCode).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.closeResetButton = true;
        this.dataDisplay = 'Detailes Update Successfully..';
        this.Assetiussesform.disable();
        this.Assetiussesform.patchValue({ lastUpdatedBy:sessionStorage.getItem('loginName') });
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.Assetiussesform.disable();
          this.Assetiussesform.reset();
        }
      }
    });
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
      
      return;
    }













}

