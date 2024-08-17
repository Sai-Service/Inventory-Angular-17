import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';
import { ItTransService } from '../../it-transaction/it-trans.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-miscellaneous-trasc',
  templateUrl: './miscellaneous-trasc.component.html',
  styleUrl: './miscellaneous-trasc.component.css'
})
export class MiscellaneousTrascComponent {
  miscellaneousForm: FormGroup;
  miscNumber:string;
  miscNumber1:string;
  transactionType:string;
  transactionDate1:string;
  transactionDate:string;
  locname:string;
  ouCity:string;
  ouName:string;
  reason:string;
  lineId:number;
  headerId:number;
  itemCategory:string;
  quantity:number;
  itemName:string;
  createdBy:string;
  updatedBy:string;
  locationId:number;
  AllMiscellerTypeList:any=[];
  MiscellerList:any=[];
  AllreqItemCatagList:any=[];
  onSelectItemNameFnList:any=[];
  onhandQtyList:any=[];
  isVisibleReceiptSave:boolean=true;
  isVisibleAfterSaveAdd:boolean=true;
   
  isVisibleAfterSave: boolean=true;
  remark:string;



  public itemMap:any = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  invType: string;
  pipe = new DatePipe('en-US');
  date = new Date()

  constructor(private fb: FormBuilder, private router: Router,private router1:ActivatedRoute, private adminServiceService: AdminTransactionService,private service: ItTransService) { 
    this.miscellaneousForm = fb.group({
      miscNumber:[],
      miscNumber1:[],
      transactionType:[],
      transactionDate:[],
      transactionDate1:[],
      locname:[],
      ouCity:[],
      ouName:[],
      reason:[],
      headerId:[],
      ouId:[],
      createdBy:[],
      updatedBy:[],
      locationId:[],
      remark:[],
      missLines:this.fb.array([this.miscLinesGroup()]),
    })
  }

  miscLinesGroup() {
    return this.fb.group({
      srlNo:[{ value: '', disabled: true }],
      lineId:[{ value: '', disabled: true }],
      headerId:[],
      itemCategory:[],
      quantity:[],
      price:[],
      itemName:[],
      createdBy:[],
      updatedBy:[],
      avlQty:[{ value: '', disabled: true }],
    }
  )
  }

  miscLinesArray(): FormArray {
    return <FormArray>this.miscellaneousForm.get('missLines')
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
 

    this.miscellaneousForm.patchValue({createdBy:sessionStorage.getItem('empId'),updatedBy:sessionStorage.getItem('empId'),
    ouId:sessionStorage.getItem('ouId'),locname:sessionStorage.getItem('locName'),ouCity:sessionStorage.getItem('ouCity'),
    ouName:sessionStorage.getItem('ouName'),locationId:sessionStorage.getItem('locId')});
 
    var patch = this.miscellaneousForm.get('missLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
        createdBy:sessionStorage.getItem('empId'),updatedBy:sessionStorage.getItem('empId')
      }
    );

 
    this.adminServiceService.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
      }
    )

   
    this.adminServiceService.MiscellerList()
    .subscribe(
      data => {
        this.MiscellerList = data.obj;
      }
    )

    
    this.adminServiceService.AllMiscellerTypeList()
    .subscribe(
      data => {
        this.AllMiscellerTypeList = data.obj;
      }
    )



    this.miscellaneousForm.get('miscNumber')?.disable();
      this.miscellaneousForm.get('transactionDate1')?.disable();
      this.miscellaneousForm.get('ouCity')?.disable();
      this.miscellaneousForm.get('locname')?.disable();
      this.miscellaneousForm.get('dept')?.disable();
      this.miscellaneousForm.get('locName1')?.disable();
      this.miscellaneousForm.get('city1')?.disable();
      this.miscellaneousForm.get('reqstatus')?.disable();
      this.miscellaneousForm.get('finyear')?.disable();
      this.miscellaneousForm.get('admintktNo')?.disable();
      this.miscellaneousForm.get('reqDate')?.disable();
      this.miscellaneousForm.get('finyear')?.disable();

  }

  miscellaneous(miscellaneousForm: any) { }

  miscellaFind(miscNumber1:any){
    this.adminServiceService.miscFindFn(miscNumber1)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.miscLinesArray().clear();
          let control = this.miscellaneousForm.get('missLines') as FormArray;
          for (let i = 0; i < data.obj.missLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.miscLinesGroup();
            control.push(BillLinesAllList1);
            this.isVisibleAfterSave=false;
            this.isVisibleAfterSaveAdd=false;
            this.isVisibleReceiptSave=false;
            // this.isVisibleAfterSave[i]=false;
            this.miscellaneousForm.disable();
          }
        }
        else if (data.code==400){
          alert(data.message);
        }
        this.miscellaneousForm.patchValue(data.obj);
        
        this.miscellaneousForm.patchValue({ transactionDate1: data.obj.transactionDate});
      })
       
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
    this.miscLinesArray().controls[i].patchValue({itemCategory:itemcat.category})
    this.adminServiceService.onSelectReqItemNameFn(codeType)
    .subscribe(
      data => {
        this.onSelectItemNameFnList = data.obj;
        console.log(this.onSelectItemNameFnList);
        this.itemMap.set(itemType, data.obj);
          this.itemMap2.set(i, this.itemMap.get(itemType));
       
      }
    );
    
   }

   isDisabled(index: number): boolean {
    return index % 2 === 0;
  }

   onSelectItemName(event:any,i:any){
    var itemName = event.target.value;
    var transType = this.miscellaneousForm.get('transactionType')?.value;
    // alert(transType)
    this.adminServiceService.onhandQtyFn(itemName,sessionStorage.getItem('locId'))
    .subscribe(
      data => {
        this.onhandQtyList = data.obj;
        console.log(this.onhandQtyList);
        if (data.obj.length===0){
          if (transType ==='Miscellaneous Issue'){
          alert('Selected Item Stock Not Available. Please Check.!');
          } 
          else{
            alert('Selected Item Stock Not Available. Please Check.!');
          }
        }
        else{
          var patch = this.miscellaneousForm.get('missLines') as FormArray;
        patch.controls[i].patchValue({ avlQty: data.obj[0].onhandqty,price:data.obj[0].price});
      }
      }
    );
   }

   addRow(i:any){
    this.miscLinesArray().push(this.miscLinesGroup());
    var len = this.miscLinesArray().length;
    var patch = this.miscellaneousForm.get('missLines') as FormArray;
    (patch.controls[len-1]).patchValue(
      {
        srlNo:len, 
        createdBy:sessionStorage.getItem('empId'),
        updatedBy:sessionStorage.getItem('empId')
      }
    );
   }

   RemoveRow(i:any){
    if (i === 0) {
    }
    else{
    this.miscLinesArray().removeAt(i);
    var formVal = this.miscellaneousForm.get('missLines')?.value;
    var formArr = this.miscellaneousForm.get('missLines') as FormArray;
    for (let i = 0; i < formVal.length; i++) {
      (formArr.controls[i]).patchValue({
        lineNumber: i + 1,
      });
    }
  }
   }

   onKey(event:any,i:any){  

    var quantity = event.target.value;
  
    var arrayControlNew = this.miscellaneousForm.get('missLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    console.log(arrayControl);  
    var rate = arrayControl[i].price;
    var totAmt = quantity*rate;
    if (quantity > arrayControl[i].onhandQty){
      alert('You are enter more than On Hand Quantity.! please Confirm');
      return;
    }
    // var patch = this.stockTranferForm.get('stkLines') as FormArray;
    // patch.controls[i].patchValue({ adtotalAmt: totAmt,adstklinsts:'CLOSED' });
   }


   message: string = "Please Fix the Errors !";
   msgType: string = "Close";
   getMessage(msgType: string) {
     this.msgType = msgType;
     if (msgType.includes("Save")) {
       (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.miscellaneousForm.invalid) {
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
    this.router.navigate(['admin']);
   }

   receiptSave(){
     // this.closeResetButton = false;
    // this.progress = 0;
    // this.dataDisplay = 'Receipt Saving in progress....Do not refresh the Page';
    var orderLines1 = this.miscellaneousForm.get('missLines') as FormArray;
    var orderLines = orderLines1.getRawValue();
    console.log(orderLines); 
    var transType=this.miscellaneousForm.get('transactionType')?.value;
    let jsonData = this.miscellaneousForm.getRawValue();
    var arrayControlNew = this.miscellaneousForm.get('missLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    // debugger;
    for (let i=0;i<arrayControl.length;i++){
    if (arrayControl[i].avlQty < arrayControl[i].quantity && transType ==='Miscellaneous Issue'){
      alert('Line No'+ i+' Item Name '+ arrayControl[i].itemName + ' You are enter more than On Hand Quantity.! please Confirm');
      return;
    }
  }
    this.adminServiceService.miscellaSaveFn(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        var shipNo=res.obj;
        this.miscellaneousForm.patchValue({miscNumber:res.obj});
        alert(res.obj);
        this.miscellaFind(res.obj);
        this.miscellaneousForm.patchValue({ transactionDate1:res.obj.transactionDate});
      }
      else{
        alert(res.obj)
      }
   })
   }






  }


