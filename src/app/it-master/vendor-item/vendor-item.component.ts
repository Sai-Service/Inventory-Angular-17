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

interface IvenitmMaster {
  itemId:number;
  codeName:string;
  codeDesc:string;
  budgetTypeId:number;
  codeDetails:string;
  startDate:Date;
  status:string;
  code:string;
  itemName:string;
  budgetType:String;
}

@Component({
  selector: 'app-vendor-item',
  templateUrl: './vendor-item.component.html',
  styleUrl: './vendor-item.component.css'
})
export class VendorItemComponent {
  vendoritemMasterForm: FormGroup;
  itemId:number;
  codeName:string;
  codeDesc:string;
  budgetTypeId:number;
  codeDetails:string;
  startDate:Date;
  public statusList: any=[];
  displayInactive = true;
  displayStatus = true;
  public status = "Active";
  endDate:string;
  loginYN:string;
  compName:string;
  code:string;
  itemName:string;
  budgetType:String;



 

  public DivisionIDList: any=[];
  public locIdList: any=[];
  public OuCityList: any=[];
  public DesignationList: any=[];
  public AllbudgettypeList: any=[];
 

  pipe = new DatePipe('en-US');
  displayButton=true;
  checkValidation=false;
  allvendoritemList:any[];
  lstcomments: any[];
 
  displayEndDate=false;
  displaystartDate=true;

  isVisibleSearchSuper:boolean=true;
  isVisibleSearch:boolean=true;



  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.vendoritemMasterForm = fb.group({
      itemId:[],
  codeName:[],
  codeDesc:[],
  budgetTypeId:[],
  codeDetails:[],
  startDate:[],
  status:[],
  code:[],
  itemName:[],
  budgetType:[],


    })  }

    transData(val:any) {
      return val;
    }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayButton=true;
    this.vendoritemMasterForm.patchValue({itemId:sessionStorage.getItem('itemId')})
    this.vendoritemMasterForm.patchValue({codeName:sessionStorage.getItem('codeName')})
    this.vendoritemMasterForm.patchValue({codeDesc:sessionStorage.getItem('codeDesc')})
    this.vendoritemMasterForm.patchValue({budgetTypeId:sessionStorage.getItem('budgetTypeId')})
    this.vendoritemMasterForm.patchValue({codeDetails:sessionStorage.getItem('codeDetails')});
    this.vendoritemMasterForm.patchValue({status:'Active'})



   
    this.service.AllbudgettypeList()
    .subscribe(
      data => {
        this.AllbudgettypeList = data.obj;
        console.log(this.AllbudgettypeList);
      }
    );


    if(  sessionStorage.getItem('role')==='Admin') {
      this.isVisibleSearch=true;
      this.isVisibleSearchSuper=false;


    }

    if(  sessionStorage.getItem('role')==='SuperAdmin') {
      this.isVisibleSearch=false;
      this.isVisibleSearchSuper=true;

    }

    if(  sessionStorage.getItem('role')==='User') {
      this.isVisibleSearch=true;
      this.isVisibleSearchSuper=false;


    }


  }

  get f() { return this.vendoritemMasterForm.controls; }

  vendoritemMaster(vendoritemMasterForm:any) {  }


  CheckDataValidations() {
    const formValue: IvenitmMaster = this.vendoritemMasterForm.value;
    
    var msg1;

    if (formValue.codeName === undefined || formValue.codeName === null) {
      this.checkValidation = false;
      msg1 = "CODE NAME: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.codeDesc === undefined || formValue.codeDesc === null) {
      this.checkValidation = false;
      msg1 = "CODE DESCRIPTION: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.budgetTypeId === undefined || formValue.budgetTypeId === null) {
      this.checkValidation = false;
      msg1 = "BUDGET TYPE: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.codeDetails === undefined || formValue.codeDetails === null) {
      this.checkValidation = false;
      msg1 = "CODE DESCRIPTION: Should not be null....";
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



  vendoritemIdFind(itemId:any){
    // alert(itemId)
    this.displayButton=false;
    this.displayStatus=false;
    this.displaystartDate=false;
    this.vendoritemMasterForm.get('startDate')?.disable();
    this.service.vendoritemIdFindFN(itemId)
    .subscribe(
      data => {
        this.vendoritemMasterForm.patchValue(data.obj);
        alert(data.obj.startDate)
          this.vendoritemMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
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
    const formValue: IvenitmMaster = this.transData(this.vendoritemMasterForm.value);
      console.log(formValue);
  
    this.service.VendoritemMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.vendoritemMasterForm.disable();
      
        this.displayButton=false;
      
      } else {
        if (res.code === 400) {
          alert(res.message);
     
        }
      }
    });
  // }
  }
  
  updateMast() {
  
    const formValue: IvenitmMaster = this.vendoritemMasterForm.getRawValue();
    this.service.UpdateVendoritemMasterById(formValue, formValue.itemId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.vendoritemMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
         this.vendoritemMasterForm.disable();
           this.vendoritemMasterForm.reset();
        }
      }
    });
    //  }
  }
  
  searchMast() {
    this.service.allvendoritemMaster()
      .subscribe(
        data => {
          this.allvendoritemList = data.obj;
          console.log(this.allvendoritemList);
        }
      );
  }
  

  SupersearchMast() {
    var budtypId = this.vendoritemMasterForm.get('budgetTypeId')?.value;
    var sts = this.vendoritemMasterForm.get('status')?.value;
    if (budtypId === null) { budtypId = '' }
    this.service.allvendoritemMasterSupersearch(sts,budtypId)
      .subscribe(
        data => {
          this.allvendoritemList = data.obj;
          console.log(this.allvendoritemList);
        }
      );
  }
  



}

