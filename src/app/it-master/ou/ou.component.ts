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

interface IouMaster {
  ouId:number;
  ouName:string;
  ouDesc:string;
  divisionId:number;
  startDate:string;
  compId:number;
  mainBrAdd:string;
  ouCity:string;
  mState:string;
  country:string;
  uHeadCeo:string;
  status:string;
  compName:string;
  
}


@Component({
  selector: 'app-ou',
  templateUrl: './ou.component.html',
  styleUrl: './ou.component.css'
})
export class OuComponent {
  ouMasterForm: FormGroup;
  ouName:string;
  ouId:number;
  ouDesc:string;
  divisionId:number;
  startDate:string|null;
  // designation:string;
  mainBrAdd:string;
  ouCity:string;
  mState:string;
  country:string;
  uHeadCeo:string;
  public statusList: any=[];
  displayInactive = true;
  displayStatus = true;
  public status = "Active";
  endDate:string;
  loginYN:string;
  compName:string;
 

  public ouDivisionIDList: any=[];
  public locIdList: any=[];
  public OuCityList: any=[];
  public DesignationList: any=[];
  public allcmpActiveSearch: any=[];
  public allcompanyList:any=[];

  pipe = new DatePipe('en-US');
  displayButton=true;
  checkValidation=false;
  empId:number;
  allOuList:any[];
  lstcomments: any[];
 
  displayEndDate=false;
  displaystartDate=true;

  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.ouMasterForm = fb.group({
      ouId:[],
      ouName:[],
      ouDesc:[],
      desgId:[],
      divisionId:[],
      startDate:[],
      compId:[],
      mainBrAdd:[],
      ouCity:[],
      mState:[],
      country:[],
      uHeadCeo:[],
      status:[],
      compName:[],
    })
   }
   transData(val:any) {
    return val;
  }
  
  ngOnInit(): 
    void {
      $("#wrapper").toggleClass("toggled");
  this.displayButton=true;
  this.ouMasterForm.patchValue({ouId:sessionStorage.getItem('ouId')})
  this.ouMasterForm.patchValue({ouName:sessionStorage.getItem('ouName')})
  this.ouMasterForm.patchValue({ouDesc:sessionStorage.getItem('ouDesc')});
  this.ouMasterForm.patchValue({status:'Active'})




  this.service.OuCityList()
  .subscribe(
    data => {
      this.OuCityList = data.obj;
      console.log(this.OuCityList);
    }
  );
  
  this.service.ouDivisionIDList()
  .subscribe(
    data => {
      this.ouDivisionIDList = data.obj;
      console.log(this.ouDivisionIDList);
    }
  );

  this.service.allcompanyList()
  .subscribe(
    data => {
      this.allcompanyList = data.obj;
      console.log(this.allcompanyList);
    }
  );
  


  } 
  get f() { return this.ouMasterForm.controls; }

  ouMaster(ouMasterForm:any) {  }


  CheckDataValidations() {
    const formValue: IouMaster = this.ouMasterForm.getRawValue();
    
    var msg1;
  
  if (formValue.compId === undefined || formValue.compId === null) {
    this.checkValidation = false;
    msg1 = "COMPANY NAME: Should not be null....";
    alert(msg1);
    return;
  }
  
  
  
  if (formValue.ouName === undefined || formValue.ouName === null) {
    this.checkValidation = false;
    msg1 = "OPERATING UNIT NAME: Should not be null....";
    alert(msg1);
    return;
  }
  
  
  if (formValue.ouDesc === undefined || formValue.ouDesc === null) {
    this.checkValidation = false;
    msg1 = "OPERATING UNTE DESCRIPTION: Should not be null....";
    alert(msg1);
    return;
  }

  if (formValue.divisionId === undefined || formValue.divisionId === null) {
    this.checkValidation = false;
    msg1 = "DIVISION: Should not be null....";
    alert(msg1);
    return;
  }

  if (formValue.ouCity === undefined || formValue.ouCity === null) {
    this.checkValidation = false;
    msg1 = "CITY: Should not be null....";
    alert(msg1);
    return;
  }

  if (formValue.mState === undefined || formValue.mState === null) {
    this.checkValidation = false;
    msg1 = "STATE: Should not be null....";
    alert(msg1);
    return;
  }
  if (formValue.uHeadCeo === undefined || formValue.uHeadCeo === null) {
    this.checkValidation = false;
    msg1 = "UHEADCEO: Should not be null....";
    alert(msg1);
    return;
  }
  if (formValue.mainBrAdd === undefined || formValue.mainBrAdd === null) {
    this.checkValidation = false;
    msg1 = "MAIN BRANCH ADDRESS: Should not be null....";
    alert(msg1);
    return;
  }
  if (formValue.startDate === undefined || formValue.startDate === null) {
    this.checkValidation = false;
    msg1 = "START DATE(CURRENT DATE): Should not be null....";
    alert(msg1);
    return;
  }
  
  

  
  
  
  this.checkValidation = true
  
  }

  ouIdFind(ouId:any){
    // alert(ouId)
    this.displayButton=false;
    this.displayStatus=false;
    this.displaystartDate=false;
    this.ouMasterForm.get('startDate')?.disable();
    this.ouMasterForm.get('ouId')?.disable();
    this.ouMasterForm.get('ouName')?.disable();
    this.ouMasterForm.get('ouDesc')?.disable();
    this.ouMasterForm.get('desgId')?.disable();
    this.ouMasterForm.get('divisionId')?.disable();
    this.ouMasterForm.get('compId')?.disable();
    this.ouMasterForm.get('mainBrAdd')?.disable();
    this.ouMasterForm.get('ouCity')?.disable();
    this.ouMasterForm.get('mState')?.disable();
    this.ouMasterForm.get('mState')?.disable();
    this.ouMasterForm.get('country')?.disable();
    this.ouMasterForm.get('uHeadCeo')?.disable();
 this.ouMasterForm.get('status')?.disable();
    this.ouMasterForm.get('startDate')?.disable();
    this.service.ouIdFindFN(ouId)
    .subscribe(
      data => {
        this.ouMasterForm.patchValue(data.obj);
        // alert(data.obj.startDate)
          this.ouMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
      }
    );
  }

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}

newMast() { 
  // alert("Done !!!!")  
  
  this.CheckDataValidations();
  if (this.checkValidation === true) {

    const formValue: IouMaster = this.transData(this.ouMasterForm.value);
    console.log(formValue); 
  this.service.OuMasterSubmit(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);    
      this.ouMasterForm.disable();
      // this.ouIdFind(res.obj.ouId)
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

  const formValue: IouMaster = this.ouMasterForm.getRawValue();
  this.CheckDataValidations();
  if (this.checkValidation === true) {
  this.service.UpdateOuMasterById(formValue, formValue.ouId).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      // window.location.reload();
      this.ouMasterForm.disable();
    } else {
      if (res.code === 400) {
        alert(res.message);
       this.ouMasterForm.disable();
         this.ouMasterForm.reset();
      }
    }
  });
   }
}

searchMast() {
  this.service.allouActiveSearch()
    .subscribe(
      data => {
        this.allOuList = data.obj;
        console.log(this.allOuList);
      }
    );
}




validateStartDate(startDate:any) {
  var currDate = new Date();
  var sDate = new Date(startDate);
  if (sDate > currDate) {
    alert("START DATE :" + "Should not be above Today's Date");
    this.startDate = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
  }
}
}