import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import * as xlsx from 'xlsx';
import { trim } from 'jquery';
import { TypeofExpr } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ItTransService } from '../it-trans.service';


interface trnsform{
transferId:number;
  password:string; 
  date:Date ;
  transferDate:Date ;
  itemCode:string;
  itemId:string;
  newcityId:number;
  newcity:string;
  newcomp:string;
  newdivId:number;
  newdiv:String;
  newlocId:number;
  newloc:string;
  newdeptId:number;
  newdept:String;
  newusertktNo:string;
  newuserName:string; 
  newuserContact:string;
  newuserEmail:string; 
  remarks:string;
  oldcity:string;
  oldcomp:string;
  olddiv:string;
  oldloc:string;
  oldlocId:number;
  olddept:string;
  oldusertktNo:string;
  olduserName:string; 
  userContact:string;
  olduserEmail:string;
  getpassNo:number;
  trnsRemarks:string;
  transferBy:string;
  receivedDate:Date;
  recivedYN:string;
  receivedBy:String;
}

@Component({
  selector: 'app-recieved-list-form',
  templateUrl: './recieved-list-form.component.html',
  styleUrl: './recieved-list-form.component.css'
})
export class RecievedListFormComponent {
  recivedFrom:FormGroup;
  transferId:number;
  password:string; 
  date:Date ;
  transferDate: Date ;
  itemCode:string;
  itemId:string;
  newcityId:number;
  newcity:string;
  newcomp:string;
  newdivId:number;
  newdiv:String;
  newlocId:number;
  newloc:string;
  newdeptId:number;
  newdept:String;
  newusertktNo:string;
  newuserName:string; 
  newuserContact:string;
  newuserEmail:string; 
  remarks:string;
  oldcity:string;
  oldcomp:string;
  olddiv:string;
  oldloc:string;
  oldlocId:number;
  olddept:string;
  oldusertktNo:string;
  olduserName:string; 
  userContact:string;
  olduserEmail:string;
  getpassNo:number;
  trnsRemarks:string;
  transferBy:string;
  receivedDate:Date;
  recivedYN:string;
  receivedBy:String;
  showRecivedDetails=false;
  displayButton = true;
  displayEndDate=false;
  displaystartDate=true;
  pipe = new DatePipe('en-US');
  displayStatus = false;
  today = new Date();
  Today = '';
  allassettransferList:any[];
  public AllcityitemList: Array<string> = [];
  public AllligelentityList: Array<string> = [];     //for comapany name
  public AlldivisionitemList: Array<string> = [];
  public AlldepartmentitemList: Array<string> = [];
  public AlllocationitemList: Array<string> = [];
  isDisabletransebutton :  boolean = false;
  isDisablerecivedbutton: boolean = false;
  checkValidation = false;
  public getRecivedLocationId:Array<string> = [];
  private sub: any;
  deptndlocTicketNoList:any[];
  allRecivedsearch:any[];
  receivedbymembers:any[];

  constructor(private fb: FormBuilder, private router: Router, private service: ItTransService, private router1: ActivatedRoute ) {

    this.Today = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );
    this.recivedFrom = fb.group({
      transferId:[],
      password:[], 
      date:[],
      transferDate:[],
      today:[],
      itemCode:[],
      newcityId:[],
      newcity:[],
      itemId:[],
newcomp:[],
newdivId:[],
newdiv:[],
newlocId:[],
newloc:[],
newdeptId:[],
newdept:[],
newusertktNo:[],
newuserName:[], 
newuserContact:[],
newuserEmail:[], 
remarks:[],
oldcity:[],
oldcomp:[],
olddiv:[],
oldloc:[],
oldlocId:[],
getpassNo:[],
oldusertktNo:[],
olduserName:[],
userContact:[],
olduserEmail:[],
trnsRemarks:[],
transferBy:[],
receivedDate:[],
recivedYN:[],
receivedBy:[],



    })}

    get f() { return this.recivedFrom.controls; }

    RecivedForm(transferformForm:any) {  }

  
transData(val:any) {
  return val;
}
resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  this.isDisablerecivedbutton=true;

    this.service.AllcityitemList()
  .subscribe(
    data => {
      this.AllcityitemList = data.obj;
      console.log(this.AllcityitemList);
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

  this.service.getRecivedLocationId(sessionStorage.getItem('locId'))
  .subscribe(
    data => {
      this.AlllocationitemList = data.obj;
      console.log(this.AlllocationitemList);
    }
  );
 

  this.service.AlldepartmentitemList()
  .subscribe(
    data => {
      this.AlldepartmentitemList = data.obj;
      console.log(this.AlldepartmentitemList);
    }
  );

  var deptId ; 
  this.service.receivedbymembers()
  .subscribe(
    data => {
      this.receivedbymembers = data.obj;
      console.log(this.receivedbymembers);
    }
  );
  

  this.sub = this.router1.params.subscribe(params => {
    this.transferId = params['transId'];
    if (this.transferId != undefined) {
      this.transferIdFind(this.transferId);
    }
  });


this.recivedFrom.get('oldcity')?.disable();
this.recivedFrom.get('oldcomp')?.disable();
this.recivedFrom.get('oldloc')?.disable();
this.recivedFrom.get('transferId')?.disable();
this.recivedFrom.get('transferDate')?.disable();
this.recivedFrom.get('newcityId')?.disable();
this.recivedFrom.get('newcnewcompityId')?.disable();
this.recivedFrom.get('newdivId')?.disable();
this.recivedFrom.get('newloc')?.disable();



  }

  transferIdFind(transferId:any){
    this.isDisablerecivedbutton=true;
  this.service.getByTransferId(transferId)
 
  .subscribe(
    data => {
      this.recivedFrom.patchValue({oldcity:data.obj.oldcity,oldcomp:data.obj.oldcomp,oldloc:data.obj.oldloc,transferDate:data.obj.transferDate,itemCode:data.obj.itemCode, newlocId:data.obj.newlocId,itemId:data.obj.itemId,olddiv:data.obj.olddiv,oldlocId:data.obj.oldlocId,olduserEmail:data.obj.olduserEmail,
        olduserName:data.obj.olduserName,oldusertktNo:data.obj.oldusertktNo,getpassNo:data.obj.getpassNo,olddept:data.obj.olddept,transferBy:data.obj.transferBy,trnsRemarks:data.obj.trnsRemarks,
        newloc:sessionStorage.getItem('locName'),newcomp:sessionStorage.getItem('compCode'),newcityId:sessionStorage.getItem('ouId'),newdivId:sessionStorage.getItem('divisionId')})
    }
  );
  }



  onSelectDept(event:any){
    var deptId1=event.target.value;
    var deptId = deptId1.substr(deptId1.indexOf(':') + 1, deptId1.length)
  this.service.getLocAndDeptTicketNo(sessionStorage.getItem('locId'),deptId)
  .subscribe(
    data => {
      this.deptndlocTicketNoList = data.obj;
      console.log(this.deptndlocTicketNoList);
    }
  );
  }

  onSelectTicketDet(event:any){
    var tiketNoDet=event.target.value;
    var tiketNo = tiketNoDet.substr(tiketNoDet.indexOf(':') + 1, tiketNoDet.length);
    alert(tiketNo);
    var tiketNo1 = trim(tiketNo);
    this.service.getticketDetails(tiketNo1)
  .subscribe(
    data => {
      this.recivedFrom.patchValue({newuserName:data.obj.empName,newuserContact:data.obj.contactNo,newuserEmail:data.obj.emailId})
    }
  );
    
  }


  CheckDataValidations() {


    const formValue: trnsform = this.recivedFrom.getRawValue();

    var msg1;

    if (formValue.transferDate === undefined || formValue.transferDate === null ) {
      this.checkValidation = false;
      alert("Tranafer Date : Should not be null");
      return;
    }



    this.checkValidation = true

  }





  updateMast() {

    const formValue: trnsform = this.recivedFrom.getRawValue();
   
    this.CheckDataValidations();
    if (this.checkValidation === true) {
   
    this.transData(this.recivedFrom.value);
    console.log(formValue); 
    this.service.UpdateAssetrecivedMasterById(formValue, formValue.transferId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
      
        this.isDisablerecivedbutton=true;
        this.recivedFrom.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.recivedFrom.disable();
         
        }
      }
     });
   }
  }

  searchMast(){
    this.service.allrecievedAssetlocList(sessionStorage.getItem('locId'))
        .subscribe(
          data => {
            this.allRecivedsearch = data.obj;
            console.log(this.allRecivedsearch);
          }
        );
  }


 
  TicketNoSearch(newusertktN:any){
    var newusertktNo = this.recivedFrom.get('newusertktNo')?.value;
    this.service.TicketNoSearchFn(sessionStorage.getItem('ouId'),newusertktNo)
    .subscribe(
      data => {
        if (data.code === 200) {
          this.recivedFrom.patchValue({newuserName:data.obj.empName,newuserEmail:data.obj.emailId,newuserContact:data.obj.contactNo})
        } else {
          if (data.code === 400) {
            alert(data.message);
            
          }
        }
      }
    );
  }



   }






