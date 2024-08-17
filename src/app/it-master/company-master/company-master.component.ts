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

interface IcmpMaster{
compId:number;
compCode:string;
compName:string;
address1:string;
address2:string;
address3:string;
city:string;
state:string;
country:string;
emailId:string;
horegAddress:string;
jurisdict:string;
pincd:number;
tanNo:number;
panNo:number;
gstNo:number;
startDt:Date;
status:string;
website:String;
createdBy:string;
lastUpdatedBy:String;
}

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrl: './company-master.component.css'
})
export class CompanyMasterComponent {
  companyMasterForm: FormGroup;
  compId:number;
  compCode:string;
  compName:string;
  address1:string;
  address2:string;
  address3:string;
  city:string;
  startDt:string|null;
  // status:string;
  state:string;
  country:string;
  emailId:string;
  horegAddress:string;
  jurisDict:string;
  pincd:number;
  tanNo:number;
  panNo:number;
  gstNo:number;


  pipe = new DatePipe('en-US');
  // displayButton=true;
  checkValidation=false;
  empId:number;
  lstcomments: any[];
  allCompList:any[];
  displayEndDate=false;
  displaystartDate=true;
  displayInactive = true;
  displayButton=true;
  website:string;
  OuCityList:any=[];
  createdBy:string;
  lastUpdatedBy:string;
  displayStatus = true;
  endDate: Date;
  showLoginDetails = false;
  statusList:any[];
  public status = "Active";
  

  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.companyMasterForm = fb.group({
      compId:[],
      compCode:[],
      compName:[],
      website:[],
      address1:[],
      address2:[],
      address3:[],
      city:[],
      state:[],
      country:[],
      startDt:[],
      status:[],
      emailId:[],
      horegAddress:[],
      jurisDict:[],
      pincd:[],
      tanNo:[],
      gstNo:[],
      panNo:[],
    endDt:[],
    endDate:[],
    createdBy:[],
    lastUpdatedBy:[],
   



     
  
    })
  } 


  compIdFind(compId:any){
    // alert(compId)
    this.displayButton=false;   
    this.displaystartDate=false;
    this.displayStatus = false;
    this.companyMasterForm.get('compId')?.disable();
    this.companyMasterForm.get('compCode')?.disable();
    this.companyMasterForm.get('compName')?.disable();
    this.companyMasterForm.get('address1')?.disable();
    this.companyMasterForm.get('address2')?.disable();
    this.companyMasterForm.get('city')?.disable();
    this.companyMasterForm.get('state')?.disable();
    this.companyMasterForm.get('country')?.disable();
    this.companyMasterForm.get('emailId')?.disable();
    this.companyMasterForm.get('horegAddress')?.disable();
    this.companyMasterForm.get('jurisDict')?.disable();
    this.companyMasterForm.get('pincd')?.disable();
    this.companyMasterForm.get('tanNo')?.disable();    
    this.companyMasterForm.get('gstNo')?.disable();
    this.companyMasterForm.get('panNo')?.disable();
    this.companyMasterForm.get('website')?.disable();
    // this.companyMasterForm.get('status').disable();
    this.companyMasterForm.get('startDt')?.disable();

   
    this.service.compIdFindFN(compId)
    .subscribe(
      data => {
        this.companyMasterForm.patchValue(data.obj);
        // alert(data.obj.startDt)
        this.companyMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });
      }
    )

    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data.obj;
        console.log(this.statusList);
      }
    );
  }
  transData(val:any) {
    return val;
  }

  



ngOnInit(): void {
  $("#wrapper").toggleClass("toggled");
  this.displayButton=true;
  this.companyMasterForm.patchValue({compId:sessionStorage.getItem('compId')});
  this.companyMasterForm.patchValue({compCode:sessionStorage.getItem('compCode')});
  this.companyMasterForm.patchValue({createdBy:sessionStorage.getItem('loginName')});
  this.companyMasterForm.patchValue({lastUpdatedBy:sessionStorage.getItem('loginName')});
   this.companyMasterForm.patchValue({status:'Active'})
  //  this.companyMasterForm.patchValue({ status: sessionStorage.getItem('status') });
   this.companyMasterForm.get('status')?.disable();
   
  this.service.CompanycityList()
  .subscribe(
    data => {
      this.OuCityList = data.obj;
      console.log(this.OuCityList);
    }
  );


  } 


get f() { return this.companyMasterForm.controls; }

companyMaster(companyMasterForm:any) {  }


onOptionsSelectede(event: any) {
this.status = this.companyMasterForm.get('status')?.value;
// alert(this.status);
if (this.status === 'Inactive') {
  this.displayInactive = false;
this.companyMasterForm.get('endDate')?.disable();
  this.displaystartDate = false;
  this.showLoginDetails = false;
  this.endDate = new Date();
  // this.loginYN = 'N';
  

}
else if (this.status === 'Active') {
  this.companyMasterForm.get('endDate')?.reset();
}
}





CheckDataValidations() {
const formValue: IcmpMaster = this.companyMasterForm.getRawValue();

var msg1;

if (formValue.compName === undefined || formValue.compName === null) {
this.checkValidation = false;
msg1 = "COMPANY NAME: Should not be null....";
alert(msg1);
return;
}



if (formValue.compCode === undefined || formValue.compCode === null) {
this.checkValidation = false;
msg1 = "COMPANY CODE: Should not be null....";
alert(msg1);
return;
}


if (formValue.website === undefined || formValue.website === null) {
this.checkValidation = false;
msg1 = "WEBSITE-WWW.SAISERVICE.COM: Should not be null....";
alert(msg1);
return;
}


if (formValue.address1 === undefined || formValue.address1 === null) {
this.checkValidation = false;
msg1 = "Address 1: Should not be null....";
alert(msg1);
return;
}


if (formValue.horegAddress === undefined || formValue.horegAddress === null) {
this.checkValidation = false;
msg1 = " Register Address : Should not be null....";
alert(msg1);
return;
}

if (formValue.city === undefined || formValue.city === null) {
this.checkValidation = false;
msg1 = " CITY : Should not be null....";
alert(msg1);
return;
}
 
if (formValue.pincd === undefined || formValue.pincd === null) {
this.checkValidation = false;
msg1 = " PIN CODE : Should not be null....";
alert(msg1);
return;
}

if (formValue.state === undefined || formValue.state === null) {
this.checkValidation = false;
msg1 = " STATE : Should not be null....";
alert(msg1);
return;
}

if (formValue.gstNo === undefined || formValue.gstNo === null) {
this.checkValidation = false;
msg1 = " GST No  : Should not be null....";
alert(msg1);
return;
}

if (formValue.tanNo === undefined || formValue.tanNo === null) {
this.checkValidation = false;
msg1 = " TAN No  : Should not be null....";
alert(msg1);
return;
}

if (formValue.panNo === undefined || formValue.panNo === null) {
this.checkValidation = false;
msg1 = " PAN No  : Should not be null....";
alert(msg1);
return;
}

if (formValue.startDt === undefined || formValue.startDt === null) {
this.checkValidation = false;
msg1 = " START DATE  : Should not be null....";
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




this.checkValidation = true

}

panCardValidation (event:any){
var validdata: boolean; 
var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
  validdata = patt.test(event.target.value);
  if (validdata === false) {
    alert('Please enter valid PAN Number');
  }

  
}


gstNoValidation (event:any){
var validdata: boolean; 
var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
  validdata = patt.test(event.target.value);
  if (validdata === false) {
    alert('Please enter valid GST Number');
  }

  
}

tanNoValidation (event:any){
var validdata: boolean; 
var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
  validdata = patt.test(event.target.value);
  if (validdata === false) {
    alert('Please enter valid TAN Number');
  }

  
}

  resetMast() {
    window.location.reload();
  }
  
  
  closeMast() {
    this.router.navigate(['admin']);
  }
  newMast() {   
    // alert('!!!!')
    const formValue: IcmpMaster = this.transData(this.companyMasterForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      formValue.compName=this.companyMasterForm.get('compName')?.value;
      formValue.website=this.companyMasterForm.get('website')?.value;
      formValue.status=this.companyMasterForm.get('status')?.value;
      formValue.compId=Number(sessionStorage.getItem('compId'));
      this.companyMasterForm.patchValue({createdBy:sessionStorage.getItem('loginName')});
      this.companyMasterForm.patchValue({lastUpdatedBy:sessionStorage.getItem('loginName')});
      console.log(formValue);
      
    this.service.CompanyMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.companyMasterForm.disable();
        // this.compIdFind(res.obj.compId)
        this.displayButton=false;
      
      } else {
        if (res.code === 400) {
          alert(res.message);
     
        }
      }
    });
  }
  }


  transCompany(val:any) {
    delete val.pincd ;
    delete val.tanNo;
    delete val.gstNo;
    delete val.panNo;
    return val;
  }

  updateMast() {

    const formValue: IcmpMaster = this.companyMasterForm.getRawValue();
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      // this.companyMasterForm.patchValue({createdBy:sessionStorage.getItem('loginName')});
    this.service.UpdatecmpMasterById(formValue, formValue.compId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.companyMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.companyMasterForm.disable();
          this.companyMasterForm.reset();
        }
      }
     });
   }
   }
  

   validateStartDate(stDate:any) {
    var currDate = new Date();
    var sDate = new Date(stDate);
    if (sDate > currDate) {
      alert("START DATE :" + "Should not be above Today's Date");
      this.startDt = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    }
  }
  


 searchMast() {
  this.service.allcmpActiveSearch()
  .subscribe(
    data => {
      this.lstcomments = data.obj;
      this.companyMasterForm.get('status')?.enable();
      console.log(this.lstcomments);
    }
  );
}
  }
