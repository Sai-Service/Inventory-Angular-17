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

interface bdgetMaaster {
 
  itemId:number;
  itemName:string;
  itemDesc:string;
  itemTypeId:number;
  itemType:string;
  expenseTypeId:number;
  expenseType:string;
  applicableToId:number;
  applicableTo:string;
  budgetItem:string;
  enableYN:string;
  budgetgrphdId:number;
  budgetgrphd:string;

  status:string;
  startDate:Date;
  cmntypeId:number;
  codeDesc:string;
  code:string;
}


@Component({
  selector: 'app-budget-master',
  templateUrl: './budget-master.component.html',
  styleUrl: './budget-master.component.css'
})
export class BudgetMasterComponent {
  BudgetMasterForm: FormGroup;
  itemId:number;
  itemName:string;
  itemDesc:string;
  itemTypeId:number;
  expenseTypeId:number;
  applicableToId:number;
  budgetItem:string;
  enableYN:string;
  budgetgrphdId:number;
  status:string;
  cmntypeId:number;
  budgetgrphd:string;
  expenseType:string;
  applicableTo:string;
  itemType:string;
  code:string;
  codeDesc:string;
  startDate:Date;
  allbudgetmstList:any[];
  displaystartDate=true;
  displayButton=true;
  displayStatus=true;
  pipe = new DatePipe('en-US');
  displayEndDate=true;

  public allbudgetmstSearch: any=[];
  
  public AllbdgetitemtypeList: any=[];
  
  public AllExpensetypeList: any=[];
 
  public ApplicableatoList: any=[];
 
  public budgetgrpheadList: any=[];

  isVisibleSearch:boolean=true;
  isVisibleSearchSuper:boolean=true;



  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.BudgetMasterForm = fb.group({

  itemId:[],
  itemName:[],
  itemDesc:[],
  itemTypeId:[],
  expenseTypeId:[],
  applicableToId:[],
  budgetItem:[],
  enableYN:[],
  budgetgrphdId:[],
  status:[],
  startDate:[],
  cmntypeId:[],
  codeDesc:[],
  code:[],
  budgetgrphd:[],
  expenseType:[],
  applicableTo:[],
  itemType:[],
    
    
    }) }


    
    budgetitemIdFindFN(itemId:any){
      // alert(itemId)
      this.displayButton=false;
    this.displayStatus=false;
    this.displaystartDate=false;
     
     this.BudgetMasterForm.get('startDate')?.disable();
     this.service.budgetitemIdFindFN(itemId)
   .subscribe(
     data => {
       this.BudgetMasterForm.patchValue(data.obj);
      
    //  alert(data.obj.startDate)
       this.BudgetMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });

     })}




  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayButton=true;
    this.BudgetMasterForm.patchValue({itemId:sessionStorage.getItem('itemId')})
    this.BudgetMasterForm.patchValue({itemName:sessionStorage.getItem('itemName')})
    this.BudgetMasterForm.patchValue({itemDesc:sessionStorage.getItem('itemDesc')})
    this.BudgetMasterForm.patchValue({itemTypeId:sessionStorage.getItem('itemTypeId')})
    this.BudgetMasterForm.patchValue({expenseTypeId:sessionStorage.getItem('expenseTypeId')});
    this.BudgetMasterForm.patchValue({applicableToId:sessionStorage.getItem('applicableToId')})
    this.BudgetMasterForm.patchValue({budgetItem:sessionStorage.getItem('budgetItem')})
    this.BudgetMasterForm.patchValue({enableYN:sessionStorage.getItem('enableYN')});
    this.BudgetMasterForm.patchValue({budgetgrphdId:sessionStorage.getItem('budgetgrphdId')})
    this.BudgetMasterForm.patchValue({status:sessionStorage.getItem('status')});
    this.BudgetMasterForm.patchValue({startDate:sessionStorage.getItem('startDate')});
   


    this.service.AllbdgetitemtypeList()
    .subscribe( 
      data => {
        this.AllbdgetitemtypeList = data.obj;
        console.log(this.AllbdgetitemtypeList);
      }
    );

    this.service.AllExpensetypeList()
    .subscribe(
      data => {
        this.AllExpensetypeList = data.obj;
        console.log(this.AllExpensetypeList);
      }
    );

    this.service.ApplicableatoList()
    .subscribe(
      data => {
        this.ApplicableatoList = data.obj;
        console.log(this.ApplicableatoList);
      }
    );
     

    this.service.budgetgrpheadList()
    .subscribe(
      data => {
        this.budgetgrpheadList = data.obj;
        console.log(this.budgetgrpheadList);
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
  get f() { return this.BudgetMasterForm.controls; }

  budgetMaster(BudgetMasterForm: any) { }



  resetMast() {
    window.location.reload();
  }
  
  
  closeMast() {
    this.router.navigate(['admin']);
  }
  transData(val:any) {
    return val;
  }


  newMast() { 
    const formValue: bdgetMaaster = this.transData(this.BudgetMasterForm.value);
      console.log(formValue);
      
    this.service.BudgetMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);    
        this.BudgetMasterForm.disable();
        // this.budgetitemIdFindFN(res.obj.itemId)
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
    const formValue: bdgetMaaster = this.BudgetMasterForm.getRawValue();
   
    this.service.UpdateBudgetMaster(formValue, formValue.itemId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.BudgetMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
         this.BudgetMasterForm.disable();
           this.BudgetMasterForm.reset();
        }
      }
    });
    //  }
  }
  





  searchMast() {
    this.service.allbudgetmstSearch()
      .subscribe(
        data => {
          this.allbudgetmstList = data.obj;
          console.log(this.allbudgetmstList);
        }
      );
  }



  SupersearchMast() {
    var extyId = this.BudgetMasterForm.get('expenseTypeId')?.value;
    var itemTyId = this.BudgetMasterForm.get('itemTypeId')?.value;
    var appId = this.BudgetMasterForm.get('applicableToId')?.value;
    var BudgeGId = this.BudgetMasterForm.get('budgetgrphdId')?.value;
    if (extyId === null) { extyId = '' }
    if (itemTyId === null) { itemTyId = '' }
    if (appId === null) { appId = '' }
    if (BudgeGId === null) { BudgeGId = '' }

    this.service.allbudgetmstSearchSuper(extyId,itemTyId,appId,BudgeGId)
      .subscribe(
        data => {
          this.allbudgetmstList = data.obj;
          console.log(this.allbudgetmstList);
        }
      );
  }
}

