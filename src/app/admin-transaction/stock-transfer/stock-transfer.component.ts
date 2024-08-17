import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import * as xlsx from 'xlsx';
import { data, trim } from 'jquery';
import { Observable } from 'rxjs';
import { TypeofExpr } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { saveAs } from 'file-saver';
import { AdminTransactionService } from '../admin-transaction.service'
import { AdminMasterService } from 'D:/Jyotik/itinventory/newe/angular/itInvenoryAndAdmin/src/app/admin-master/admin-master.service';



@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrl: './stock-transfer.component.css'
})
export class StockTransferComponent {
  stockTranferForm: FormGroup;
  ShipmentNo:string;
  transactionType:string;
  stockTransNo:string;
  stockTransDate1:string;
  stockTransDate:string;
  receiptStatus: string;
  adDept:string;
  adDivision:string;
  toLocationId:number;
  requestedTo:string;
  vendorName:string;
  adBuyer:string;
  totalTax:number;
  totalAmt:number;
  toLocation:string;
  requestedTo1:number;
  deptId:number;
  ouName:string;
  adouId:number;
  adLoc:number;


  locIdList:any=[];
  AllreqItemCatagList:any=[];
  onSelectItemNameFnList:any=[];
  onhandQtyList:any=[];
  requetedNameList:any=[];

  public itemMap:any = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  invType: string;

  // displayadstkCat:boolean = true;
  displayadstkItem: Array<boolean> = [];
  displayadstkCat:Array<boolean>=[];
  displayadstkQty:Array<boolean>=[];
  isVisibleLocList:boolean=true;
  isVisiblerequestedTo:boolean=true;
  isVisibleReceiptSave:boolean=true;


  constructor(private fb: FormBuilder, private router: Router,private router1:ActivatedRoute, private adminServiceService: AdminTransactionService,private service:AdminMasterService) {
    this.stockTranferForm = fb.group({
      ShipmentNo:[],
      transactionType:[{ value: '', disabled: true }],
      shipmentNumber:[{ value: '', disabled: true }],
      transDate:[{ value: '', disabled: true }],
      stockTransNo:[{ value: '', disabled: true }],
      stockTransDate1:[{ value: '', disabled: true }],
      stockTransDate:[{ value: '', disabled: true }],
      receiptStatus: [{ value: '', disabled: true }],
      adDept:[{ value: '', disabled: true }],
      adDivision:[{ value: '', disabled: true }],
      adouId:[{ value: '', disabled: true }],
      toLocationId:[],
      requestedTo:[],
      vendorName:[{ value: '', disabled: true }],
      adBuyer:[{ value: '', disabled: true }],
      totalTax:[{ value: '', disabled: true }],
      totalAmt:[{ value: '', disabled: true }],
      toLocation:[],
      requestedTo1:[],
      ouName:[{ value: '', disabled: true }],
      deptId:[],
      adLoc:[],
      stkLines:this.fb.array([this.AdstkLinesGroup()]),
    })
   }

   AdstkLinesGroup() {
    return this.fb.group({
      adstksrNo:[{ value: '', disabled: true }],
      adstkCat:[],
      adstkItem:[],
      onhandQty:[{ value: '', disabled: true }],
      adunitRate:[{ value: '', disabled: true }],
      adstkQty:[],
      adtotalAmt:[{ value: '', disabled: true }],
      adstklinsts:[],
    })
   }

   orderlineDetailsArray(): FormArray {
    return <FormArray>this.stockTranferForm.get('stkLines')
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.stockTranferForm.patchValue({transactionType:'Stock Transfer'});
    this.stockTranferForm.patchValue({adDept:sessionStorage.getItem('deptName'),
    deptId:sessionStorage.getItem('deptId'),adDivision:sessionStorage.getItem('divisionName'),
    divisionId:sessionStorage.getItem('divisionId'),ouName:sessionStorage.getItem('ouName'),
    ouId:sessionStorage.getItem('ouId'),adBuyer:sessionStorage.getItem('empName'),
    adouId:sessionStorage.getItem('ouId'),adLoc:sessionStorage.getItem('locId')
    });

    this.displayadstkCat[0] = true;
    this.displayadstkItem[0] = true;
    this.displayadstkQty[0]=true;

    this.adminServiceService.TolocationIdList(sessionStorage.getItem('ouId')).subscribe(data => {
      this.locIdList = data.obj;
      // let locCodeList = this.locIdList.filter((locId:any) => (locId.locId === Number(sessionStorage.getItem('locId')))==false)
      console.log(this.locIdList);
      // this.locIdList=locCodeList;
  });


    var patch = this.stockTranferForm.get('stkLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        adstksrNo: 1,
        adstklinsts:'CLOSED',
      }
    );


    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        // console.log(this.AllreqItemCatagList);
      }
    )
  }

  stockTransfer(stockTranferForm: any) { }

  shipmentNosearch(shipNo:any){
    // alert(shipNo)
    this.adminServiceService.stkFindFn(shipNo)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.orderlineDetailsArray().clear();
          this.isVisibleLocList=false;
          this.isVisiblerequestedTo=false;
          this.isVisibleReceiptSave=false;
          let control = this.stockTranferForm.get('stkLines') as FormArray;
          for (let i = 0; i < data.obj.stkLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.AdstkLinesGroup();
            control.push(BillLinesAllList1);
            this.displayadstkCat[i]=false;
            this.displayadstkItem[i]=false;
            this.displayadstkQty[i]=false;
          }
        }
        else if (data.code==400){
          alert(data.message);
        }
        this.stockTranferForm.patchValue(data.obj);
        this.stockTranferForm.disable();
        this.stockTranferForm.patchValue({toLocation:data.obj.locName})
        

      }
    )
  }

  onlocationissueselect(event:any){
    var locName = event.target.value;
  //  alert(locName)
    var locNameList = this.locIdList.find((d:any) => d.locCode === locName)
    console.log(locNameList);
    var locId=locNameList.locId;
    this.stockTranferForm.patchValue({toLocationId:locNameList.locId});
    var toLoc = this.stockTranferForm.get('toLocationId')?.value;
    this.adminServiceService.stkRequestedEmFn(sessionStorage.getItem('ouId'),toLoc,sessionStorage.getItem('deptId'),sessionStorage.getItem('role'))
    .subscribe(
      data => {
        this.requetedNameList = data.obj;
      }
    )
  }


  onOptionSelectEmpl(event:any){
    var empName = event.target.value;  
    var locNameList = this.requetedNameList.find((d :any)=> d.empName === empName)
    var emplId= locNameList.empId;
    this.stockTranferForm.patchValue({requestedTo1:emplId})
  }


 
  onSelectItemType(event:any,i:any){
    var itemType=event.target.value;
    this.invType = itemType;
    if (this.itemMap.has(itemType)) {
      var itemsList = this.itemMap.get(itemType);
      this.itemMap2.set(i, this.itemMap.get(itemType));
    } else {
    }

    this.onSelectItemNameFnList = this.itemMap.get(itemType);

    var itemType1 = (itemType.substr(itemType.indexOf(': ') + 1, itemType.length)).trim();
    var itemcat = this.AllreqItemCatagList.find((itemcat:any) => itemcat.category === itemType);
    console.log(itemcat);
    var codeType=itemcat.category
    this.orderlineDetailsArray().controls[i].patchValue({adstkItem:itemcat.category})
    this.service.onSelectReqItemNameFn(codeType)
    .subscribe(
      data => {
        this.onSelectItemNameFnList = data.obj;
        console.log(this.onSelectItemNameFnList);
        this.itemMap.set(itemType, data.obj);
          this.itemMap2.set(i, this.itemMap.get(itemType));
       
      }
    );
    
   }

   onSelectItemName(event:any,i:any){
    var itemName = event.target.value;
    // alert(itemName);
    // if (i != 0 ){
    //   var stkForArra = this.stockTranferForm.get('stkLines') as FormArray; 
    //   var stkForArra1 = stkForArra.getRawValue();
    //   for (let k=0;k < stkForArra1.length ; k++){
    //     alert(stkForArra1[k].adstkItem)
    //     if (itemName === stkForArra1[k].adstkItem){
    //       alert('Same Item Already Present in Lines.! Please Confirm & Revert the same.!');
    //       return;
    //     }
    //   }
    // }
    this.adminServiceService.onhandQtyFn1(itemName,sessionStorage.getItem('locId'))
    .subscribe(
      data => {
        this.onhandQtyList = data.obj;
        console.log(this.onhandQtyList);
        if (data.obj.length===0){
          alert('Selected Item Stock Not Available. Please Check.!')
        }
        else{
        var patch = this.stockTranferForm.get('stkLines') as FormArray;
        patch.controls[i].patchValue({ onhandQty: data.obj[0].onhandqty,adunitRate:data.obj[0].price});
      }
      }
    );
   }

   onKey(event:any,i:any){  

    var adstkQty = event.target.value;
  
    var arrayControlNew = this.stockTranferForm.get('stkLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    console.log(arrayControl);  
    var rate = arrayControl[i].adunitRate;
    var totAmt = adstkQty*rate;
    if (adstkQty > arrayControl[i].onhandQty){
      alert('You are enter more than On Hand Quantity.! please Confirm');
      return;
    }
    var patch = this.stockTranferForm.get('stkLines') as FormArray;
    patch.controls[i].patchValue({ adtotalAmt: totAmt,adstklinsts:'CLOSED' });
    this.updateLineAmt(i)
   }

   updateLineAmt(lineNo:any){
    var patch = this.stockTranferForm.get('stkLines') as FormArray;
    var formVal = patch.getRawValue();
    var adtotalAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].adtotalAmt == undefined || formVal[i].adtotalAmt == null || formVal[i].adtotalAmt == '') {

      } else {
        adtotalAmt1 = adtotalAmt1 + Number(formVal[i].adtotalAmt);
      }
    }
    this.stockTranferForm.patchValue({ 'totalAmt':adtotalAmt1.toFixed(2)})
   }

   addRow(i:number){
    this.orderlineDetailsArray().push(this.AdstkLinesGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.stockTranferForm.get('stkLines') as FormArray;
    (patch.controls[len-1]).patchValue(
      {
        adstksrNo:len, 
        adstklinsts:'CLOSED',
      }
    );
    this.displayadstkCat[len-1] = true;
    this.displayadstkItem[len-1] = true;
    this.displayadstkQty[len-1]=true;
   }

   isDisabled(index: number): boolean {
    return index % 2 === 0;
  }

   RemoveRow(i:number){
    if (i === 0) {
    }
    else{
    this.orderlineDetailsArray().removeAt(i);
    var formVal = this.stockTranferForm.get('stkLines')?.value;
    var formArr = this.stockTranferForm.get('stkLines') as FormArray;
    for (let i = 0; i < formVal.length; i++) {
      (formArr.controls[i]).patchValue({
        lineNumber: i + 1,
      });
    }
  }
   }



   message: string = "Please Fix the Errors !";
   msgType: string = "Close";
   getMessage(msgType: string) {
     this.msgType = msgType;
     if (msgType.includes("Save")) {
      //  this.submitted = true;
       (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.stockTranferForm.invalid) {
         //this.submitted = false;
         (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
         alert('saving PO - Validator error');
         return;
       }
       this.message = "Do you want to SAVE the changes(Yes/No)?"
 
     }
 
     if (msgType.includes("Reset")) {
       this.message = "Do you want to Reset the changes(Yes/No)?"
     }
 
     if (msgType.includes("Close")) {
       this.message = "Do you want to Close the Form(Yes/No)?"
     }
   }
 
 
   executeAction() {
     if (this.msgType.includes("Save")) {
       // alert('saving PO');
       this.receiptSave();
     }
 
     if (this.msgType.includes("Reset")) {
       window.location.reload();
     }
 
     if (this.msgType.includes("Close")) {
       this.close();
     }
   }
 
   close() {
    //  this.location.back();
    this.router.navigate(['admin']);
   }
 

   receiptSave(){
    // this.closeResetButton = false;
    // this.progress = 0;
    // this.dataDisplay = 'Receipt Saving in progress....Do not refresh the Page';
    var orderLines1 = this.stockTranferForm.get('stkLines') as FormArray;
    var orderLines = orderLines1.getRawValue();
    console.log(orderLines); 
    let jsonData = this.stockTranferForm.getRawValue();
    var arrayControlNew = this.stockTranferForm.get('stkLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    
    for (let i=0;i<arrayControl.length;i++){
    if ( arrayControl[i].onhandQty<arrayControl[i].adstkQty){
      alert(arrayControl[i].adstksrNo+' '+arrayControl[i].itemName+' '+'You are enter more than On Hand Quantity.! please Confirm');
      this.displayadstkCat[i]=false;
    this.displayadstkItem[i]=false;
    this.displayadstkQty[i]=false;
      return;
      
    }
  }
    this.adminServiceService.stockTransSaveFn(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        var shipNo=res.obj;
        this.stockTranferForm.patchValue({stockTransNo:res.obj});
        alert(res.obj)
        this.shipmentNosearch(res.obj);
        this.stockTranferForm.disable();
        
      }
      else{
        alert(res.obj)
      }
   })
   }

  }

