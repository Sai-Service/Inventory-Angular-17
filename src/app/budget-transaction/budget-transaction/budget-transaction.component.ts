import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { BudgetTraService } from '../budget-tra.service';
import { saveAs } from 'file-saver';
import { trim } from 'jquery';
import { formatDate } from '@angular/common';

interface budgetform{
  cityId:number;
  companyId:number;
  divisionId:number;
  locationId:number;
  deptId:number;
  finyearId:number;
  budgetTotal:number;
  actualTotal:number
  startDate:Date;
  endDate:Date;
  creationDate:Date;
  createdBy:string;
  updationDate:Date;
  updatedBy:string;
  cityName:string;
  companyName:string;
  divName:string;
  deptName:string;
  finYear:string;
  locName:string;
  budgetlineId:number;
  budgetheaderId:number;
  srlNo:number;
  buditemName:string;
  budgetAmount:number;
  actualAmount:number;
  remark:string;
  buditemName1:string;



}


@Component({
  selector: 'app-budget-transaction',
  templateUrl: './budget-transaction.component.html',
  styleUrl: './budget-transaction.component.css'
})
export class BudgetTransactionComponent {
  budgetTrns: FormGroup;
  cityId:number;
  companyId:number;
  divisionId:number;
  locationId:number;
  deptId:number;
  finyearId:number;
  budgetTotal:number;
  actualTotal:number
  startDate:Date;
  endDate:Date;
  creationDate:Date;
  createdBy:string;
  updationDate:Date;
  updatedBy:string;
  cityName:string;
  disabled:boolean=false
  companyName:string;
  divName:string;
  deptName:string;
  finYear:string;
  locName:string;

  ////////////////line///////////
  budgetlineId:number;
  budgetheaderId:number;
  srlNo:number;
  buditemName:string;
  budgetAmount:number;
  actualAmount:number;
  remark:string;

  locIdList:any=[];
  divIdlist:any=[];
  opunitList:any=[];
  DepartmentList:any=[];
  FainancialyearList:any=[];
  isVisibleLocList:boolean=true;
  isVisibleDivList:boolean=true;
  isVisibleOpunitList:boolean=true;
  isVisibleDeptList:boolean=true;
  isVisibleFynlyerList:boolean=true;
  pipe = new DatePipe('en-US');
  date = new Date()
  Date = '';
  displayButton = true;
  isVisiblebudgetaddDisable:boolean=false;
  isVisiblebudgetalineDisable:boolean=false;
  isVisiblebudgetentyDisable:Array<boolean>=[];
  isVisibleremoveRow:Array<boolean>=[];
  userList1: any[] = [];
  lastkeydown1: number = 0;
  AllbudgetitemList:any=[];
  buditemName1:string;
  AllbudgetitementyList:any=[];
  AllbudgetitementyListFN:any=[];
  isDisabled1 = false;




  constructor(private fb: FormBuilder, private router: Router,private service: BudgetTraService) {
    this.Date = formatDate( this.date, 'dd-MM-yyyy', 'en-US'); 
    this.budgetTrns = fb.group({
      cityId:[],
      companyId:[],
      divisionId:[],
      locationId:[],
      deptId:[],
      finyearId:[],
      budgetTotal:[],
      actualTotal:[],
      startDate:[],
      endDate:[],
      creationDate:[],
      createdBy:[],
      updationDate:[],
      updatedBy:[],
      cityName:[],
      companyName:[],
      divName:[],
      deptName:[],
      finYear:[],
      locName:[],
      budgetheaderId:[],
      totallines:[],

      budgetLines:this.fb.array([this.BdgetkLinesGroup()]),
    })
  }
    
  BdgetkLinesGroup() {
        return this.fb.group({
      budgetlineId:[],
      budgetheaderId:[],
      itemId:[],
      srlNo:[],
      buditemName:[],
      budgetAmount:[],
      actualAmount:[],
      remark:[],
      budgetItem:[],
      buditemName1:[],

    })
   }

   orderlineDetailsArray(): FormArray {
    return <FormArray>this.budgetTrns.get('budgetLines')
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled")
    this.isVisiblebudgetaddDisable=false;
    this.isVisiblebudgetalineDisable=false;
     this.isVisiblebudgetentyDisable[0]=true;
    //  debugger;
     this.isDisabled1=false;
  var sss =sessionStorage.getItem("ouCity");
  // alert(sss);
  this.budgetTrns.patchValue({cityName:sss});

  var Ouid =sessionStorage.getItem("ouId");
  // alert(Ouid);
  this.budgetTrns.patchValue({cityId:Ouid});

    this.service.TolocationIdList(sessionStorage.getItem('ouId')).subscribe(data => {
      this.locIdList = data.obj;
      let locCodeList = this.locIdList.filter((locId:any) => (locId.locId === Number(sessionStorage.getItem('locId')))==false)
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
  let FainancialyearListfn = this.FainancialyearList.filter((cmntypeId:any) => (cmntypeId.cmntypeId))
  console.log(FainancialyearListfn);
  this.FainancialyearList=FainancialyearListfn;
})

this.service.AllbudgetitemList()
    .subscribe(
      data => {
        this.AllbudgetitementyList=data.obj;
      }
    );
    
    
  
  }

  disableAllItem(){
  
    this.budgetTrns.get('cityName')?.disable();
    this.budgetTrns.get('budgetheaderId')?.disable();
    this.budgetTrns.get('locName')?.disable();
    this.budgetTrns.get('divName')?.disable();
    this.budgetTrns.get('companyName')?.disable();
    this.budgetTrns.get('deptName')?.disable();
    this.budgetTrns.get('finYear')?.disable();
    this.budgetTrns.get('totallines')?.disable();
    this.budgetTrns.get('budgetTotal')?.disable();
    this.budgetTrns.get('actualTotal')?.disable();
  }


  get f() { return this.budgetTrns.controls; }

  BudgetformMaster(budgetTrns: any) { }


  onlocationissueselect(event:any){
    var locName = event.target.value;
    var locNameList = this.locIdList.find((d:any) => d.locName === locName)
    console.log(locNameList);
    var locId=locNameList.locId;
    this.budgetTrns.patchValue({locationId:locNameList.locId});
   
  }

  onselectDivision(event:any){
    var codeDesc = event.target.value;
    var locNameList = this.divIdlist.find((d:any) => d.codeDesc === codeDesc)
    console.log(locNameList);
    var locId=locNameList.divisionId;
    this.budgetTrns.patchValue({divisionId:locNameList.cmntypeId});
   
  }

  onselectopunit(event:any){
    var compName = event.target.value;
    var opunitList = this.opunitList.find((d:any) => d.compName === compName)
    console.log(opunitList);
    var locId=opunitList.compId;
    this.budgetTrns.patchValue({companyId:opunitList.compId});
   
  }

  onslectlistitem(i:number,event:any){
    var buditemName1 = event.target.value; 
    // alert(buditemName1);
    var patch = this.budgetTrns.get('budgetLines')?.value;
    var itemType1 = buditemName1.substr(buditemName1.indexOf(': ') + 1, buditemName1.length);
    console.log(this.AllbudgetitementyList);
    // debugger;
    for (let k = 0; k < patch.length;k++){
      if (i != k){
        if (patch[k].buditemName === itemType1){
          alert('Same Item Present In Line no : '+ (k+1));
          this.orderlineDetailsArray().controls[i].patchValue({ buditemName:null})
          return;
        }
      }
    }
    var itemLi = this.AllbudgetitementyList.find((itemName:any) => itemName.buditemName === itemType1);

    console.log(itemLi);
    // debugger
   
    // alert(i)
    this.orderlineDetailsArray().controls[i].patchValue({ budgetlineId:itemLi.itemId,
      itemId:itemLi.itemId,
      actualAmount: itemLi.actualAmount,
      budgetItem:itemLi.budgetItem,budgetAmount:0})
   

   
  }

  onselectDepartment(event:any){
    var codeDesc = event.target.value;
    var DepartmentList = this.DepartmentList.find((d:any) => d.codeDesc === codeDesc)
    console.log(DepartmentList);
    var locId=DepartmentList.cmntypeId;
    this.budgetTrns.patchValue({deptId:DepartmentList.cmntypeId});
   
  }

  onselectFainacialyear(event:any){
    var codeDesc = event.target.value;
    var FainancialyearList = this.FainancialyearList.find((d:any) => d.codeDesc === codeDesc)
    console.log(FainancialyearList);
    var locId=FainancialyearList.cmntypeId;
    this.budgetTrns.patchValue({finyearId:FainancialyearList.cmntypeId});
  }

  addRow(i:number){
    
    this.orderlineDetailsArray().push(this.BdgetkLinesGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.budgetTrns.get('budgetLines') as FormArray;
    this.isVisiblebudgetentyDisable[i]=true;
    (patch.controls[len-1]).patchValue(
      {
        srlNo:len, 
      }
    );
    this.isVisiblebudgetentyDisable[len-1]=false;
    this.isVisibleremoveRow[len-1]=true;
    this.budgetTrns.patchValue({totallines:len})
  }


  RemoveRow(i:number){
    this.orderlineDetailsArray().removeAt(i);
    var len = this.orderlineDetailsArray().length;
    this.budgetTrns.patchValue({totallines:len})
  }

  getUserIdsFirstWay($event:any) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.AllbudgetitemList, userId);
      }
    }
  }

  searchFromArray(arr:any, regex:any) {
    let matches :any= [], i;
    for (i = 0; i < arr.length; i++) {
    
    }
    return matches;
  }


  onSelectVendorName(event:any){
    var suppName = event.target.value;
    console.log(this.AllbudgetitemList);
    let selectedValue = this.AllbudgetitemList.find((v:any) => v.buditemName == suppName);
    console.log(selectedValue.itemId);
   this.budgetTrns.patchValue({advendId:selectedValue.itemId});
 
  }


  ProceedBudget(){
  //   var headerId = this.billRecorderForm.get('headerId').value;
  // this.displayButton = false;
  var cityId = this.budgetTrns.get('cityId')?.value;
  var compId = this.budgetTrns.get('companyId')?.value;
  var divId = this.budgetTrns.get('divisionId')?.value;
  var fyr = this.budgetTrns.get('finYear')?.value;
  var loId = this.budgetTrns.get('locationId')?.value;
  var deptId = this.budgetTrns.get('deptId')?.value;
  
    var patch = this.budgetTrns.get('budgetLines') as FormArray;
    this.orderlineDetailsArray().clear();  
      // this.displayButton = false;
      this.service.ProceedbyFindFN(cityId,compId,divId,fyr,loId)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert(data.message);
            }
            if (data.code === 200) {
              alert(data.message);
              alert(data.obj.length);
              
              let control = this.budgetTrns.get('budgetLines') as FormArray;
              for (let i = 0; i < data.obj.length; i++) {
                var BillLinesAllList1: FormGroup = this.BdgetkLinesGroup();
                control.push(BillLinesAllList1);
                this.isVisiblebudgetentyDisable[i]=true;
                // this.isVisiblebudgetentyDisable[i]=true;
                this.orderlineDetailsArray().controls[i].patchValue({itemId:data.obj[i].itemId,
                  budgetlineId:data.obj[i].budgetlineId,budgetItem:data.obj[i].budgetItem,actualAmount:data.obj[i].actualAmount,
                  buditemName:data.obj[i].buditemName,remark:data.obj[i].remark,budgetAmount:data.obj[i].budgetAmount,
                  srlNo:Number(i+1)
                })
                this.budgetTrns.patchValue({'totallines':data.obj.length})
            }
          }
          // else{
          //   this.isVisiblebudgetentyDisable[i]=true

          // }
          this.budgetTrns.patchValue(data.obj);
          
        })
        }
        transData(val:any) {
    
          return val;
       }

       newMast1() {
  
          var orderLines = this.budgetTrns.get('budgetLines')?.value;
          var orderLinesNew = this.budgetTrns.get('budgetLines') as FormArray;
          const formValue = this.transData(this.budgetTrns.value);
          // formValue.cityId = Number(sessionStorage.getItem('ouId'));
          console.log(formValue);
          this.service.BudgetrecoderSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
               alert(res.message);
              // this.budgetTrns.disable();
              this.displayButton = false;
              this.budgetheaderFN(res.obj.budgetheaderId)

            } else {
              if (res.code === 400) {
                alert(res.message);
      
              }
            }
          });
        }

        onKey(i:number){
          var arrayControlNew = this.budgetTrns.get('budgetLines') as FormArray;
          var arrayControl = arrayControlNew.getRawValue();
          var budgetAmount = arrayControl[i].budgetAmount;
          var actualTotal = arrayControl[i].actualAmount;         
              //  var budgetAmt = Math.round(((budgetAmount )+Number.EPSILON) * 100) / 100;
              //  var patch = this.budgetTrns.get('budgetLines') as FormArray;
              // //  patch.controls[i].patchValue({ budgetAmt: budgetAmt });
               this.updateTotAmtPerline(0)


        }



        updateTotAmtPerline(lineIndex:number){
          var formArr = this.budgetTrns.get('budgetLines') as FormArray;
          var formVal = formArr.getRawValue();
         var budgetAmount1 = 0;
         var actualTotal1 =0;
          for (let i = 0; i < formVal.length; i++) {
            if (formVal[i].budgetAmount == undefined || formVal[i].budgetAmount == null || formVal[i].budgetAmount == '') {
      
            } else {
              budgetAmount1 = budgetAmount1 + Number(formVal[i].budgetAmount);
            }

            if (formVal[i].actualAmount == undefined || formVal[i].actualAmount == null || formVal[i].actualAmount == '') {
      
            } else {
              actualTotal1 = actualTotal1 + Number(formVal[i].actualAmount);
            }


        }
        // alert(actualTotal1);

        this.budgetTrns.patchValue({ 'budgetTotal':budgetAmount1.toFixed(0),'actualTotal':actualTotal1.toFixed(0)});
      }


      budgetheaderFN(budgethedId:any){
        // var budgethedId = this.budgetTrns.get('budgethedId').value;
        this.displayButton = false;
        this.disableAllItem()
        this.service.budgethedidFindFN(budgethedId)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert(data.message);
            
            }
            if (data.code === 200) {
              alert(data.message);
              // alert(data.obj.length) 
              this.isVisiblebudgetaddDisable=true;
              this.isVisiblebudgetalineDisable=true;
              this.budgetTrns.disable();
              this.orderlineDetailsArray().clear();
              // this.dataDisplay = 'Data Display Sucessfully....';
              this.budgetTrns.patchValue(data.obj);
              let control = this.budgetTrns.get('budgetLines') as FormArray;
              for (let i = 0; i < data.obj.budgetLines.length; i++) {
                var BillLinesAllList1: FormGroup = this.BdgetkLinesGroup();  
                control.push(BillLinesAllList1);
                this.isVisiblebudgetentyDisable[i]=true;
                this.isVisibleremoveRow[i]=false;
                this.orderlineDetailsArray().controls[i].patchValue({
                  itemId:data.obj.budgetLines[i].itemId,
                  budgetlineId:data.obj.budgetLines[i].budgetlineId,budgetItem:data.obj.budgetLines[i].budgetItem,actualAmount:data.obj.budgetLines[i].actualAmount,
                  buditemName:data.obj.budgetLines[i].buditemName,remark:data.obj.budgetLines[i].remark,budgetAmount:data.obj.budgetLines[i].budgetAmount,
                  srlNo:Number(i+1)
                })
                this.budgetTrns.patchValue({'totallines':data.obj.budgetLines.length})
               this.isVisibleLocList=false;
               this.isVisibleDivList=false;
               this.isVisibleOpunitList=false;
               this.isVisibleDeptList=false;
               this.isVisibleFynlyerList=false;
               this.updateTotAmtPerline(0)
            }
          }
          });
      }


      Update(){
        // this.closeResetButton = false;
        // this.progress = 0;
        // this.dataDisplay = 'Order Update in progress....Do not refresh the Page';
        var orderLines1 = this.budgetTrns.get('budgetLines') as FormArray;
        var orderLines = orderLines1.getRawValue();
        console.log(orderLines); 
        let jsonData = this.budgetTrns.getRawValue();
        this.service.updateBudgetLinefn(JSON.stringify(jsonData)).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.budgetheaderFN(res.obj.budgetheaderId)
            
          }
          else{
            alert(res.message);
          }
        })


      }









  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
     //  this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
   
      this.message = "Do you want to Save the changes(Yes/No)?"

    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }


    if (msgType.includes("Update")) {
      this.message = "Do you want to Update the changes(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
  }

  executeAction() {
   
    if (this.msgType.includes("Reset")) {
      window.location.reload();
    }

    if (this.msgType.includes("Close")) {
      this.close();
    }

    if (this.msgType.includes("Save")) {
      this.newMast1();
    }

    if (this.msgType.includes("Update")) {
      this.Update();
    }

  }

  close() {
    this.router.navigate(['admin']);
  }
  
  isDisabled(index: number): boolean {
    return index % 2 === 0;
  }

}
