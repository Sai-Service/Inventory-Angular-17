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

interface IcodMaster{
  cmntypeId:number;
  codeType:String;
  attribute4:string|null;
  code:string;
  codeDesc:string;
  status:string;
  codeId:number;
  startDate:string;
  endDate:Date;
  remark:string;
}

@Component({
  selector: 'app-code-master',
  templateUrl: './code-master.component.html',
  styleUrl: './code-master.component.css'
})
export class CodeMasterComponent {
  codeMasterForm: FormGroup;
  cmntypeId:number;
  codeType:string;
  code:string;
  codeDesc:string;
  codeId:number;
  divisionId:number; 
  startDate:string;
  endDate:Date;
  // status:string;
  attribute4:string|null;
  remark:string;
  public CodeTypeList: any=[];
  checkValidation=false;
    empId:number;
    allcodemstList:any[];
    allCompList:any[];
    displayEndDate=false;
    displaystartDate=true;
    displayButton=true;
    displayStatus = true;
    displayInactive = true;
    public status = "Active";
    public allCodemstSearch: any=[];
    public AllcodetypeList: any=[];
    public statusList: any=[];
    pipe = new DatePipe('en-US');


  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
      this.codeMasterForm = fb.group({
        cmntypeId:[],
        codeType:[],
        compName:[],
        code:[],
        codeDesc:[],
        codeId:[],
        startDate:[],
        status:[],
        endDate:[],
        remark:[],
        attribute4:[]
      
      
      }) }


      cmnTypeIdFind(cmntypeId:any){
         alert(cmntypeId)
        this.displayButton=false;
        this.displaystartDate=false;
        this.displayStatus = false;
        this.codeMasterForm.get('cmntypeId')?.disable();
        this.codeMasterForm.get('codeType')?.disable();
        this.codeMasterForm.get('code')?.disable();
        // this.codeMasterForm.get('codeDesc').disable();
        this.codeMasterForm.get('startDate')?.disable();
        this.service.cmnTypeIdFind(cmntypeId)
      .subscribe(
        data => {
          this.codeMasterForm.patchValue(data.obj);
          let SelectcodeType = this.AllcodetypeList.find((codeType: any) => codeType.cmntypeId = data.obj.cmntypeId )
          console.log(SelectcodeType);
         
        // alert(data.obj.startDate)
          this.codeMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
     
     
     
     
     
        })
    }

    transData(val:any) {
      return val;
    }
       
    onOptionsSelectede(event: any) {
      this.status = this.codeMasterForm.get('status')?.value;
      alert(this.status);
      if (this.status === 'Inactive') {
        this.displayInactive = false;
        this.displaystartDate = false;
        this.endDate = new Date();
      }
      else if (this.status === 'Active') {
        this.codeMasterForm.get('endDate')?.reset();
      }
    }




  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.codeMasterForm.patchValue({ cmntypeId: sessionStorage.getItem('cmntypeId') })
    this.codeMasterForm.patchValue({ codeType: sessionStorage.getItem('codeType') })
    this.codeMasterForm.patchValue({ code: sessionStorage.getItem('code') })
    this.codeMasterForm.patchValue({ codeDesc: sessionStorage.getItem('codeDesc') });
    this.codeMasterForm.patchValue({ status: sessionStorage.getItem('status') });
    

    var cmnid = this.codeMasterForm.get('cmntypeId')?.value;
    // alert(cmnid);
    // this.service.cmnTypeIdFind(cmnid)
    // .subscribe(
    //   data => {
    //     this.cmntypeId = data.obj;
    //     console.log(this.cmntypeId);
    //   }
    // ); 

    

    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data.obj;
        console.log(this.statusList);
      }
    );
     


    
    this.service.AllcodetypeList()
      .subscribe(
        data => {
          this.AllcodetypeList = data.obj;
          console.log(this.AllcodetypeList);
        }
      );

   
  }



  get f() { return this.codeMasterForm.controls; }

  codeMaster(codeMasterForm: any) { }



  CheckDataValidations() {
    const formValue: IcodMaster = this.codeMasterForm.getRawValue();
    
    var msg1;

    if (formValue.codeType === undefined || formValue.codeType === null) {
      this.checkValidation = false;
      msg1 = "CODE TYPE: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.code === undefined || formValue.code === null) {
      this.checkValidation = false;
      msg1 = "CODE: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.codeDesc === undefined || formValue.codeDesc === null) {
      this.checkValidation = false;
      msg1 = "CODE DESCRIPTION: Should not be null....";
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

  resetMast() {
    window.location.reload();
  }
  
  
  closeMast() {
    this.router.navigate(['admin']);
  }
  newMast() { 
    // alert("ALL FIELD INSERTED")  
    const formValue: IcodMaster = this.transData(this.codeMasterForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      formValue.codeType=this.codeMasterForm.get('codeType')?.value;
      formValue.cmntypeId=Number(sessionStorage.getItem('cmntypeId'));
      formValue.attribute4=sessionStorage.getItem('deptName');
      console.log(formValue);
      
    this.service.CodeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.codeMasterForm.disable();
        // this.cmnTypeIdFind(res.obj.cmntypeId)
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

    const formValue: IcodMaster = this.codeMasterForm.getRawValue();
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      // var glDate =this.DatePipe.transform(this.glDate1, 'yyyy-MM-dd');
    // formValue.cmntypeId=this.cmntypeId;
    // formValue.codeType=this.codeType;
    // formValue.endDt =  this.pipe.transform(this.endDt, 'yyyy-MM-dd');
    // formValue.startDt=this.pipe.transform(this.startDt, 'yyyy-MM-dd');
    this.service.UpdatecodeMasterById(formValue, formValue.cmntypeId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.codeMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.codeMasterForm.disable();
          this.codeMasterForm.reset();
        }
      }
     });
   }
   }

  

  searchMast() {
    var searchText = this.codeMasterForm.get('codeType')?.value;
    this.service.allCodemstSearch(searchText)
      .subscribe(
        data => {
          this.allcodemstList = data.obj;
          console.log(this.allcodemstList);
          // this.displayButton=false;
        }
      );
  }


}
