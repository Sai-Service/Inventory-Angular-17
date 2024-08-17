import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItmasterService } from '../itmaster.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';

interface ILocMaster {
  locId:number;
  locCode:number;
  locName:number;
  address1:number;
  address2:string;
  address3:number;
  city:string;
  ouId:number;
  pinCd:string;
  state:string;
  country:string;
  emailId:string;
  phone1:string;
  phone2:string;
  gstNo:string;
  panNo:string;
  tanNo:string;
  cinNo:string;
  status:Date;
  region:number;
  registeredAdd:string;
  locFooter:string;
  principalAdd:string;
  startDate:string;
  ouCity:string;
  erpLocId:number;
}


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  locationMasterForm:FormGroup;
  locId:number;
  locCode:number;
  locName:string;
  address1:string;
  address2:string;
  address3:string;
  ouId:number;
  city:string;
  pinCd:number;
  state:string;
  country:string;
  emailId:string;
  phone1:number;
  phone2:number;
  gstNo:string;
  panNo:string;
  tanNo:string;
  cinNo:string;
  status:string;
  region:string;
  registeredAdd:string;
  locFooter:string;
  principalAdd:string;
  startDate:string|null;
  ouCity:string;
  erpLocId:number;

  checkValidation=false;
  pipe = new DatePipe('en-US');
    lstcomments: any[];
    allLocList:any[];
    displayEndDate=false;
    displaystartDate=true;
    displayButton=true;
    public loactionouNameList:any=[];
    isVisibleadminSearch:boolean=true;
    isVisibleSuperSearch:boolean=true;
    
    public loactionoucityList:any=[];
    constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
      this.locationMasterForm = fb.group({
        locId:[],
  locCode:[],
  locName:[],
  address1:[],
  address2:[],
  address3:[],
  city:[],
  pinCd:[],
  state:[],
  country:[],
  emailId:[],
  phone1:[],
  phone2:[],
  gstNo:[],
  panNo:[],
  tanNo:[],
  cinNo:[],
  ouId:[],
  ouCity:[],
  region:[],
  registeredAdd:[],
  locFooter:[],
  principalAdd:[],
  status:[],
  startDate:[],
  erpLocId:[],
  
      })
    }

   

    transData(val:any) {
      return val;
    }



  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayButton=true;
    this.displayButton=true;
    this.locationMasterForm.patchValue({locId:sessionStorage.getItem('locId')})
    this.locationMasterForm.patchValue({locCode:sessionStorage.getItem('locCode')})
    // this.locationMasterForm.patchValue({locName:sessionStorage.getItem('locName')})
    this.locationMasterForm.patchValue({ouCity:sessionStorage.getItem('City')})
    this.locationMasterForm.patchValue({status:'Active'})
    
   
  

    this.service.loactionouNameList()
    .subscribe(
      data => {
        this.loactionouNameList = data.obj;
        console.log(this.loactionouNameList);
      }
    );

    this.service.loactionoucityList()
    .subscribe(
      data => {
        this.loactionoucityList = data.obj;
        console.log(this.loactionoucityList);
      }
    );
    



    if(  sessionStorage.getItem('role')==='Admin') {
      this.isVisibleadminSearch=true;
      this.isVisibleSuperSearch=false;


    }

    if(  sessionStorage.getItem('role')==='SuperAdmin') {
      this.isVisibleadminSearch=false;
      this.isVisibleSuperSearch=true;

    }

    if(  sessionStorage.getItem('role')==='User') {
      this.isVisibleadminSearch=true;
      this.isVisibleSuperSearch=false;


    }



    
  }


  get f() { return this.locationMasterForm.controls; }

   locationMaster(locationMasterForm:any) {  }

  
   locIdFind(locId:any){
    // alert(locId)
    this.displayButton=false;
    this.displaystartDate=false;
    this.locationMasterForm.get('startDate')?.disable();
    this.locationMasterForm.get('locId')?.disable();
    this.locationMasterForm.get('locCode')?.disable();
    this.locationMasterForm.get('locName')?.disable();
    this.locationMasterForm.get('address1')?.disable();
    this.locationMasterForm.get('city')?.disable();
    this.locationMasterForm.get('state')?.disable();
    this.locationMasterForm.get('country')?.disable();
    this.locationMasterForm.get('emailId')?.disable();
    this.locationMasterForm.get('cinNo')?.disable();
    this.locationMasterForm.get('ouId')?.disable();
    this.locationMasterForm.get('pinCd')?.disable();
    this.locationMasterForm.get('tanNo')?.disable();
    this.locationMasterForm.get('gstNo')?.disable();
    this.locationMasterForm.get('panNo')?.disable();
    this.locationMasterForm.get('registeredAdd')?.disable();
    this.locationMasterForm.get('status')?.disable();
    this.locationMasterForm.get('region')?.disable();
    this.locationMasterForm.get('phone1')?.disable();
    this.locationMasterForm.get('erpLocId')?.disable();
    this.locationMasterForm.get('startDate')?.disable();
    this.service.locIdFindFN(locId)
    .subscribe(
      data => {
        this.locationMasterForm.patchValue(data.obj);
      }
    )
    this.service.locIdFindFN(locId)
    .subscribe(
      data => {
        this.locationMasterForm.patchValue(data.obj);
        // alert(data.obj.startDate)
          this.locationMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
      }
    );
  }



  // VALIDATION PART
  CheckDataValidations() {

    const formValue: ILocMaster = this.locationMasterForm.getRawValue();

    var msg1;

    if (formValue.locName === undefined || formValue.locName === null) {
      this.checkValidation = false;
      msg1 = "LOCATION NAME: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.emailId === undefined || formValue.emailId === null || formValue.emailId.trim() == '') {
      this.checkValidation = false;
      alert("EMAIL ID: Should not be null....");
      return;
    } else {
      if (formValue.emailId.includes('@') === false) { alert("EMAIL ID: Enter Valid Email Id...."); return; }
    }

    if (formValue.phone1 === undefined || formValue.phone1 === null) {
      this.checkValidation = false;
      alert("CONTACT NO1: Should not be null....");
      return;
    }


    this.checkValidation = true

  }






  
  closeMast() {
    this.router.navigate(['admin']);
  }

resetMast() {
  window.location.reload();
}
newMast() { 
  // alert("hello !!!!!")  
  const formValue: ILocMaster = this.transData(this.locationMasterForm.value);
  this.CheckDataValidations();
  if (this.checkValidation === true) {
    formValue.locName=this.locationMasterForm.get('locName')?.value;
    // formValue.locId=Number(sessionStorage.getItem('locId'));
    console.log(formValue);

  this.service.LocationMasterSubmit(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);    
      this.locationMasterForm.disable();
      this.locIdFind(res.obj.locId)
      this.displayButton=false;
    
    } else {
      if (res.code === 400) {
        alert(res.message);
   
      }
    }
  });
}
}


updateMast() {

  const formValue: ILocMaster = this.locationMasterForm.getRawValue();
  this.CheckDataValidations();
  if (this.checkValidation === true) {
  // var glDate =this.DatePipe.transform(this.glDate1, 'yyyy-MM-dd');
  formValue.locId=this.locId;
  this.service.UpdatelocMasterById(formValue, formValue.locId).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      // window.location.reload();
      this.locationMasterForm.disable();
    } else {
      if (res.code === 400) {
        alert(res.message);
        this.locationMasterForm.disable();
        this.locationMasterForm.reset();
      }
    }
   });
 }
 }



searchMast() {
  this.service.alllocActiveSearch()
    .subscribe(
      data => {
        this.allLocList = data.obj;
        console.log(this.allLocList);
      }
    );
}


SupersearchMast() {
  var ouid = this.locationMasterForm.get('ouId')?.value;
  if (ouid === undefined || ouid === null || ouid === ''){
    alert('Please Select Operating Unit.!');
    return;
  }
  var sts = this.locationMasterForm.get('status')?.value;
  this.service.alllocActiveSuperSearch(sts,ouid)
    .subscribe(
      data => {
        this.allLocList = data.obj;
        console.log(this.allLocList);
      }
    );
}




validateStartDate(startDate:any) {
  var currDate = new Date();
  var lsDate = new Date(startDate);
  if (lsDate > currDate) {
    alert("START DATE :" + "Should not be above Today's Date");
    this.startDate = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
  }
}



}