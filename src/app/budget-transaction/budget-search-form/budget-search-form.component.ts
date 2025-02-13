import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from,Observable } from 'rxjs';
import { Url } from 'url';
import { FormsModule } from '@angular/forms';
import { BudgetTraService } from '../budget-tra.service';
import { DatePipe ,Location} from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { trim } from 'jquery';


interface budgetsearchfrom{

  budgetheaderId:number;
  cityId:number;
  companyName:string;
  divName:string;
  locName:string;
  deptName:string;
  finYear:string;
  locId:string;
  



}
@Component({
  selector: 'app-budget-search-form',
  templateUrl: './budget-search-form.component.html',
  styleUrl: './budget-search-form.component.css'
})
export class BudgetSearchFormComponent {
  budgetsrchform:FormGroup;
  budgetheaderId:number;
  cityId:number;
  companyName:string;
  divName:string;
  locName:string;
  deptName:string;
  finYear:string;
  locId:string;
  locIdList:any=[];
  divIdlist:any=[];
  opunitList:any=[];
  DepartmentList:any=[];
  FainancialyearList:any=[];
  allbudgetmstList:any=[];
  getAllOuLocationIdFn:any=[];
  public AlllocationitemList: any=[];
  public isVisibleLocList:boolean;
  public isVisibleAdmorsup:boolean;

  constructor(private fb: FormBuilder, private router: Router,router1: Router, private service:BudgetTraService ) {
    this.budgetsrchform = this.fb.group({
      budgetheaderId:[],
      cityId:[],
      companyName:[],
      divName:[],
      locName:[],
      deptName:[],
      finYear:[],
      locId:[],
     }
    )}

  ngOnInit(): void {


    if(sessionStorage.getItem('role')==='SuperAdmin'){
      this.isVisibleLocList=true;
      this.isVisibleAdmorsup=false;
     

    }
    if(sessionStorage.getItem('role')==='Admin'){
      this.isVisibleLocList=false;
      this.isVisibleAdmorsup=true;
      var cityId = sessionStorage.getItem('ouId')
      this.budgetsrchform.patchValue({cityId:cityId});
    }
    if(sessionStorage.getItem('role')==='User'){
      this.isVisibleLocList=false;
      this.isVisibleAdmorsup=true;
      this.isVisibleLocList=false;
      this.isVisibleAdmorsup=true;
      var cityId = sessionStorage.getItem('ouId')
      this.budgetsrchform.patchValue({cityId:cityId});
    }

    this.service.TolocationIdList(sessionStorage.getItem('ouId')).subscribe(data => {
      this.locIdList = data.obj;
      let locCodeList = this.locIdList.filter((locId:any) => (locId.locId))
      console.log(locCodeList);
      this.locIdList=locCodeList;
  });

  this.service.ToDivisionIdList().subscribe(data => {
    this.divIdlist = data.obj;
    let divCodeList = this.divIdlist.filter((cmntypeId:any) => (cmntypeId.cmntypeId))
    console.log(divCodeList);
    this.divIdlist=divCodeList;
});


this.service.opunitList().subscribe(data => {
  this.opunitList = data.obj;
  let opunitListfn = this.opunitList.filter((compId:any) => (compId.compId))
  console.log(opunitListfn);
  this.opunitList=opunitListfn;
});


this.service.DepartmentList().subscribe(data => {
  this.DepartmentList = data.obj;
  let departmentListfn = this.DepartmentList.filter((cmntypeId:any) => (cmntypeId.cmntypeId))
  console.log(departmentListfn);
  this.DepartmentList=departmentListfn;
})


this.service.FainancialyearList().subscribe(data => {
  this.FainancialyearList = data.obj;
  let FainancialyearListfn = this.FainancialyearList.filter((cmntypeId :any)=> (cmntypeId.cmntypeId))
  console.log(FainancialyearListfn);
  this.FainancialyearList=FainancialyearListfn;
})


this.service.AlllocationitemList()
  .subscribe(
    data => {
      this.AlllocationitemList = data.obj;
      console.log(this.AlllocationitemList);
    }
  );
  }

  get f() { return this.budgetsrchform.controls; }

  BudgetserchformMaster(budgetsrchform: any) { }

  transData(val:any) {
  
    return val;
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


  dataSearchSuper(){var  budgetheaderId = this.budgetsrchform.get('budgetheaderId')?.value;
    var  companyName = this.budgetsrchform.get('companyName')?.value;
    var  divName = this.budgetsrchform.get('divName')?.value;
    var  locName = this.budgetsrchform.get('locName')?.value;
    var  deptName = this.budgetsrchform.get('deptName')?.value;
    var finYear = this.budgetsrchform.get('finYear')?.value;
    const formValue = this.transData(this.budgetsrchform.value);
    console.log(formValue);
    this.service.budgetmstLikeSearchFn(formValue)
    .subscribe(
      (res: any) => {
        if (res.code==200){
          alert(res.message)
        this.allbudgetmstList = res.obj;
        
     }
      if (res.code === 400) {
        alert(res.message);
       
      }
      });}

  dataSearch(){
    var  budgetheaderId = this.budgetsrchform.get('budgetheaderId')?.value;
    var  companyName = this.budgetsrchform.get('companyName')?.value;
    var  divName = this.budgetsrchform.get('divName')?.value;
    var  locName = this.budgetsrchform.get('locName')?.value;
    var  deptName = this.budgetsrchform.get('deptName')?.value;
    var finYear = this.budgetsrchform.get('finYear')?.value;
    const formValue = this.transData(this.budgetsrchform.value);
    console.log(formValue);
    this.service.budgetmstLikeSearchFn(formValue)
    .subscribe(
      (res: any) => {
        if (res.code==200){
          alert(res.message)
        this.allbudgetmstList = res.obj;
        
     }
      if (res.code === 400) {
        alert(res.message);
       
      }
      });
  }
    // .subscribe(
    //   data => {
    //     this.allbudgetmstList = data.obj;
    //     console.log(this.allbudgetmstList);
    //     // this.displayButton=false;
    //   }
    // );
    
   
    
    Reset(){
      window.location.reload();
    }


    Close(){
      this.router.navigate(['admin']);
    }

}
