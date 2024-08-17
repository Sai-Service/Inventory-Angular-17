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

interface CodesubtypMaster {
  codesubId:number;
  codesubName:string;
  codesubType:number;
  remarks:string;
  status:string;
  startDate:Date;
  code:string;
  codeDesc:string;
  cmntypeId:number;
  codesubTypeName:string;
}


@Component({
  selector: 'app-code-sub-type',
  templateUrl: './code-sub-type.component.html',
  styleUrl: './code-sub-type.component.css'
})
export class CodeSubTypeComponent {
  codesubtypeMasterForm: FormGroup;
  codesubId:number;
  codesubName:string;
  codesubType:number;
  remarks:string;
  startDate:Date;
  public statusList:any=[];
  displayInactive = true;
  displayStatus = true;
  public status = "Active";
  endDate:string;
  code:string;
  codeDesc:string;
  public AllcodesubtypeList:any=[];
  pipe = new DatePipe('en-US');
  displayButton=true;
  checkValidation=false;
  allcodesubtypeList:any[];
  displayEndDate=false;
  displaystartDate=true;
  cmntypeId:number;
  codesubTypeName:string;

  isVisibleadminSearch:boolean=true;
  isVisiblesuperSearch:boolean=true;



  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.codesubtypeMasterForm = fb.group({
      codesubId:[],
      codesubName:[],
  codesubType:[],
  remarks:[],
  status:[],
  startDate:[],
  code:[],
  codeDesc:[],
  codesubTypeName:[],
  cmntypeId:[],


    })  
  
  }

  transData(val:any)
  {
     return val;}
   

  transDataUpdate(val:any){
      delete val.startDate ;
     
      return val;
    }



  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayButton=true;
    this.codesubtypeMasterForm.patchValue({codesubId:sessionStorage.getItem('codesubId')})
    this.codesubtypeMasterForm.patchValue({codesubName:sessionStorage.getItem('codesubName')})
    // this.codesubtypeMasterForm.patchValue({codesubType:sessionStorage.getItem('codesubType')})
    this.codesubtypeMasterForm.patchValue({remarks:sessionStorage.getItem('remarks')})
    this.codesubtypeMasterForm.patchValue({startDate:sessionStorage.getItem('startDate')});
    this.codesubtypeMasterForm.patchValue({status:'Active'})



  this.service.AllcodesubtypeList()
  .subscribe(
    data => {
      this.AllcodesubtypeList = data.obj;
      console.log(this.AllcodesubtypeList);
    }
  );



  if(  sessionStorage.getItem('role')==='Admin') {
    this.isVisibleadminSearch=true;
    this.isVisiblesuperSearch=false;


  }

  if(  sessionStorage.getItem('role')==='SuperAdmin') {
    this.isVisibleadminSearch=false;
    this.isVisiblesuperSearch=true;

  }

  if(  sessionStorage.getItem('role')==='User') {
    this.isVisibleadminSearch=true;
    this.isVisiblesuperSearch=false;


  }



















  }
  get f() { return this.codesubtypeMasterForm.controls; }

  codesubtypeMaster(codesubtypeMasterForm:any) {  }

  CheckDataValidations() {
    const formValue: CodesubtypMaster = this.codesubtypeMasterForm.value;
    
    var msg1;

    if (formValue.codesubName === undefined || formValue.codesubName === null) {
      this.checkValidation = false;
      msg1 = "CODE SUB NAME: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.codesubType === undefined || formValue.codesubType === null) {
      this.checkValidation = false;
      msg1 = "CODE SUB TYPE: Should not be null....";
      alert(msg1);
      return;
    }

    // if (formValue.startDate === undefined || formValue.startDate === null) {
    //   this.checkValidation = false;
    //   msg1 = "START DATE (CURRENT DATE): Should not be null....";
    //   alert(msg1);
    //   return;
    // }
 
    this.checkValidation = true

  }


  codesubIdFind(codesubId:any){
    // alert(codesubId)
    this.displayButton=false;
    this.displayStatus=false;
    this.displaystartDate=false;
    this.codesubtypeMasterForm.get('startDate')?.disable();
    this.service.codesubIdFindFN(codesubId)
    .subscribe(
      data => {
        this.codesubtypeMasterForm.patchValue(data.obj);
        // alert(data.obj.startDate)
          this.codesubtypeMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
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
    const formValue: CodesubtypMaster = this.transData(this.codesubtypeMasterForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
       console.log(formValue);
  
    this.service.CodesubtypemMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.codesubtypeMasterForm.disable();
        // this.codesubIdFind(res.obj.codesubId)
        this.displayButton=false;
      
      } else {
        if (res.code === 400) {
          alert(res.message);
     
        }
      }
    });
  }
  }


  // updateMast() {
  
  //   const formValue: CodesubtypMaster = this.codesubtypeMasterForm.getRawValue();
  //   this.CheckDataValidations();
  //   if (this.checkValidation === true) {
  //     //  formValue.startDate=this.pipe.transform(this.startDate, 'yyyy-MM-dd');
  //     const formValue = this. transDataUpdate(this.codesubtypeMasterForm.value);
  //     console.log(formValue);
  //   this.service.UpdateCodesubtypemMasterById(formValue, formValue.codesubId).subscribe((res: any) => {
  //     if (res.code === 200) {
  //       alert(res.message);
  //       // window.location.reload();
  //       this.codesubtypeMasterForm.disable();
  //     } else {
  //       if (res.code === 400) {
  //         alert(res.message);
  //        this.codesubtypeMasterForm.disable();
  //          this.codesubtypeMasterForm.reset();
  //       }
  //     }
  //   });
  //    }
  // }

  updateMast() {

    const formValue: CodesubtypMaster = this.codesubtypeMasterForm.getRawValue();
    //  formValue.startDate=this.pipe.transform(this.startDate, 'yyyy-MM-dd');
    this.CheckDataValidations();
    if (this.checkValidation === true) {
    
    // formValue.startDate=this.pipe.transform(this.startDate, 'yyyy-MM-dd');
    this.service.UpdateCodesubtypemMasterById(formValue, formValue.codesubId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.codesubtypeMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.codesubtypeMasterForm.disable();
          this.codesubtypeMasterForm.reset();
        }
      }
     });
   }
   }
  
  searchMast() {
    this.service.allcodesubtypeMaster()
      .subscribe(
        data => {
          this.allcodesubtypeList = data.obj;
          console.log(this.allcodesubtypeList);
        }
      );
  }

  SupersearchMast() {
    var cmnid = this.codesubtypeMasterForm.get('codesubType')?.value;
    var sts = this.codesubtypeMasterForm.get('status')?.value;
    if (cmnid === null) { cmnid = '' }
    if (sts === null) { sts = '' }
    this.service.allcodesubtypeMasterSuper(sts,cmnid)
      .subscribe(
        data => {
          this.allcodesubtypeList = data.obj;
          console.log(this.allcodesubtypeList);
        }
      );
  }


}
