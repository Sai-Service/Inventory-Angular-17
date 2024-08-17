import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItmasterService } from '../itmaster.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';


interface IcodMaster {
  codeId: number;
  codeType: String;
  attribute4:string|null;
  codeDesc: string;
  status: string;
  startDate: Date;
}

@Component({
  selector: 'app-code-type',
  templateUrl: './code-type.component.html',
  styleUrl: './code-type.component.css'
})
export class CodeTypeComponent {
  codetypeMasterForm: FormGroup;
  codeId:number;
  codeType:String;
  
  codeDesc:string;
 
  startDate:Date; 
 public CodeTypeList: Array<string> = [];
 checkValidation=false;
   empId:number;
   allcodemstList:any[];
   allCompList:any[];
   displayEndDate=false;
   displaystartDate=true;
   displayButton=true;
   // public status = "Active";
   pipe = new DatePipe('en-US');
   public allCodemstSearch: Array<string> = [];
   public status = "Active";

   isVisibleadminSearch:boolean=true;
   isVisiblesuperSearch:boolean=true;



 constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
     this.codetypeMasterForm = fb.group({
       codeId:[],
       codeType:[],
      codeDesc:[],
      status:["Active"],
      startDate:[],
     
     
     }) }


     codetypemasterIdFind(codeId:any){
        // alert(codeId)
       this.displayButton=false;
       this.displaystartDate=false;
       // this.codetypeMasterForm.get('codeId').disable();
       // this.codetypeMasterForm.get('codeType').disable();
       // this.codetypeMasterForm.get('code').disable();
       // this.codetypeMasterForm.get('codeDesc').disable();
       
       this.service.codetypemasterIdFind(codeId)
     .subscribe(
       data => {
         this.codetypeMasterForm.patchValue(data.obj);
        //  alert(data.obj.startDate)
         this.codetypeMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
       })
   }

   transData(val:any) {
     return val;
   }
       




 ngOnInit(): void {
   $("#wrapper").toggleClass("toggled");
   this.codetypeMasterForm.patchValue({ codeId: sessionStorage.getItem('codeId') })
   this.codetypeMasterForm.patchValue({ codType: sessionStorage.getItem('codeType'),status:'Active' })
   
   this.codetypeMasterForm.patchValue({ codeDesc: sessionStorage.getItem('codeDesc') });

   // this.service.cmnTypeIdFind(sessionStorage.getItem('cmntypeId'))
   // .subscribe(
   //   data => {
   //     this.cmntypeId = data.obj;
   //     console.log(this.cmntypeId);
   //   }
   // ); 




   // this.service.CodeTypeList()
   // .subscribe(
   //   data => {
   //     this.CodeTypeList = data.obj;
   //     console.log(this.CodeTypeList);
   //   }
   // );

  this.disableAllValue()
  
 }
 disableAllValue(){
  this.codetypeMasterForm.get('status')?.disable();
  // this.codetypeMasterForm.get('startDate')?.disable();
  
 }


 get f() { return this.codetypeMasterForm.controls; }

 codetypeMaster(codetypeMasterForm: any) { }


 CheckDataValidations() {
   const formValue: IcodMaster = this.codetypeMasterForm.value;
   
   var msg1;

   if (formValue.codeType === undefined || formValue.codeType === null) {
     this.checkValidation = false;
     msg1 = "CODE TYPE : Should not be null....";
     alert(msg1);
     return;
   }
   
   if (formValue.codeDesc === undefined || formValue.codeDesc === null) {
     this.checkValidation = false;
     msg1 = " CODE DESCRIPTION: Should not be null....";
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
   


 resetMast() {
   window.location.reload();
 }
 
 
 closeMast() {
   this.router.navigate(['admin']);
 }


 newMast() { 
   // alert("done !!!")  
   const formValue: IcodMaster = this.transData(this.codetypeMasterForm.value);
   this.CheckDataValidations();
   if (this.checkValidation === true) {
     console.log(formValue);
     formValue.attribute4=sessionStorage.getItem('deptName');
     formValue.status='Active';
   this.service.CodetypeMasterSubmit(formValue).subscribe((res: any) => {
     if (res.code === 200) {
       alert(res.message);    
       this.codetypeMasterForm.disable();
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

   const formValue: IcodMaster = this.codetypeMasterForm.getRawValue();
   this.CheckDataValidations();
   if (this.checkValidation === true) {
     // var glDate =this.DatePipe.transform(this.glDate1, 'yyyy-MM-dd');
   // formValue.cmntypeId=this.cmntypeId;
   // formValue.codeType=this.codeType;
   // formValue.endDt =  this.pipe.transform(this.endDt, 'yyyy-MM-dd');
   // formValue.startDate=this.pipe.transform(this.startDate, 'yyyy-MM-dd');
   this.service.UpdatecodetypeMasterById(formValue, formValue.codeId).subscribe((res: any) => {
     if (res.code === 200) {
       alert(res.message);
       // window.location.reload();
       this.codetypeMasterForm.disable();
     } else {
       if (res.code === 400) {
         alert(res.message);
         this.codetypeMasterForm.disable();
         this.codetypeMasterForm.reset();
       }
     }
    });
  }
  }

  searchMast() {
   var sts="Active"
   this.service.allCodetypSearch(sessionStorage.getItem('deptName'),sts)
     .subscribe(
       data => {
         this.allcodemstList = data.obj;
         console.log(this.allcodemstList);
       }
     );
 }


}


