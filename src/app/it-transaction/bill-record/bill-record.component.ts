import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItTransService } from '../it-trans.service';
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
import { saveAs } from 'file-saver'

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


interface billsuppform {
  headerId:number;
  cityId:number;
  companyId:number;
  divisionId:number;
  divisionName:string;
  suppId:number;
  billNo:string;
  billDate:Date;
  billTypeId:number;
  warntyPeriod:string;
  approvedBy:string;
  expType:string;
  date:Date;
  serviceFrom:Date;
  serviceTo:Date;


  // totDisc:number;
  
  totDelchrgs:number;
  lineCount:number;
  qtyTotal:number;
  itemAmt:number;
  taxTotal:number;
  grandTotal:number;
  discAmt:number;
  totdiscAmt:number;
  totdelChrges:number;
  remarks:string;
  billtoAccts:Date;
  paymentMode:string;
  paidDate:Date;
  receivedBy:string;
  paymentDetails:string;
  fileName:string;
  docName:string;


  // //////////////////////////////////line ////////////////////////////////
 
  lineId:number;
  srlNo:number;
  code:number;
  vitemName:string;
  qty:number;
  unitRate:number;
  amount:number;
  locId:number;
  locName:string;
  deptId:number;
  deptName:string;
  budgetType:string;
  gstPer:string;
  gstAmt:number;
  subTotal:number;
  codeDesc:string;
 


  displayEndDate:false;
  displaystartDate:true;
  typeList:string;
  startDate:Date;


  ouCity:string;
  loginArray1:string;
  docType:string;
  attribute1:number;
  attribute2:number;
}


@Component({
  selector: 'app-bill-record',
  templateUrl: './bill-record.component.html',
  styleUrl: './bill-record.component.css'
})
export class BillRecordComponent {
  @ViewChild('suplaierBilltable1', { static: false }) suplaierBilltable1: ElementRef;
  billRecorderForm: FormGroup;
  billNo: string;
  pipe = new DatePipe('en-US');
  date = new Date();
  typeList: string;
  itemType: string;
  loginArray1: string | null;
  suppId: string;
  suppId1: string;
  cityId: number;
  companyId: number;
  warntyPeriod: string;
  divisionId: number;
  Date = '';
  billDate: string | null;
  approvedBy: string;
  expType: string;
  serviceFrom: string;
  serviceTo: string;
  headerId: string;
  public minDate = new Date();
  public maxDate = new Date();
  displayLineflowStatusCode: Array<boolean> = [];
  displayitemdesc: Array<boolean> = [];
  displayGstper: Array<boolean> = [];
  displayBillType1: Array<boolean> = [];
  displayBillType: Array<boolean> = [];
  isDisableqty: Array<boolean> = [];
  viewAllDoucmnet: any = [];
  AllBilltypeList: any = [];
  uploadDataList: any = [];
  DivisionList: any = [];
  allcitylist: any = [];
  AlldepartmentList: any = [];
  onSelectItemNameFnList: any = [];
  public AllligelentityList: any = [];
  // public AllvendornameList: any=[];
  AllvendornameList: any = [];
  isDisableLineUpdtbutton: boolean = true;
  isDisableddeletebutton: boolean = false;
  displayButton = true;
  locId: number;
  isVisibleupdateline: boolean = true;
  isVisibleupdatedata: boolean = true;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  remarks: string;
  lineCount: number;
  gstperList: any;
  qtyTotal: number;
  itemAmt: number;
  taxTotal: number;
  totdiscAmt: number;
  totdelChrges: number;
  grandTotal: number;
  itemButton1 = true;
  docType: string;
  files: string;
  createdBy: string;
  DoctypeList: any = [];
  AllpaymentmodeList: any = [];
  allbillrecordersearch: any[];
  sub: any;
  @ViewChild('fileInput') fileInput:any;
  userList1: any[] = [];
  lastkeydown1: number = 0;
  lineValidation = false;
  lastupdatedBy: string;
  sgst1:number;
  igst1:number;

  constructor(private fb: FormBuilder, private router: Router, private service: ItTransService, private router1: ActivatedRoute) {
    this.Date = formatDate(this.date, 'dd-MM-yyyy', 'en-US');
    this.billRecorderForm = fb.group({
      billNo: [],
      typeList: [],
      loginArray1: [],
      suppId: [],
      suppId1: [],
      cityId: [],
      companyId: [],
      warntyPeriod: [],
      divisionId: [],
      billDate: [],
      approvedBy: [],
      expType: [],
      serviceFrom: [],
      serviceTo: [],
      headerId: [],
      remarks: [],
      lineCount: [0],
      qtyTotal: [0],
      itemAmt: [0],
      taxTotal: [0],
      totdiscAmt: [0],
      totdelChrges: [0],
      grandTotal: [0],
      docType: [],
      docName: [],
      files: [],
      billtoAccts: [],
      paymentMode: [],
      paidDate: [],
      receivedBy: [],
      taxType: [],
      createdBy: [],
      lastupdatedBy: [],
      billLines: this.fb.array([this.billLinesGroup(),

      ]),
    })
  }

  billLinesGroup() {
    return this.fb.group({
      srlNo: [{ value: '', disabled: true }],
      code: [],
      linestatus: [],
      qty: [0],
      itemId: [],
      expenseTypeId: [],
      itemTypeId: [],
      vitemName: [],
      unitRate: [0],
      amount: [0],
      locId: [],
      cityId: [],
      locName: [],
      deptId: [],
      deptName: [],
      budgetType: [{ value: '', disabled: true }],
      gstPer: [],
      igst: [{  value: '0', disabled: true }],
      sgst: [{ value: '0', disabled: true }],
      cgst: [{  value: '0', disabled: true }],
      totDelchrgs: [0],
      lineCount: [1],
      qtyTotal: [0],
      itemAmt: [0],
      taxTotal: [0],
      grandTotal: [0],
      billTypeId: [],
      billType: [],
      gstAmt: [{ value: '0', disabled: true }],
      subTotal: [{ value: '0', disabled: true }],
      totalAmt: [{ value: '0', disabled: true }],
      attribute1: [0],
      attribute2: [0],
      lineStatus: [],
      itemdesc: [],
      discAmt: [0],
      warntyPeriod: []

    });
  }

  

  orderlineDetailsArray(): FormArray {
    return <FormArray>this.billRecorderForm.get('billLines')
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.billRecorderForm.patchValue({ createdBy: sessionStorage.getItem('loginName') });
    this.billRecorderForm.patchValue({ lastupdatedBy: sessionStorage.getItem('loginName') })
    this.displayBillType[0] = true;
    this.displayitemdesc[0] = true;
    this.displayBillType1[0] = true;
    this.displayGstper[0] = true;
    this.isDisableqty[0] = true;
    this.locId = Number(sessionStorage.getItem('locId'));
    console.log(this.locId);
    this.billLinesGroup();

    var patch = this.billRecorderForm.get('billLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
        linestatus: 'BOOKED'
      }
    );

    this.loginArray1 = sessionStorage.getItem('ouCity');
    this.service.AllvendornameList()
      .subscribe(
        data => {
          this.AllvendornameList = data.obj;
        }
      );


    if (sessionStorage.getItem('role') === 'Admin') {
      // alert('Admin'+'-------In1')
      this.isVisibleupdateline = true;
      this.isVisibleupdatedata = true;

    }
    if (sessionStorage.getItem('role') === 'SuperAdmin') {
      // alert('Admin'+'-------In1')
      this.isVisibleupdateline = true;
      this.isVisibleupdatedata = true;

    }
    if (sessionStorage.getItem('role') === 'User') {
      //  alert('User'+'-------In1')
      this.isVisibleupdateline = false;
      this.isVisibleupdatedata = false;

    }


    this.sub = this.router1.params.subscribe(params => {
      this.headerId = params['headerId'];
      // alert(this.headerId)
    });



    this.service.AllligelentityList()
      .subscribe(
        data => {
          this.AllligelentityList = data.obj;
        }
      );

    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionList = data.obj;
        }
      );

    this.service.AllBilltypeList()
      .subscribe(
        data => {
          this.AllBilltypeList = data.obj;
          console.log(this.AllBilltypeList);
        }
      );

    this.service.getallcitylist(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.allcitylist = data.obj;
          console.log(this.allcitylist);
        }
      );

    this.service.AlldepartmentList()
      .subscribe(
        data => {
          this.AlldepartmentList = data.obj;
          console.log(this.AlldepartmentList);
        }
      );

    this.service.DoctypeList()
      .subscribe(
        data => {
          this.DoctypeList = data.obj;
          console.log(this.DoctypeList);
        }
      );

    this.service.AllpaymentmodeList()
      .subscribe(
        data => {
          this.AllpaymentmodeList = data.obj;
          console.log(this.AllpaymentmodeList);
        }
      );

    this.service.gstperList()
      .subscribe(
        data => {
          this.gstperList = data.obj;
          console.log(this.gstperList);
        }
      );

    this.sub = this.router1.params.subscribe(params => {
      this.billNo = params['transId'];
      // alert(this.billNo+'-----this.billNo')
      if (this.billNo != undefined) {
        this.billNoFindFN(this.billNo)
        this.isDisableddeletebutton = true;
        this.isDisableddeletebutton = true;
        this.displayButton = false;
        this.service.headeridFindFN(sessionStorage.getItem('city'), this.billNo)
          .subscribe(
            data => {
              this.orderlineDetailsArray().clear();
              this.billRecorderForm.patchValue(data.obj);
              this.isDisableLineUpdtbutton = false;
              let control = this.billRecorderForm.get('billLines') as FormArray;
              for (let i = 0; i < data.obj.billLines.length; i++) {
                var BillLinesAllList1: FormGroup = this.billLinesGroup();
                control.push(BillLinesAllList1);
                this.displayBillType1[i] = false;
                this.displayBillType[i] = false;
                this.displayitemdesc[i] = false;
                this.displayGstper[i] = false;
                this.isDisableqty[i] = false;

                // alert(data.obj.billLines[i].linestatus)
                if (data.obj.billLines[i].linestatus == 'BOOKED') {
                  this.displayLineflowStatusCode[i] = false;
                }
                else {
                  this.displayLineflowStatusCode[i] = true;
                }
                if (data.obj.billLines[i].linestatus == 'CANCELLED') {
                  this.displayLineflowStatusCode[i] = true;
                  this.displayBillType1[i] = false;
                  this.displayBillType[i] = false;
                  this.displayitemdesc[i] = false;
                  this.displayGstper[i] = false;
                  this.isDisableqty[i] = false;
                }
              }

              this.billRecorderForm.patchValue(data.obj);
              this.service.AllvendornameList()
                .subscribe(
                  data => {
                    this.AllvendornameList = data.obj;
                  }
                );
              console.log(this.AllvendornameList);
              let selectedValue = this.AllvendornameList.find((v: any) => v.vendorName == data.obj.suppName);
              console.log(selectedValue.vendorId);
              this.billRecorderForm.patchValue({ suppId: selectedValue.vendorId, suppId1: selectedValue.vendorName });
              this.billRecorderForm.patchValue({ serviceTo: this.pipe.transform(data.obj.serviceTo, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ billDate: this.pipe.transform(data.obj.billDate, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ billtoAccts: this.pipe.transform(data.obj.billtoAccts, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ paidDate: this.pipe.transform(data.obj.paidDate, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ serviceFrom: this.pipe.transform(data.obj.serviceFrom, 'yyyy-MM-dd') });
            })
      }
    })

      this.billRecorderForm.get('lineCount')?.disable();
      this.billRecorderForm.get('qtyTotal')?.disable();
      this.billRecorderForm.get('itemAmt')?.disable();
      this.billRecorderForm.get('taxTotal')?.disable();
      this.billRecorderForm.get('totdiscAmt')?.disable();
      this.billRecorderForm.get('totdelChrges')?.disable();
      this.billRecorderForm.get('grandTotal')?.disable();
      this.billRecorderForm.get('loginArray1')?.disable();
      this.billRecorderForm.get('cityId')?.disable();
      this.billRecorderForm.get('headerId')?.disable();
      this.billRecorderForm.get('totdiscAmt')?.disable();
      this.billRecorderForm.get('totdiscAmt')?.disable();
  }


  get f() { return this.billRecorderForm.controls; }

  billRecorder(billRecorderForm: any) { }
  
  isDisabled(index: number): boolean {
    return index % 2 === 0;
  }


  billNoFindFN(billNo: any) {
    this.closeResetButton = true;
    this.progress = 0;
    // this.dataDisplay = 'Data Searching in progress....Do not refresh the Page';
    this.isDisableddeletebutton = true;
    this.displayButton = false;

    this.billRecorderForm.patchValue({ gstPer: sessionStorage.getItem('code') });
    var patch = this.billRecorderForm.get('billLines') as FormArray;
    patch.controls[0].patchValue({ gstPer: 'code' });
    this.itemType = this.billRecorderForm.get('typeList')?.value;

    if (this.itemType == 'billNo') {
      this.service.billNoFindFN(billNo)
        .subscribe(
          data => {
            if (data.code === 400) {
              this.closeResetButton = false;
              this.progress = 0;
              this.dataDisplay = 'Bill Number Not Found ';
              return;
            }

            if (data.code === 200) {
              this.orderlineDetailsArray().clear();
              this.dataDisplay = 'Data Display Sucessfully....';
              this.billRecorderForm.patchValue(data.obj);
              this.uploadDataList = data.obj;
              console.log(this.AllBilltypeList);
              this.isDisableLineUpdtbutton = false;
              let control = this.billRecorderForm.get('billLines') as FormArray;
              for (let i = 0; i < data.obj.billLines.length; i++) {
                var BillLinesAllList1: FormGroup = this.billLinesGroup();
                control.push(BillLinesAllList1);
                this.displayBillType1[i] = false;
                this.displayBillType[i] = false;
                this.displayitemdesc[i] = false;
                this.displayGstper[i] = true;
                this.isDisableqty[i] = false;

                // alert(data.obj.billLines[i].linestatus+'-------')
                if (data.obj.billLines[i].linestatus == 'BOOKED') {
                  this.displayLineflowStatusCode[i] = false;
                }
                else {
                  this.displayLineflowStatusCode[i] = true;
                }
                if (data.obj.billLines[i].linestatus == 'CANCELLED') {
                  this.displayLineflowStatusCode[i] = true;
                  this.displayBillType1[i] = false;
                  this.displayBillType[i] = false;
                  this.displayitemdesc[i] = false;
                  this.displayGstper[i] = true;
                  this.isDisableqty[i] = false;
                }
              }
              this.billRecorderForm.patchValue(data.obj);
              var billDate1 = this.pipe.transform(data.obj.billDate, 'yyyy-MM-dd');
              this.billDate = billDate1;
              this.billRecorderForm.patchValue({ serviceFrom: this.pipe.transform(data.obj.serviceFrom, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ serviceTo: this.pipe.transform(data.obj.serviceTo, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ billtoAccts: this.pipe.transform(data.obj.billtoAccts, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ paidDate: this.pipe.transform(data.obj.paidDate, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ docName: data.obj.headerId });
              let selectedValue = this.AllvendornameList.find((v: any) => v.vendorName == data.obj.suppName);
              console.log(selectedValue);
              this.billRecorderForm.patchValue({ suppId: selectedValue.vendorId, suppId1: selectedValue.vendorName })
            }
          })
    }
    this.itemType = this.billRecorderForm.get('typeList')?.value;
    if (this.itemType == 'headerId') {
      this.closeResetButton = true;
      this.progress = 0;
      // this.dataDisplay = 'Data Searching in progress....Do not refresh the Page';
      this.isDisableddeletebutton = true;
      this.isDisableddeletebutton = true;
      this.displayButton = false;
      this.service.headeridFindFN(sessionStorage.getItem('city'), billNo)
        .subscribe(
          data => {

            if (data.code === 400) {
              // alert("This Item Code Not Found/This Asset Allready Discarded !!!");
              this.closeResetButton = false;
              this.progress = 0;
              this.dataDisplay = 'Purchase Number Not Found ';
              return;
            }

            if (data.code === 200) {
              this.orderlineDetailsArray().clear();
              this.dataDisplay = 'Data Display Sucessfully....'
              this.billRecorderForm.patchValue(data.obj);
              this.isDisableLineUpdtbutton = false;
              let control = this.billRecorderForm.get('billLines') as FormArray;
              for (let i = 0; i < data.obj.billLines.length; i++) {
                var BillLinesAllList1: FormGroup = this.billLinesGroup();
                control.push(BillLinesAllList1);
                this.displayBillType1[i] = false;
                this.displayBillType[i] = false;
                this.displayitemdesc[i] = false;
                this.displayGstper[i] = false;
                this.isDisableqty[i] = false;

                // alert(data.obj.billLines[i].linestatus)
                if (data.obj.billLines[i].linestatus == 'BOOKED') {
                  this.displayLineflowStatusCode[i] = false;
                }
                else {
                  this.displayLineflowStatusCode[i] = true;
                }
                if (data.obj.billLines[i].linestatus == 'CANCELLED') {
                  this.displayLineflowStatusCode[i] = true;
                  this.displayBillType1[i] = false;
                  this.displayBillType[i] = false;
                  this.displayitemdesc[i] = false;
                  this.displayGstper[i] = false;
                  this.isDisableqty[i] = false;
                }
              }
              this.billRecorderForm.patchValue(data.obj);
              this.billRecorderForm.patchValue({ serviceTo: this.pipe.transform(data.obj.serviceTo, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ billDate: this.pipe.transform(data.obj.billDate, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ billtoAccts: this.pipe.transform(data.obj.billtoAccts, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ paidDate: this.pipe.transform(data.obj.paidDate, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ serviceFrom: this.pipe.transform(data.obj.serviceFrom, 'yyyy-MM-dd') });
              this.billRecorderForm.patchValue({ docName: data.obj.headerId });
              let selectedValue = this.AllvendornameList.find((v: any) => v.vendorName == data.obj.suppName);
              console.log(selectedValue);
              this.billRecorderForm.patchValue({ suppId: selectedValue.vendorId, suppId1: selectedValue.vendorName })
            }
          })
    }
  }

  OnSelectTypeList(event: any) {
  }

  CheckLineValidations(i: number) {
    var prcLineArr1 = this.billRecorderForm.get('billLines')?.value;
    var lineValue1 = prcLineArr1[i].billType;
    var lineValue2 = prcLineArr1[i].locId;
    var lineValue3 = prcLineArr1[i].deptId;
    var lineValue4 = prcLineArr1[i].vitemName;
    var lineValue5 = prcLineArr1[i].warntyPeriod;
    var lineValue6 = prcLineArr1[i].gstPer;
    var lineValue7 = prcLineArr1[i].qty;
    var lineValue8 = prcLineArr1[i].unitRate;


    var j = i + 1;
    if (lineValue1 === undefined || lineValue1 === null || lineValue1 === '') {
      alert("Line-" + j + " BILL TYPE :  should not be null value");
      this.lineValidation = false;
      return;
    }
    if (lineValue2 === undefined || lineValue2 === null || lineValue2 === '') {
      alert("Line-" + j + " LOCATION NAME :  should not be null value");
      this.lineValidation = false;
      return;
    }
    if (lineValue3 === undefined || lineValue3 === null || lineValue3 === '') {
      alert("Line-" + j + "DEPARTMENT NAME :  should not be null value");
      this.lineValidation = false;
      return;
    }
    if (lineValue4 === undefined || lineValue4 === null || lineValue4 === '') {
      alert("Line-" + j + " ITEM NAME:  should not be null value");
      this.lineValidation = false;
      return;
    }
    if (lineValue5 === undefined || lineValue5 === null || lineValue5 === '') {
      alert("Line-" + j + " WARRANTY YEAR :  should not be null value");
      this.lineValidation = false;
      return;
    }

    if (lineValue6 === undefined || lineValue6 === null || lineValue6 === '') {
      alert("Line-" + j + " GST % :  should not be null value");
      this.lineValidation = false;
      return;
    }
    if (lineValue7 === undefined || lineValue7 === null) {
      alert("Line-" + j + " Item Quntity :  should not be null value");
      this.lineValidation = false;
      return;
    }
    if (lineValue8 === undefined || lineValue8 === null) {
      alert("Line-" + j + "UNIT RATE :  should not be null value");
      this.lineValidation = false;
      return;
    }


    this.lineValidation = true;
  }

  addRow(i: number) {
    this.CheckLineValidations(i)
    if (this.lineValidation == true) {
      this.displayGstper[i] = false;
      this.isDisableqty[i] = true;
      this.displayBillType[i] = false;
      this.displayitemdesc[i] = false;
      this.displayLineflowStatusCode[i] = true;

      this.orderlineDetailsArray().push(this.billLinesGroup());
      var len = this.orderlineDetailsArray().length;

      var patch = this.billRecorderForm.get('billLines') as FormArray;

      (patch.controls[len - 1]).patchValue(
        {
          srlNo: len,
          linestatus: 'BOOKED'
        }
      );
      this.displayBillType[len - 1] = true;
      this.displayitemdesc[len - 1] = true;
      this.displayLineflowStatusCode[len - 1] = true;
      this.displayBillType1[len - 1] = true;
      this.displayGstper[len - 1] = true;
      this.isDisableqty[len - 1] = true;
    }
  }

  validat(i: number, event: any) {
    var t = event.target.value;
    var result = t.indexOf('.') >= 0
      ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 0)
      : t
    if (result !== event.target.value) {
      alert('Only allowed Number Not Decimals number')
      return false;
    }
    return;
  }


  validNumber(event: any) {

    const badKeys = ['-', '+', 'e', 'E', ','];
    if (badKeys.includes(event.key)) {
      event.preventDefault();
    }

  }


  RemoveRow(i: number) {

    this.orderlineDetailsArray().removeAt(i);
    var trxLnArr2 = this.billRecorderForm.get('billLines') as FormArray;
    var trxLnArr1 = trxLnArr2.getRawValue();
    if (trxLnArr1.length === 1) {
      alert('Not able to Delete This Line');
      return;
    }
    this.orderlineDetailsArray().removeAt(i);
    this.updateTotAmtPerline(0);
    this.billRecorderForm.patchValue({ lineCount: 0 });
    this.billRecorderForm.patchValue({ qtyTotal: 0 });
    this.billRecorderForm.patchValue({ itemAmt: 0 });
    this.billRecorderForm.patchValue({ taxTotal: 0 });
    this.billRecorderForm.patchValue({ grandTotal: 0 });

    this.billRecorderForm.patchValue({ totdiscAmt: 0 });
    alert('Total Line Amount Is Zero...Please click on Click Final Amt Button....')
  }



  updateTotAmtPerline(lineIndex: number) {

    var formArr = this.billRecorderForm.get('billLines') as FormArray;
    var formVal = formArr.getRawValue();
    var subtotal1 = 0;
    var lineQty = 0;
    var totaLine = 0;
    var gstAmt1 = 0;
    var totAmt1 = 0;
    var totLineAmt = 0;
    var discAmt = 0;
    var discAmt1 = 0;

    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].subTotal == undefined || formVal[i].subTotal == null || formVal[i].subTotal == '') {

      } else {
        subtotal1 = subtotal1 + Number(formVal[i].subTotal);
      }
      if (formVal[i].qty == undefined || formVal[i].qty == null || formVal[i].qty == '') {

      } else {
        lineQty = lineQty + Number(formVal[i].qty);
      }
      if (formVal[i].gstAmt == undefined || formVal[i].gstAmt == null || formVal[i].gstAmt == '') {

      } else {
        gstAmt1 = gstAmt1 + Number(formVal[i].gstAmt);
      }
      if (formVal[i].totalAmt == undefined || formVal[i].totalAmt == null || formVal[i].totalAmt == '') {

      } else {
        totLineAmt = totLineAmt + Number(formVal[i].totalAmt);
      }
      if (formVal[i].discAmt == undefined || formVal[i].discAmt == null || formVal[i].discAmt == '') {

      } else {
        discAmt = discAmt + Number(formVal[i].discAmt);
      }
    }


    var gstTot = Math.round(((gstAmt1) + Number.EPSILON) * 100) / 100;
    var totAmt = Math.round(((totLineAmt) + Number.EPSILON) * 100) / 100;


    this.billRecorderForm.patchValue({ 'itemAmt': subtotal1.toFixed(0), 'grandTotal': totAmt.toFixed(0), 'lineCount': formVal.length, 'qtyTotal': lineQty, 'taxTotal': gstTot, 'totdiscAmt': discAmt.toFixed(0) });

  }

  transData(val: any) {
  
    return val;
  }


  

  LineupdateMast() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
    var orderLines = this.billRecorderForm.get('billLines')?.value;
    var orderLinesNew = this.billRecorderForm.get('billLines') as FormArray;
    const formValue = this.transData(this.billRecorderForm.value);
    const formValue1 = this.transData(this.billRecorderForm.getRawValue());
    console.log(formValue);
    // alert(this.billRecorderForm.get('headerId')?.value)
    formValue.headerId = this.billRecorderForm.get('headerId')?.value;
    this.service.UpdateBilllineRecorder(formValue1)
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.dataDisplay = ''
          this.billRecorderForm.disable();
        } else {
          if (res.code === 400) {
            alert(res.message);

          }
        }
      });
  }

  openDocument(docId: any, docType: any) {
    // alert(docType)
    var headerId = this.billRecorderForm.get('headerId')?.value;
    const fileName = 'download.pdf';
    this.service.openDocumentFn(headerId, docType)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open

      });
  }

  viewDocument() {
    var headerId = this.billRecorderForm.get('headerId')?.value;
    // alert(headerId)
    this.service.viewDocumentFn(headerId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.viewAllDoucmnet = res.obj;
        this.dataDisplay = 'File Uploaded Sucessfully....'
        this.closeResetButton = true;
      }
      else { }
    })
  }


  uploadFile(event: any) {
    var file = this.billRecorderForm.get('files')?.value;
    if (file === undefined) {
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'File Upload in progress....Do not refresh the Page'
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
    var docType = this.billRecorderForm.get('docType')?.value;

    var docName = this.billRecorderForm.get('docName')?.value;

    var loginName = sessionStorage.getItem('loginName');
    var headerId = this.billRecorderForm.get('headerId')?.value;


    this.service.UpoadDocument1(formData, file, docType, docName, loginName, headerId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);

        this.dataDisplay = 'File Uploaded Sucessfully....'
        this.closeResetButton = true;
        this.billRecorderForm.get('files')?.reset();
      }
      else {
        if (res.code === 400) {
          alert(res.message);

          this.dataDisplay = 'File Uploading Failed....'
          this.closeResetButton = true;
          this.billRecorderForm.get('files')?.reset();

        }
      }
    })


  }

  exportToExcel1() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.suplaierBilltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'SUPLAIER BILLS DATA .xlsx');
  }



  searchMast() {
    this.service.allbillrecorderList(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.allbillrecordersearch = data.obj;
          console.log(this.allbillrecordersearch);
          let selectedValue = this.AllvendornameList.find((v: any) => v.vendorName == data.obj.suppName);
          console.log(selectedValue);
          this.billRecorderForm.patchValue({ suppId: selectedValue.vendorId, suppId1: selectedValue.vendorName })
        }
      );
  }

  message: string = "confarmation!";
  msgType: string = "closeMast";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("resetMast")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("closeMast")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    if (msgType.includes("updateMast1")) {
      this.message = "Do you want to upadate this Form(Yes/No)?"
    }
    if (msgType.includes("CopyForm")) {
      this.message = "Do you want to upadate this duplicate Entry (Yes/No)?"
    }

    return;
  }
  executeAction() {


    if (this.msgType.includes("resetMast")) {
      this.resetMast();
    }
    if (this.msgType.includes("closeMast")) {
      this.router.navigate(['admin']);
    }
    if (this.msgType.includes("updateMast1")) {
      this.updateMast()
    }
    if (this.msgType.includes("newMast1")) {
      this.newMast()
    }
    if (this.msgType.includes("CopyForm")) {
      this.CopyForm()
    }
    return;
  }




  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }


  transDataHeaderUpdate(val: any) {
    return val;
  }

  updateMast() {
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
    const formValue = this.transDataHeaderUpdate(this.billRecorderForm.getRawValue());
    console.log(formValue);
    this.service.UpdateBillRecorder(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.dataDisplay = 'Bill Data Update Successfully ..'

        this.billRecorderForm.disable();

      } else {
        if (res.code === 400) {
          alert(res.message);

        }
      }
    });
  }

  public validation() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
    var billNo = this.billRecorderForm.get('billNo')?.value;
    var cityId = this.billRecorderForm.get('cityId')?.value;
    var suppId1 = this.billRecorderForm.get('suppId1')?.value;
    var companyId = this.billRecorderForm.get('companyId')?.value;
    var divisionId = this.billRecorderForm.get('divisionId')?.value;
    var billDate = this.billRecorderForm.get('billDate')?.value;
    var approvedBy = this.billRecorderForm.get('approvedBy')?.value;
    var expType = this.billRecorderForm.get('expType')?.value;
    var serviceFrom = this.billRecorderForm.get('serviceFrom')?.value;
    var serviceTo = this.billRecorderForm.get('serviceTo')?.value;

    if (billNo === undefined || billNo === null || billNo === '') {
      alert('Please Enter Bill No .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Enter Bill No .!';
      return;
    }

    if (suppId1 === undefined || suppId1 === null || suppId1 === '') {
      alert('Please Select Vendor Name.!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Vendor Name.!';
      return;
    }
    if (companyId === undefined || companyId === null || companyId === '') {
      alert('Please Select Correct Company  Name.!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Correct Company  Name.!';
      return;
    }

    if (divisionId === undefined || divisionId === null || divisionId === '') {
      alert('Please Select Division .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Division .!';
      return;
    }

    if (billDate === undefined || billDate === null || billDate === '') {
      alert('Please Select Bill Date.!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Bill Date.!';
      return;
    }
    if (approvedBy === undefined || approvedBy === null || approvedBy === '') {
      alert('Please Select Approved By Field.!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Approved By Field.!';
      return;
    }

    if (expType === undefined || expType === null || expType === '') {
      alert('Please Select Expense Type!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Expense Type.!';
      return;
    }


  }


  // newMast() {
  //   var isvaliddata1 = this.validation();
  //   // if (isvaliddata1 === false) {
  //   //   return;
  //   // }
  //   this.closeResetButton = true;
  //   this.progress = 0;
  //   this.dataDisplay = 'Bill Recorder Save is progress....Do not refresh the Page';
  //   var orderLines = this.billRecorderForm.get('billLines')?.value;
  //   var orderLinesNew = this.billRecorderForm.get('billLines') as FormArray;
  //   this.billRecorderForm.patchValue({ createdBy: sessionStorage.getItem('loginName') })
  //   const formValue:billsuppform = this.transData(this.billRecorderForm.value);
  //   formValue.cityId = Number(sessionStorage.getItem('ouId'));
  //   // formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
  //   console.log(formValue);
  //   this.service.BillrecoderSubmit(formValue).subscribe((res: any) => {
  //     if (res.code === 200) {
  //       alert(res.message);
  //       this.dataDisplay = 'Bill Recorder Save Successfully';
  //       this.billRecorderForm.disable();
  //       this.billNoFindFN(res.obj.headerId);
  //       this.billRecorderForm.patchValue({ headerId: res.obj.headerId });
  //       this.billRecorderForm.patchValue({ createdBy: sessionStorage.getItem('loginName') })
  //       this.displayButton = false;
  //     } else {
  //       if (res.code === 400) {
  //         alert(res.message);

  //       }
  //     }
  //   });
  // }



  newMast() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Bill Recorder Save is progress....Do not refresh the Page';
    var orderLines = this.billRecorderForm.get('billLines')?.value;
    var orderLinesNew = this.billRecorderForm.get('billLines') as FormArray;
    const formValue: billsuppform = this.transData(this.billRecorderForm.getRawValue());
    formValue.cityId = Number(sessionStorage.getItem('ouId'));
    formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
    console.log(formValue);
     
    this.service.BillrecoderSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.billRecorderForm.disable();
          this.billNoFindFN(res.obj.headerId);
          this.billRecorderForm.patchValue({headerId: res.obj.headerId});
          this.displayButton = false;
        } else {
          if (res.code === 400) {
            alert(res.message);
           
          }
        }
      });


    // } else { alert("Data Validation Not Sucessfull....\nPosting Not Done...") }
  }



  transDataCopy(val: any) {
   
 
     return val;
   }


  CopyForm() {
    var isvaliddata1 = this.validation();
    // if (isvaliddata1 === false) {
    //   return;
    // }
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Bill Recorder Save is progress....Do not refresh the Page';
    var orderLines = this.billRecorderForm.get('billLines')?.value;
    var orderLinesNew = this.billRecorderForm.get('billLines') as FormArray;
    this.billRecorderForm.patchValue({ createdBy: sessionStorage.getItem('loginName') })
    const formValue = this.transDataCopy(this.billRecorderForm.value);
    formValue.cityId = Number(sessionStorage.getItem('ouId'));
    // formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
    console.log(formValue);
    this.service.BillrecoderCopySubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.dataDisplay = 'Duplicate Bill Recorder Save Successfully';
        this.billRecorderForm.disable();
        this.billNoFindFN(res.obj.headerId);
        this.billRecorderForm.patchValue({ headerId: res.obj.headerId });
        this.billRecorderForm.patchValue({ createdBy: sessionStorage.getItem('loginName') })
        this.displayButton = false;
      } else {
        if (res.code === 400) {
          alert(res.message);

        }
      }
    });
  }

  onSelectItemType(event: any, i: number) {
    var itemType = event.target.value;
    // debugger;
    // alert(itemType)
    var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    var itemType12 = trim(itemType1);
    var billType = this.AllBilltypeList.find((billType: any) => billType.codeDesc === itemType);
    console.log(billType);

    var billId = itemType;

    this.orderlineDetailsArray().controls[i].patchValue({ billTypeId: itemType })
    this.service.onSelectItemNameFn(billId)
      .subscribe(
        data => {
          this.onSelectItemNameFnList = data.obj;
          console.log(this.onSelectItemNameFnList);
        }
      );

  }


  onSelectItemName(event: any, i: number) {
    var item = event.target.value;
    var itemLi = this.onSelectItemNameFnList.find((itemList: any) => itemList.codeName === item);
    console.log(itemLi);
    var budget = this.onSelectItemNameFnList.find((itemList: any) => itemList.codeName === item);
    console.log(budget);
    var patch = this.billRecorderForm.get('billLines') as FormArray;

    this.orderlineDetailsArray().controls[i].patchValue({ itemId: itemLi.itemId })
    this.orderlineDetailsArray().controls[i].patchValue({ expenseTypeId: budget.expenseTypeId })
    this.orderlineDetailsArray().controls[i].patchValue({ budgetType: budget.itemName })

  }



  onKey(i: number, event: any) {
    alert(i);
    var arrayControlNew = this.billRecorderForm.get('billLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    var pricingQty = arrayControl[i].qty;
    var rate = arrayControl[i].unitRate;
    var gstPer = arrayControl[i].gstPer;
    var addsbttl = arrayControl[i].subTotal;
    var discAmt = arrayControl[i].discAmt;
    var subTot = Math.round(((pricingQty * rate - discAmt) + Number.EPSILON) * 100) / 100;


    var todisAmt = Math.round((subTot + Number.EPSILON) * 100) / 100;
    var gstType = this.billRecorderForm.get('taxType')?.value;
    if (gstType === 'S-C-GST') {
       
      if (gstPer === '18') {
        this.sgst1 = (Math.round(((todisAmt * 9 / 100) + Number.EPSILON) * 100) / 100);
        var value = this.sgst1.toString().split(".")[1];
        if (Number(value) > 40) {
          var sgst = Math.ceil(this.sgst1);
        }
        else {
          sgst = Number(this.sgst1.toFixed(0));
        }
        console.log(value);

      }
      if (gstPer === '28') {
      this.sgst1 = Math.round(((todisAmt * 14 / 100) + Number.EPSILON) * 100) / 100;
        var value = this.sgst1.toString().split(".")[1];
        if (Number(value) > 40) {
          var sgst = Math.ceil(this.sgst1);
        }
        else {
          sgst = Number(this.sgst1.toFixed(0));
        }
        // var cgst =  Math.ceil(sgst);
      }
      if (gstPer === '0') {
        sgst = 0;
      }
    }
    if (gstType === 'IGST') {
      this.igst1 = Math.round(((todisAmt * gstPer / 100) + Number.EPSILON) * 100) / 100;
      this. igst1 = Math.ceil(this.igst1);
    }
    
  // alert(igst+'----'+sgst)

    if ( this.igst1 ===undefined){
      this.igst1 = 0;
    }
    if ( this.sgst1===undefined){
      this.sgst1 = 0;
    }


    var gstTot1 = (this.sgst1 + this.sgst1 +this. igst1);
    var gstTot = Math.ceil(gstTot1);
    var totAmt = todisAmt + gstTot;  ///subTot
    var patch = this.billRecorderForm.get('billLines') as FormArray;
    patch.controls[i].patchValue({ gstAmt: gstTot });
    patch.controls[i].patchValue({ subTotal: subTot });
    patch.controls[i].patchValue({ totalAmt: totAmt });
    patch.controls[i].patchValue({ totdiscAmt: todisAmt });
    patch.controls[i].patchValue({ sgst: this.sgst1 });
    patch.controls[i].patchValue({ cgst: this.sgst1 });
    patch.controls[i].patchValue({ igst: this.igst1 });
    this.updateTotAmtPerline(0)

  }


  updateLineOnCancel(i: number, event: any) {
    var lineStatus1 = event.target.value;
    var trxArrVal = this.billRecorderForm.get('billLines')?.value;
    var trxArr = this.billRecorderForm.get('billLines') as FormArray;

    if (lineStatus1 === 'CANCELLED') {
      trxArr.controls[i].patchValue({ 'gstPer': 0, 'qty': 0, 'unitRate': 0, 'subTotal': 0, 'gstAmt': 0, 'totalAmt': 0, 'discAmt': 0 },);  /////'qty': 0, 'rate': 0, 'subtotal': 0, 'gstAmount':0,'totalAmt':0,
    }
    this.updateTotAmtPerline(i)
  }



  getUserIdsFirstWay($event:any) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.AllvendornameList, userId);
      }
    }
  }


  searchFromArray(arr: any, regex: any) {
    let matches: any = [], i;
    for (i = 0; i < arr.length; i++) {

    }
    return matches;
  };

  onSelectVendorName(event: any) {
    var suppName = event.target.value;
    console.log(this.AllvendornameList);
    let selectedValue = this.AllvendornameList.find((v: any) => v.vendorName == suppName);
    console.log(selectedValue.vendorId);
    alert(selectedValue.vendorId);
    this.billRecorderForm.patchValue({ suppId: selectedValue.vendorId });
  }







  currentyearValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentyear = new Date().getFullYear();

    if (selectedDate.getFullYear() !== currentyear) {
      return { invalidYear: true }
    }

    return null;
  }





}

