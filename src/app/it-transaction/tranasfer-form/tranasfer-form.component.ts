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





interface ItransformMaster{
  transferId:number;
password:string; 
date:Date ;
transferDate: Date ;
today:Date;
itemCode:string;
itemId:string;
newcityId:number;
newcomp:string;
newdivId:number;
newlocId:number;
newloc:string;
newdeptId:number;
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
location:Number;
olddept:string;
oldusertktNo:string;
olduserName:string; 
userContact:string;
olduserEmail:string; 

newDept:string;
receivedDate:String;
recivedYN:string;
receivedBy:String;
trnsRemarks:string;
transferBy:string;
getpassNo:String;

createdBy:string;
lastupdatedBy:string;

}


@Component({
  selector: 'app-tranasfer-form',
  templateUrl: './tranasfer-form.component.html',
  styleUrl: './tranasfer-form.component.css'
})
export class TranasferFormComponent {
  TransferForm :FormGroup;
  transferId:number;
  password:string; 
  date:Date ;
  transferDate: Date ;
  itemCode:string;
  itemId:string;
  newcityId:number;
  newcomp:string;
  newdivId:number;
  newlocId:number;
  newloc:string;
  newdeptId:number;
  newusertktNo:string;
  newuserName:string; 
  newuserContact:string;
  newuserEmail:string; 
  remarks:string;
  oldcity:string;
  oldcomp:string;
  olddiv:string;
  oldloc:string;
  location:Number;
  oldlocId:number;
  olddept:string;
  oldusertktNo:string;
  olduserName:string; 
  userContact:string;
  olduserEmail:string;
  newDept:string;
  receivedDate:Date;
  recivedYN:string;
  receivedBy:String;
  showRecivedDetails=false;
  locName:string;
  locId:number;
  trnsRemarks:string;
  transferBy:string;
  getpassNo:String;
  createdBy:string;
  lastupdatedBy:string;

  displayButton = true;
  displayEndDate=false;
  displaystartDate=true;
  pipe = new DatePipe('en-US');
  displayStatus = false;
 

  today = new Date();
  Today = '';

   public allassettransferList:any[];
  public AllcityitemList: any=[];
  public AllnewCompanyList: any=[];     //for comapany name
  public AlldivisionitemList: any=[];
  
  public transdepartmentitemList: any=[];
  
  public AlllocationitemList: any=[];

  public AlloulocationitemList: any=[];
 getAllOuLocationIdFn:any=[];
  isDisabletransebutton :  boolean = false;
  isDisablerecivedbutton: boolean = false;
  displayoldloc:any;
  allitemMasterList:any;
  checkValidation = false;
  public getsearchassettrnsData:any[];
  getRecivedLocationId:any;
  transferBymembers:any[];




  constructor(private fb: FormBuilder, private router: Router, private service: ItTransService ) {

    this.Today = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );
    this.TransferForm = fb.group({
      transferId:[],
      password:[], 
      date:[],
      transferDate:[],
      today:[],
      itemCode:[],
      newcityId:[],
      itemId:[],
newcomp:[],
newdivId:[],
newlocId:[],
newloc:[],
newdeptId:[],
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
location:[],
olddept:[],
oldusertktNo:[],
olduserName:[],
userContact:[],
olduserEmail:[],
receivedDate:[],
recivedYN:[],
receivedBy:[],
trnsRemarks:[],
transferBy:[],
getpassNo:[],
createdBy:[],
lastupdatedBy:[],



    })}

    get f() { return this.TransferForm.controls; }

 transferForm(transferformForm:any) {  }


 
 


 
 transitemcodeFindFN(itemCode:any){
  // alert(itemCode)
  this.displayButton=false;
  this.displaystartDate=false;
  this.isDisablerecivedbutton=true;
  this.service.transitemcodeFindFN(sessionStorage.getItem('city'),itemCode)
      .subscribe(
        data => {
          if (data.code === 200) {
            alert(data.message); 
          this.TransferForm.patchValue(data.obj);
          this.TransferForm.patchValue({ transferDate: this.pipe.transform(data.obj.transferDate, 'yyyy-MM-dd') });
        }
        if (data.code === 400) {
          alert(data.message);
          
        }
      }
      )
      
}


transassetFindFN(itemCode:any){
  // alert(itemCode)
  this.displayButton=false;
  this.displaystartDate=false;
  this.service.transassetFindFN(itemCode)
      .subscribe(
        data => {
          this.TransferForm.patchValue(data.obj);
          // alert(data.obj.transferDate)
          this.TransferForm.patchValue({ transferDate: this.pipe.transform(data.obj.transferDate, 'yyyy-MM-dd') });

          this.service.getAllOuLocationId(data.obj.itemTypeId)
      .subscribe(
        data => {
          this.getAllOuLocationIdFn = data.obj;
          console.log(this.getAllOuLocationIdFn);
        }
      );



        }



      )
}


AssettransIdFindFN(transferId:any){
  // alert(transferId)
  this.isDisabletransebutton = true;
  this.displayButton=false;
  this.displaystartDate=false;
  this.TransferForm.get('itemCode')?.disable();
  this.TransferForm.get('newlocId')?.disable();
  this.TransferForm.get('transferDate')?.disable();
  this.service.AssettransIdFindFN(transferId)
      .subscribe(
        data => {
          this.TransferForm.patchValue(data.obj);
          this.TransferForm.patchValue({ receivedDate: this.pipe.transform(data.obj.receivedDate, 'yyyy-MM-dd') });
          this.TransferForm.patchValue({ transferDate: this.pipe.transform(data.obj.transferDate, 'yyyy-MM-dd') });
          
          this.service.getAllOuLocationId(data.obj.itemTypeId)
          .subscribe(
            data => {
              this.getAllOuLocationIdFn = data.obj;
              console.log(this.getAllOuLocationIdFn);
            }
          );

        }
      )
}





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
    this.TransferForm.patchValue({transferId:sessionStorage.getItem('transferId')});
    this.TransferForm.patchValue({createdBy:sessionStorage.getItem('loginName')});
    this.TransferForm.patchValue({lastupdatedBy:sessionStorage.getItem('loginName')});

    this.service.AllcityitemList()
  .subscribe(
    data => {
      this.AllcityitemList = data.obj;
      console.log(this.AllcityitemList);
    }
  );

  this.service.AllnewCompanyList()
  .subscribe(
    data => {
      this.AllnewCompanyList = data.obj;
      console.log(this.AllnewCompanyList);
    }
  );


  this.service.AlldivisionitemList()
  .subscribe(
    data => {
      this.AlldivisionitemList = data.obj;
      console.log(this.AlldivisionitemList);
    }
  );

  this.service.AlllocationitemList()
  .subscribe(
    data => {
      this.AlllocationitemList = data.obj;
      console.log(this.AlllocationitemList);
    }
  );


  this.service.AlldepartmentitemList()
  .subscribe(
    data => {
      this.transdepartmentitemList = data.obj;
      console.log(this.transdepartmentitemList);
    }
  );
  this.service.getAllOuLocationId(sessionStorage.getItem('ouId'))
  .subscribe(
    data => {
      this.getAllOuLocationIdFn = data.obj;
      console.log(this.getAllOuLocationIdFn);
    }
  );
 

  var deptId ; 
  this.service.receivedbymembers()
  .subscribe(
    data => {
      this.transferBymembers = data.obj;
      console.log(this.transferBymembers);
    }
  );
  
  
  this.TransferForm.get('oldcity')?.disable();
  this.TransferForm.get('oldcomp')?.disable();
  this.TransferForm.get('olddiv')?.disable();
  this.TransferForm.get('oldloc')?.disable();
  this.TransferForm.get('olddept')?.disable();
  this.TransferForm.get('olduserName')?.disable();
  this.TransferForm.get('oldusertktNo')?.disable();
  this.TransferForm.get('olduserEmail')?.disable();
  this.TransferForm.get('olduserName')?.disable();

  }






  RecivedRights(event:any) {
    var log = event.target.value;
    var loga = this.TransferForm.get('recivedYN')?.value;
    if (log === 'Y') {
      this.showRecivedDetails = true;
      this.recivedYN = 'Y'; 
    
    }
    else {
      this.showRecivedDetails = false;
      this.recivedYN = 'N';
     
    }
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

  CheckDataValidations() {

    const formValue: ItransformMaster = this.TransferForm.getRawValue();

    var msg1;

    if (formValue.transferDate === undefined || formValue.transferDate === null) {
      this.checkValidation = false;
      msg1 = "Transfer Date : Should not be null....";
      alert(msg1);
      return;
    }

        if (formValue.newlocId === undefined || formValue.newlocId === null) {
          this.checkValidation = false;
          msg1 = "New Location No: Should not be null....";
          alert(msg1);
          return;
    }

       if (formValue.newcityId === undefined || formValue.newcityId === null) {
      this.checkValidation = false;
      
       msg1 = "New City No: Should not be null....";
            alert(msg1);
            return;
      }

      if (formValue.newcomp === undefined || formValue.newcomp === null) {
        this.checkValidation = false;
        
         msg1 = "New Company No: Should not be null....";
              alert(msg1);
              return;
        }



    this.checkValidation = true

  }
  

  newMast() {  
    // alert('Asset Transfer !!!!! ')
    const formValue: ItransformMaster = this.transData(this.TransferForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      console.log(formValue);
      
    this.service.AssettransferSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.TransferForm.disable();
        this.AssettransIdFindFN(res.obj.transferId);
        this.displayButton=true;
        this.pipe.transform(res.obj.transferDate, 'yyyy-MM-dd') 
      } else {
        if (res.code === 400) {
          alert(res.message);
     
        }
      }
    });
  }
  }

  updateMast() {

    const formValue: ItransformMaster = this.TransferForm.getRawValue();
    this.service.UpdateAssettransferMasterById(formValue, formValue.transferId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.TransferForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.TransferForm.disable();
          this.TransferForm.reset();
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
     
       if (this.msgType.includes("newMast")) {
         this.newMast()
       }
       return;
     }

}



  


