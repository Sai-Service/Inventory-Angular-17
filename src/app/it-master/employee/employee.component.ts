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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItTransService } from '../../it-transaction/it-trans.service';

interface IEmplMaster {
  
  ouId: number;
  deptId: number;
  locId: number;
  desgId: number;
  startDt: string;
  tktNo: String;
  designation: string;
  title: string;
  fname: string;
  mname: string;
  lname: string;
  panNo: number;
  tanNo: number;
  empName: string;
  loginName: string;
  emailId: string;
  contactNo: string;
  status: string;
  divisionId: number;
  divisionName:string;
  loginYN: string;
  endDt: string;
  role: string;
  password: string;
  empId: number;
  website: String;
  cmntypeId: number;
  compId:number;
  compName:string;
  attribute3:string;
  lastUpdatedBy:string;
  
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  employeesMasterForm: FormGroup;
  locId: number;
  deptId: number;
  ouId: number;
  divisionId: number;
  divisionName:string;

  cmntypeId: number;
  tktNo: string;
  startDt: string|null;
  // designation:string;
  desgId: number;
  title: string;
  fname: string;
  mname: string;
  lname: string;
  // fullName: string;
  empName: string;

  panNo: string;
  tanNo: number;
  loginName: string;
  emailId: string;
  contactNo: string;
  public status = "Active";
  endDate: Date;
  loginYN: string;


  isEisableLocationInSearch=false;
  public DivisionIDList: any=[];
  public locIdList: any=[];
  public ALLlocIdList:any=[];
  public DepartmentList: any;
  companyNameList:any;
  // public DesignationList: any=[];
  DesignationList: any = [];
  public getLocationId: any=[];
  public teamRoleList: any=[];
  public titleList: any=[];
  displayStatus = true;
  public statusList: any=[];
  displayInactive = true;
  pipe = new DatePipe('en-US');
  public minDate = new Date();

  public maxDate = new Date();
  showLoginDetails = false;
  endDt: Date;
  role: string;
  password: string;
  displayButton = true;
  checkValidation = false;
  empId: number;
  trimTrailingWhitespace = true
  lstcomments: any[];
  displayEndDate = false;
  displaystartDate = true;
  compId:number;
  compName:string;
  attribute3:string;
  isVisibleSearch:boolean=true;
  isVisibleSearchAllSsup:boolean=true;
  isVisibleSupAdminloc:boolean=true;
  isVisibleadminloc:boolean=true;


  

  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.employeesMasterForm = fb.group({
      ouId: [],
      deptId: [],
      locId: [],
      desgId: [],
      tktNo: [],
      startDt: [],
      designation: [],
      title: [],
      fname: [],
      empName: [],
      lname: [],
      mname: [],
      panNo: [],
      tanNo: [],
      loginName: [],
      emailId: [],
      contactNo: [],
      status: [],
      endDate: [],
      divisionId: [],
      divisionName:[],
      loginYN: [],
      endDt: [],
      role: [],
      password: [],
      empId: [],
      compId:[],
      compName:[],
      cmntypeId: [],
      attribute3:[]
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    
    this.employeesMasterForm.patchValue({attribute3:sessionStorage.getItem('loginName')})
    this.employeesMasterForm.patchValue({ loginYN: 'No' })
    this.divisionId = Number(sessionStorage.getItem('divisionId'));

    this.service.getLocationId(sessionStorage.getItem('ouId'))
      .subscribe(
       ( data:any) => {
          this.locIdList = data.obj;
          console.log(this.locIdList);
        }
      );

      this.service.getALLLocationId()
      .subscribe(
        ( data:any) => {
          this.ALLlocIdList = data.obj;
          console.log(this.ALLlocIdList);
        }
      );

    
    this.service.DivisionIDList(sessionStorage.getItem('ouId'))
    .subscribe(
      ( data:any) => {
        this.DivisionIDList = data.obj;
        console.log(this.DivisionIDList); 

      }
    );
    this.service.DivisionIDList(sessionStorage.getItem('ouId'))
      .subscribe(
        ( data:any) => {
          this.DivisionIDList = data.obj;
          console.log(this.DivisionIDList);
        }
      );

    this.service.DepartmentList()
      .subscribe(
        ( data:any) => {
          this.DepartmentList = data.obj;
          console.log(this.DepartmentList);
        }
      );

      this.service.EmpCompanyList()
      .subscribe(
        ( data:any)=> {
          this.companyNameList = data.obj;
          console.log(this.companyNameList);
        }
      ); 

    this.service.titleList()
      .subscribe(
        ( data:any) => {
          this.titleList = data.obj;
          console.log(this.titleList);
        }
      );
    this.service.statusList()
      .subscribe(
        ( data:any) => {
          this.statusList = data.obj;
          console.log(this.statusList);
        }
      );


    this.service.DesignationList()
      .subscribe(
        ( data:any) => {
          this.DesignationList = data.obj;
          console.log(this.DesignationList);
        }
      );

      if(  sessionStorage.getItem('role')==='Admin') {
        // this.purchaseReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
        this.employeesMasterForm.patchValue({ locId: sessionStorage.getItem('locId') })
    this.employeesMasterForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
    this.employeesMasterForm.patchValue({ deptId: sessionStorage.getItem('deptId') });
    this.employeesMasterForm.patchValue({ tktNo: sessionStorage.getItem('tktNo') });
    this.employeesMasterForm.patchValue({ status: sessionStorage.getItem('status') });
    this.employeesMasterForm.patchValue({ divisionId: sessionStorage.getItem('divisionId') });
        this.isVisibleSearch=true;
        this.isVisibleSearchAllSsup=false;
        this.isVisibleadminloc=true;
        this.isVisibleSupAdminloc=false;
          
        }
        if(  sessionStorage.getItem('role')==='SuperAdmin') {
          this.isVisibleSearch=false;
        this.isVisibleSearchAllSsup=true;
        this.isVisibleadminloc=false;
        this.isVisibleSupAdminloc=true;
          
          }
        if(sessionStorage.getItem('role')==='User')
        {
          // this.purchaseReportForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
          this.employeesMasterForm.patchValue({ locId: sessionStorage.getItem('locId') })
    this.employeesMasterForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
    this.employeesMasterForm.patchValue({ deptId: sessionStorage.getItem('deptId') });
    this.employeesMasterForm.patchValue({ tktNo: sessionStorage.getItem('tktNo') });
    this.employeesMasterForm.patchValue({ status: sessionStorage.getItem('status') });
    this.employeesMasterForm.patchValue({ divisionId: sessionStorage.getItem('divisionId') });
          this.isVisibleSearch=true;
          this.isVisibleSearchAllSsup=false;
          this.isVisibleadminloc=true;
        this.isVisibleSupAdminloc=false;
        
        }








  }


  get f() { return this.employeesMasterForm.controls; }

  employeesMaster(employeesMasterForm: any) { }



  onKey(event: any) {
    // const aaa = this.title + '. ' + this.fName + ' ' + this.mName + ' ' + this.lName;

    //  alert('On key press');
    const aaa = this.employeesMasterForm.get('title')?.value + '. ' + this.employeesMasterForm.get('fname')?.value + ' ' + this.employeesMasterForm.get('mname')?.value + ' ' + this.employeesMasterForm.get('lname')?.value;
    // var person = this.employeesMasterForm.get('custType').value;
    this.empName = aaa;
    
    this.loginName = this.employeesMasterForm.get('tktNo')?.value;
   
  }


  onOptionsSelectede(event: any) {
    this.status = this.employeesMasterForm.get('status')?.value;
    // alert(this.status);
    if (this.status === 'Inactive') {
      this.displayInactive = false;
      this.displaystartDate = false;
      this.showLoginDetails = false;
      this.endDate = new Date();
      // this.loginYN = 'N';
      this.employeesMasterForm.get('roleId')?.reset();
      this.employeesMasterForm.get('password')?.reset();
    
    }
    else if (this.status === 'Active') {
      this.employeesMasterForm.get('endDate')?.reset();
    }
  }

  ticketNoFind(tickeNo:any) {
    // alert(tickeNo)
    this.displayButton = false;
    this.displayStatus = false;
    this.displaystartDate = false;
    // this.employeesMasterForm.get('locId').disable();
    // this.employeesMasterForm.get('deptId').disable();
    this.employeesMasterForm.get('tktNo')?.disable();
    this.employeesMasterForm.get('desgId')?.disable();
    this.employeesMasterForm.get('title')?.disable();
    this.employeesMasterForm.get('fname')?.disable();
    this.employeesMasterForm.get('mname')?.disable();
    this.employeesMasterForm.get('lname')?.disable();
    this.employeesMasterForm.get('contactNo')?.disable();
    this.employeesMasterForm.get('emailId')?.disable();
    this.employeesMasterForm.get('panNo')?.disable();
    this.employeesMasterForm.get('startDt')?.disable();
    this.employeesMasterForm.get('tanNo')?.disable();
    this.service.ticketNoFindFN(sessionStorage.getItem('ouId'),tickeNo)
      .subscribe(
        (data:any) => {
          if (data.code == 200) {
            this.employeesMasterForm.patchValue(data.obj);
            // alert(data.obj.startDt)
            this.employeesMasterForm.patchValue({ startDt: this.pipe.transform(data.obj.startDt, 'yyyy-MM-dd') });
            console.log(this.locIdList);
            let SelectLocCode = this.locIdList.find((locCode: any) => locCode.locId = data.obj.locId)
            console.log(this.locIdList);
            // let SelectdivCode = this.DivisionIDList.find((divCode: any) => divCode.divisionId = data.obj.divisionId)
            // console.log(SelectdivCode);
            let selectDesignation = this.DesignationList.find((desCode: any) => desCode.codeDesc = data.obj.designation)
            console.log(selectDesignation + '------ +' + Number(selectDesignation.cmntypeId));
            this.employeesMasterForm.patchValue({ desgId: selectDesignation.cmntypeId })
          }
          else {
            alert(data.message)
          }
        }

      );

  }


  findByDesCode(event:any) {
    var code = event.target.value;
    var codedesc = code.substr(code.indexOf(':') + 1, code.length).trim(code);
    // var codedesc = (codedesc1).trim();
    let selectDesignation = this.DesignationList.find((desCode: any) => desCode.codeDesc = codedesc)
    this.employeesMasterForm.patchValue({ desgId: selectDesignation.cmntypeId })
  }



  loginRights(event:any) {
    var log = event.target.value;
    var loga = this.employeesMasterForm.get('loginYN')?.value;
    if (log === 'Y') {
      this.showLoginDetails = true;
      this.loginYN = 'Y';
      this.service.teamRoleListFnd()
        .subscribe(
          (data:any) => {
            this.teamRoleList = data.obj;
          }
        );
    }
    else {
      this.showLoginDetails = false;
      this.loginYN = 'N';
      //  this.employeesMasterForm.get('roleId').reset();
      //  this.employeesMasterForm.get('teamRole').reset();
      //  this.employeesMasterForm.get('loginYN').reset();
    }
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  transData(val: any) {

    return val;
  }



  CheckDataValidations() {

    const formValue: IEmplMaster = this.employeesMasterForm.getRawValue();

    var msg1;

    if (formValue.divisionId === undefined || formValue.divisionId === null) {
      this.checkValidation = false;
      msg1 = "DIVISION: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.locId === undefined || formValue.locId === null) {
      this.checkValidation = false;
      alert("LOCATION: Should not be null....");
      return;
    }

    // alert ("Dept Id :" +formValue.deptId);
    if (formValue.deptId === undefined || formValue.deptId === null) {
      this.checkValidation = false;
      alert("DEPT: Should not be null....");
      return;
    }



    if (formValue.desgId === undefined || formValue.desgId === null) {
      this.checkValidation = false;
      alert("DESIGNATION : Should not be null....");
      return;
    }

    if (formValue.title === undefined || formValue.title === null) {
      this.checkValidation = false;
      alert("TITLE: Should not be null....");
      return;
    }


    if (formValue.fname == null || formValue.fname == undefined || formValue.fname.trim() == '') {
      this.checkValidation = false;
      alert("FIRST NAME: Should not be null....");
      return;
    }


    if (formValue.lname == null || formValue.lname == undefined || formValue.lname == '') {
      this.checkValidation = false;
      alert("LAST NAME: Shou ld not be null....");
      return;
    }

    if (formValue.empName == null || formValue.empName == undefined || formValue.empName.trim() == '') {
      this.checkValidation = false;
      alert("FULL NAME: Should not be null....");
      return;
    }


    var cDate = new Date();


    if (formValue.contactNo === undefined || formValue.contactNo === null) {
      this.checkValidation = false;
      alert("CONTACT NO1: Should not be null....");
      return;
    }



    if (formValue.emailId === undefined || formValue.emailId === null || formValue.emailId.trim() == '') {
      this.checkValidation = false;
      alert("EMAIL ID: Should not be null....");
      return;
    } else {
      if (formValue.emailId.includes('@') === false) { alert("EMAIL ID: Enter Valid Email Id...."); return; }
    }

    

    if (formValue.status === undefined || formValue.status === null) {
      this.checkValidation = false;
      alert("RECEIPT STATUS: Should not be null....");
      return;
    }


    if (formValue.loginYN === 'Y') {



      if (formValue.password === undefined || formValue.password === null || formValue.password.trim() === '') {
        this.checkValidation = false;
        alert("LOGIN PASSWORD  : Should not be null");
        return;
      }

    }

    this.checkValidation = true


  }


  panCardValidation(event:any) {
    var validdata: boolean;
    var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
    validdata = patt.test(event.target.value);
    if (validdata === false) {
      alert('Please enter valid PAN Number');
    }
  }

  newMast() {
    const formValue: IEmplMaster = this.transData(this.employeesMasterForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      // formValue.empName = this.employeesMasterForm.get('fname').value;
      // formValue.fname = this.employeesMasterForm.get('loginName').value;
      formValue.ouId = Number(sessionStorage.getItem('ouId'));
      formValue.loginName = this.employeesMasterForm.get('tktNo')?.value;
      this.service.EmployeeMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.employeesMasterForm.disable();
          this.ticketNoFind(res.obj.tktNo)
          this.displayButton = false;

          // this.employeesMasterForm.reset();
        } else {
          if (res.code === 400) {
            alert(res.message);
            // this.employeeMasterForm.reset();
          }
        }
      });
    }
  }



  updateMast() {

    const formValue: IEmplMaster = this.employeesMasterForm.getRawValue();
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      let select = this.lstcomments.find(d => d.divisionName === this.divisionName);
      console.log(select);
     this.divisionId =select.divisionId;

      this.service.UpdateEmpMasterByTktNo(formValue, formValue.tktNo).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // window.location.reload();
          this.employeesMasterForm.disable();
        } else {
          if (res.code === 400) {
            alert(res.message);
            this.employeesMasterForm.disable();
            this.employeesMasterForm.reset();
          }
        }
      });
    }
  }

 

  searchMast() {

    var searchText = this.employeesMasterForm.get('status')?.value;
    // alert(searchText);
    this.service.allEmpActiveSearch(sessionStorage.getItem('ouId'), searchText)
      .subscribe(
       ( data:any) => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          // this.displayButton=false;
        }
      );
  }

  searchMastSuper(){
    var ouId = this.employeesMasterForm.get('ouId')?.value;
   
    var locId = this.employeesMasterForm.get('locId')?.value;
    
    var deptId = this.employeesMasterForm.get('deptId')?.value;
    
    var compId = this.employeesMasterForm.get('compId')?.value;
   
    var divisionId = this.employeesMasterForm.get('divisionId')?.value;
  
    var desgId = this.employeesMasterForm.get('desgId')?.value;
   
    if (ouId === null) { ouId = '' }
    if (locId === null) { locId = '' }
    if (deptId === null) { deptId = '' }
    if (compId === null) { compId = '' }
    if (divisionId === null) { divisionId = '' }
    if (desgId === null) { desgId = '' }
    this.service.allEmpSuperAdminsearch(ouId,locId,deptId,compId,divisionId,desgId)
      .subscribe(
        (data:any) => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          // this.displayButton=false;
        }
      );
  }




  validateStartDate(stDate:any) {
    var currDate = new Date();
    var sDate = new Date(stDate);
    if (sDate > currDate) {
      alert("START DATE :" + "Should not be above Today's Date");
      this.startDt = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    }
  }

  
  exportToExcel1() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Employee Data.xlsx');
   }

}
