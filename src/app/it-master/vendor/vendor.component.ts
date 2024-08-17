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


interface IVenlMaster {
  vendorId:number;
  vendorName:string;
  vendorLocation:string;
  vendorCity:string;
  vendorAddress:string;
  paymentTerm:string;
  gstNo:number;
  panNo:number;
  cinNo:number;
  otherInfo:string;
 status:string;
 startDate:Date;
  
}

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {
  vendorMasterForm:FormGroup;
  vendorId:number;
  vendorName:string;
  vendorLocation:string;
  vendorCity:string;
  vendorAddress:string;
  paymentTerm:string;
  gstNo:number;
  panNo:number;
  cinNo:number;
  otherInfo:string;
  startDate:string;
  public status = "Active";
  endDate:string;

  public DivisionIDList: any=[];
  public locIdList: any=[];
  public DepartmentList: any;
  public DesignationList: any=[];
  public AllPaymenttermList :any=[];
 
  displayStatus=true;
  pipe = new DatePipe('en-US');
  displayButton=true;
  checkValidation=false;
  empId:number;
  allVendorList:any[];
  lstcomments: any[];
  displayEndDate=false;
  displaystartDate=true;


  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.vendorMasterForm= fb.group({
      vendorId:[],
      vendorName:[],
      vendorLocation:[],
      vendorCity:[],
      vendorAddress:[],
      paymentTerm:[],
      gstNo:[],
      panNo:[],
      cinNo:[],
      otherInfo:[],
     status:[],
     startDate:[],
    })
  }

  transData(val:any) {
    return val;
  }
  

  ngOnInit(): void {
    this.displayButton=true;
    this.vendorMasterForm.patchValue({vendorId:sessionStorage.getItem('vendorId')})
    this.vendorMasterForm.patchValue({vendorName:sessionStorage.getItem('vendorName')})
    
   this.service.AllPaymenttermList()
   .subscribe(
    data => {
      this.AllPaymenttermList = data.obj;
      console.log(this.AllPaymenttermList);
    }
  );
  
  
  }
  get f() { return this.vendorMasterForm.controls; }

  vendorMaster(vendorMasterForm:any) {  }

  CheckDataValidations() {
    const formValue: IVenlMaster = this.vendorMasterForm.value;
    
    var msg1;

    if (formValue.vendorName === undefined || formValue.vendorName === null) {
      this.checkValidation = false;
      msg1 = "VENDOR NAME: Should not be null....";
      alert(msg1);
      return;
    }
    
    if (formValue.vendorLocation === undefined || formValue.vendorLocation === null) {
      this.checkValidation = false;
      msg1 = "VENDOR LOCATION: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.vendorCity === undefined || formValue.vendorCity === null) {
      this.checkValidation = false;
      msg1 = "VENDOR CITY: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.vendorAddress === undefined || formValue.vendorAddress === null) {
      this.checkValidation = false;
      msg1 = "VENDOR ADDRESS: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.paymentTerm === undefined || formValue.paymentTerm === null) {
      this.checkValidation = false;
      msg1 = "PAYMENT TERM: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.gstNo === undefined || formValue.gstNo === null) {
      this.checkValidation = false;
      msg1 = "GST NO: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.panNo === undefined || formValue.panNo === null) {
      this.checkValidation = false;
      msg1 = "PAN NO: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.cinNo === undefined || formValue.cinNo === null) {
      this.checkValidation = false;
      msg1 = "CIN NO: Should not be null....";
      alert(msg1);
      return;
    }
    // alert(formValue.startDate)
    // if (formValue.startDate === undefined || formValue.startDate === null) {
    //   this.checkValidation = false;
    //   msg1 = "START DATE: Should not be null....";
    //   alert(msg1);
    //   return;
    // }



    
this.checkValidation = true

  }




  vendorIdFind(vendorId:any){
    // alert(vendorId)
    this.displayButton=false;
    this.displayStatus=false;
    this.displaystartDate=false;
    this.vendorMasterForm.get('vendorId')?.disable();
    this.vendorMasterForm.get('startDate')?.disable();
    this.service.vendorIdFindFN(vendorId)
    .subscribe(
      data => {
        this.vendorMasterForm.patchValue(data.obj);
        // alert(data.obj.startDate)
          this.vendorMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
      }
    );
  }

  resetMast() {
    window.location.reload();
  }
  
  closeMast() {
    this.router.navigate(['admin']);
  }

  panCardValidation(event:any) {
    var validdata: boolean;
    var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
    validdata = patt.test(event.target.value);
    if (validdata === false) {
      alert('Please enter valid PAN Number');
    }
  }

  gstNoValidation(event:any) {
    var validdata: boolean;
    var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
    validdata = patt.test(event.target.value);
    if (validdata === false) {
      alert('Please enter valid PAN Number');
    }
  }
 

  cinNoNoValidation(event:any) {
    var validdata: boolean;
    var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
    validdata = patt.test(event.target.value);
    if (validdata === false) {
      alert('Please enter valid PAN Number');
    }
  }
  
  newMast() { 
    alert("Done !!!!")  
    const formValue: IVenlMaster = this.transData(this.vendorMasterForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      console.log(formValue);
  
    this.service.VendorMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.vendorMasterForm.disable();
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

    const formValue: IVenlMaster = this.vendorMasterForm.getRawValue();
    this.CheckDataValidations();
    if (this.checkValidation === true) {
    this.service.UpdatevendorMasterById(formValue, formValue.vendorId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.vendorMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
         this.vendorMasterForm.disable();
           this.vendorMasterForm.reset();
        }
      }
    });
     }
  }


  
searchMast() {
  this.service.allvendorMaster()
    .subscribe(
      data => {
        this.allVendorList = data.obj;
        console.log(this.allVendorList);
      }
    );
}
}





