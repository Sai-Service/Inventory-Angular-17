import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
import { AdminTransactionService } from '../admin-transaction.service';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrl: './receipt-form.component.css'
})
export class ReceiptFormComponent {
  adminReceiptFrom:FormGroup;
  poNo:string;
  adDivision:string;
  advendId:number;
  adLoc:number;
  adDate1:string;
  adDate:string;
  adheaderId:number;
  adDept:string;
  remark:string;
  adstatus:string;
  ouCity:string;
  adouId:number;
  vendorName:string;
  adBuyer:string;
  adtktNo:string;
  advendBillno:string;
  advndBilldate:string;
  advndBilldate1:string;
  totalAmt:number;
  totalTax:number;
  locName:string;
    closeResetButton = true;
  dataDisplay: any;
progress = 0;
rcvHeaderId:number;
creationDate:string;
receiptNo:number;
shipNo:string|null;
toLocationId:number;
isVisibleReceiptSave:boolean = true;
isVisibleReceiptView:boolean =false;
stockTransNo:string;
requestedTo:string;
receiptDt:string;
stockTransDate:String;
receiptNo1:number;

  pipe = new DatePipe('en-US');
  date = new Date()
  submitted = false;
  private sub1: any;

  constructor(private fb: FormBuilder, private router: Router, private router1: ActivatedRoute,private service:AdminTransactionService) {
    this.adminReceiptFrom = fb.group({
      poNo:[],
      adDivision:[],
      advendId:[],
      receiptDt:[],
      toLocationId:[],
      adLoc:[],
      adDate1:[],
      adDate:[],
      adheaderId:[],
      adDept:[],
      adouId:[],
      ouCity:[],
      adstatus:[],
      remark:[],
      vendorName:[],
      adBuyer:[],
      adtktNo:[],
      advendBillno:[],
      advndBilldate:[],
      advndBilldate1:[],
      totalAmt:[],
      totalTax:[],
      locName:[],
      creationDate:[],
      rcvHeaderId:[],
      receiptNo:[],
      shipNo:[],
      stockTransNo:[],
      requestedTo:[],
      stockTransDate:[],
      receiptNo1:[],
      stkLines:this.fb.array([this.AdstkLinesGroup()]),
    })
   }


   orderlineDetailsArray(): FormArray {
    return <FormArray>this.adminReceiptFrom.get('stkLines')
  }

  AdstkLinesGroup() {
    return this.fb.group({
      adminStkId :[{ value: '', disabled: true }],
      adstksrNo:[{ value: '', disabled: true }],
      adstkCat :[{ value: '', disabled: true }],
      adstkItem :[{ value: '', disabled: true }],
      adunitRate :[{ value: '', disabled: true }],
      adstkQty :[{ value: '', disabled: true }],
      adstkTax:[{ value: '', disabled: true }],
      adsubTotal :[{ value: '', disabled: true }],
      addiscAmt:[{ value: '', disabled: true }],
      adtaxAmt :[{ value: '', disabled: true }],
      adtotalAmt :[{ value: '', disabled: true }],
      forloc:[{ value: '', disabled: true }],
      igst:[{ value: '', disabled: true }],
      cgst:[{ value: '', disabled: true }],
      sgst:[{ value: '', disabled: true }],
      totalAmt:[{ value: '', disabled: true }],
      totalTax:[{ value: '', disabled: true }],
      adstklinsts:[{ value: '', disabled: true }],
    })}


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    // this.adminReceiptFrom.patchValue({stockTransNo:'20241061265480069'})

    this.sub1 = this.router1.queryParams.subscribe(params => {
      // this.shipmentNumber = params.get('shipmentNumber');
      this.shipNo = this.router1.snapshot.queryParamMap.get('shipmentNumber');
      // alert(this.shipmentNumber);
      this.adminReceiptFrom.patchValue({ shipNo: this.shipNo })
      if (this.shipNo != null) {
        // this.shipmentFind(this.shipNo);
        // this.adminReceiptFrom.patchValue({ stockTransNo:'20241061265480069'  });
        // this.shipNo
        this.shipmentFind()
      }
    });
    this.disableFiled()
  }
  disableFiled(){
    this.adminReceiptFrom.get('adDivision')?.disable();
    this.adminReceiptFrom.get('adDept')?.disable();
    this.adminReceiptFrom.get('adheaderId')?.disable();
    this.adminReceiptFrom.get('adDate1')?.disable();
    this.adminReceiptFrom.get('vendorName')?.disable();
    this.adminReceiptFrom.get('ouCity')?.disable();
    this.adminReceiptFrom.get('adouId')?.disable();
    this.adminReceiptFrom.get('adstatus')?.disable();
    this.adminReceiptFrom.get('advendBillno')?.disable();
    this.adminReceiptFrom.get('advndBilldate1')?.disable();
    this.adminReceiptFrom.get('adtktNo')?.disable();
    this.adminReceiptFrom.get('adBuyer')?.disable();
    this.adminReceiptFrom.get('locName')?.disable();
    this.adminReceiptFrom.get('remark')?.disable();
    this.adminReceiptFrom.get('totalTax')?.disable();
    this.adminReceiptFrom.get('totalAmt')?.disable();
    this.adminReceiptFrom.get('rcvHeaderId')?.disable();
    this.adminReceiptFrom.get('receiptNo')?.disable();
    this.adminReceiptFrom.get('receiptDt')?.disable();
    this.adminReceiptFrom.get('toLocationId')?.disable();
    this.adminReceiptFrom.get('stockTransNo')?.disable();
    this.adminReceiptFrom.get('requestedTo')?.disable();
    this.adminReceiptFrom.get('rcvHeaderId')?.disable();
    this.adminReceiptFrom.get('rcvHeaderId')?.disable();
  }

  isDisabled(index: number): boolean {
    return index % 2 === 0;
  }

  adminReceipt(adminReceiptFrom:any) {  }

  poFind(){ 
   var poNo= this.adminReceiptFrom.get('poNo')?.value;
    this.service.adheaderIdFindReceiptFN(poNo)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.orderlineDetailsArray().clear();
          let control = this.adminReceiptFrom.get('stkLines') as FormArray;
          for (let i = 0; i < data.obj.stkLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.AdstkLinesGroup();
            control.push(BillLinesAllList1);
            this.orderlineDetailsArray().disable();
            // this.isVisibleReceiptView=true;
          }
        }
        else if (data.code==400){
          alert(data.message);
        }
        this.adminReceiptFrom.patchValue(data.obj);
        this.adminReceiptFrom.patchValue({ adDate1: this.pipe.transform(data.obj.adDate, 'dd-MM-yyyy') });
        this.adminReceiptFrom.patchValue({ advndBilldate1: this.pipe.transform(data.obj.advndBilldate, 'dd-MM-yyyy') });
        this.adminReceiptFrom.patchValue({ receiptDt: data.obj.receiptDate });
        
        if (data.obj.receiptNo==null){
          this.isVisibleReceiptSave=true;
          this.isVisibleReceiptView=false;
         
        
        }
        if (data.obj.receiptNo !=null) {
          this.isVisibleReceiptSave=false;
          this.isVisibleReceiptView=true;
         
        }
        
       
        // if (data.obj.receiptNo ="") {
        //   this.isVisibleReceiptSave=false;
        //   // this.isVisibleReceiptView=true;
        // }
      }
    )
  }


  shipmentFind(){
    // alert(poNo);
    var shipNo= this.adminReceiptFrom.get('shipNo')?.value;
    this.service.shipmentFindFN(shipNo)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.orderlineDetailsArray().clear();
          let control = this.adminReceiptFrom.get('stkLines') as FormArray;
          for (let i = 0; i < data.obj.stkLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.AdstkLinesGroup();
            control.push(BillLinesAllList1);
            this.orderlineDetailsArray().disable();
          }
        }
        else if (data.code==400){
          alert(data.message);
        }
        this.adminReceiptFrom.patchValue(data.obj);
        this.adminReceiptFrom.patchValue({ adDate1: this.pipe.transform(data.obj.adDate, 'dd-MM-yyyy') });
        this.adminReceiptFrom.patchValue({ advndBilldate1: this.pipe.transform(data.obj.advndBilldate, 'dd-MM-yyyy') });
        if (data.obj.receiptNo==null){
          this.isVisibleReceiptSave=true;
          this.isVisibleReceiptView=false;
          
        }
        if (data.obj.receiptNo !=null) {
          this.isVisibleReceiptSave=false;
          this.isVisibleReceiptView=true;
        }
        // this.adminReceiptFrom.patchValue({stockTransNo:'20241061265480069'})
      }
    )
  }


  receiptFind(){
    var receiptNo= this.adminReceiptFrom.get('receiptNo1')?.value;
    this.service.receiptNoFindFn(receiptNo)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.orderlineDetailsArray().clear();
          let control = this.adminReceiptFrom.get('stkLines') as FormArray;
          for (let i = 0; i < data.obj.stkLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.AdstkLinesGroup();
            control.push(BillLinesAllList1);
            this.isVisibleReceiptView=true;
          }
        }
        else if (data.code==400){
          alert(data.message);
        }
        this.adminReceiptFrom.patchValue(data.obj);
        this.adminReceiptFrom.patchValue({ adDate1: this.pipe.transform(data.obj.adDate, 'dd-MM-yyyy') });
        this.adminReceiptFrom.patchValue({ advndBilldate1: this.pipe.transform(data.obj.advndBilldate, 'dd-MM-yyyy') });
        // this.adminReceiptFrom.patchValue({ receiptDt: this.pipe.transform(data.obj.receiptDate, 'dd-MM-yyyy') });
        this.adminReceiptFrom.patchValue({ receiptDt: data.obj.receiptDate });
        if (data.obj.receiptNo==null){
          this.isVisibleReceiptSave=true;
          
        }
        if (data.obj.receiptNo !=null) {
          this.isVisibleReceiptSave=false;
        }
      }
    )
  }



  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.adminReceiptFrom.invalid) {
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
    // this.location.back();
    this.router.navigate(['admin']);
  }


  receiptSave(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Receipt Saving in progress....Do not refresh the Page';
    var orderLines1 = this.adminReceiptFrom.get('stkLines') as FormArray;
    var orderLines = orderLines1.getRawValue();
    console.log(orderLines); 
    let jsonData = this.adminReceiptFrom.getRawValue();
    var shipNo=this.adminReceiptFrom.get('shipNo')?.value;
    var poNo = this.adminReceiptFrom.get('poNo')?.value;
// debugger;
    if (shipNo != null ){
      jsonData.transactionType='Stock Transfer';
      // jsonData.adLoc=sessionStorage.getItem('locId');
    }
    if (poNo != null ){
    jsonData.transactionType='PO Receipt';
  }
  // return;
    this.service.updateReceiptSaveFn(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // alert(res.obj.creationDate)
        this.isVisibleReceiptSave=false;
        this.isVisibleReceiptView=true;
        this.adminReceiptFrom.patchValue({receiptNo:res.obj})
      }
      else{
        alert(res.message)
      }
    }
    )
  }


  receiptoutputView(){
    var receiptNumber = this.adminReceiptFrom.get('receiptNo')?.value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.viewGRRNrecipetFn(receiptNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
      })
   }

}
