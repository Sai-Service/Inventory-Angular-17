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
import { AdminTransactionService } from '../admin-transaction.service';
// import{PurchaseComponent}from'../purchase';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



interface adstkpurFrom {
  adheaderId:number;
  advendId :number;
  advend:string;
  adDept :string;
  adDivision :string;
  adLoc :number;
  adBuyer:number;
  adDate:Date;
  adouId:number;
  adtktNo :string;
  adstatus:string;
  podocName:string; 
  files:string;
  advndBilldate1:Date;
  adLoc1:string;


}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  adstkPucahseFrom:FormGroup;
  adheaderId:number;
  advendId :number;
  advend:string;
  adheaderId1:number;
  adDept :string;
  adDivision :string;
  adLoc :number;
  adBuyer:number;
  adDate:Date;
  adouId:number;
  adtktNo :string;
  adminStkId :number;
  adstksrNo:number;
  adstkCat :string;
  adstkItem :string;
  adunitRate :number;
  adstkQty :number;
  adtaxCat :string;
  adsubTotal :number;
  addiscAmt:number;
  adtaxAmt :number;
  adtotalAmt :number;
  forloc:number;
  adstkTax:number;
  closeResetButton = true;
  dataDisplay: any;
progress = 0;
pipe = new DatePipe('en-US');
  date = new Date()
  Date = '';
  AllreqItemCatagList:any=[];
  onSelectItemNameFnList:any=[];
  displayRequItem:Array<boolean>=[];
  displayBillType1:Array<boolean>=[];
  allcitylist:any=[];
  gstperList:any;
  displayGstper:Array<boolean>=[];
  displayGstTaxType:Array<boolean>=[];
  igst:number;
  cgst:number;
  sgst:number;
  displayButton=true;
  userList1: any[] = [];
  lastkeydown1: number = 0;
  AllAdminvendornameList:any=[];
  advendBillno:string;
  advndBilldate:string|null;
  totalAmt:number;
  remark:string;
  createdBy:string;
  creationDate:Date;
  lastUpdatedBy:string;
  lastUpdationDate:Date;
  totalTax:number;
  adstatus:string;
  displayLineflowStatusCode: Array<boolean> = [];
  displayAmount:Array<boolean>=[];
  podocName:string;
  files:string;
  @ViewChild('fileInput') fileInput:any;
  isVisiblePouploaded: boolean =false;
  displayremovebutton:boolean=true;
  isVisiblePoApprove:boolean = false;
  isVisibleupdateMast1:boolean =false;
  displayCSVUpload:boolean=true;
  Linestatusist:any=[];
  isVisiblePurchaseord:boolean=false;
  adLoc1:string;
  sgst1 :number;
  igst1:number;
  advndBilldate1:Date;

  constructor(private fb: FormBuilder, private router: Router, private service: AdminTransactionService,private router1: ActivatedRoute) { 
  this.Date = formatDate( this.date, 'dd-MM-yyyy', 'en-US'); 
  this.adstkPucahseFrom = fb.group({
  adheaderId:[],
  adDept :[],
  adheaderId1:[],
  adDivision :[],
  adLoc :[],
  adBuyer:[],
  adDate:[],
  adouId:[],
  adtktNo :[],
  adtaxCat :[],
  advndBilldate:[],
  advendBillno:[],
  advendId:[],
  advend:[],
  totalAmt:[0],
  remark:[],
  createdBy:[],
  totalTax:[0],
  creationDate:[],
  lastUpdatedBy:[],
  lastUpdationDate:[],
  adstatus:[],
  podocName:[],
  files :[],
  file:[],
  advndBilldate1:[],
  adLoc1:[],

  stkLines:this.fb.array([this.AdstkLinesGroup()]),
})
}


  AdstkLinesGroup() {
    return this.fb.group({
      adminStkId :[],
      adstksrNo:[{ value: '', disabled: true }],
      adstkCat :[],
      adstkItem :[],
      adunitRate :[0],
      adstkQty :[0],
      adstkTax:[],
      adsubTotal :[{ value: '0', disabled: true }],
      addiscAmt:[0],
      adtaxAmt :[{ value: '', disabled: true }],
      sgst1:[{ value: '0', disabled: true }],
      igst1:[{ value: '0', disabled: true }],
      adtotalAmt :[{ value: '', disabled: true }],
      forloc:[],
      igst:[{ value: '0', disabled: true }],
      cgst:[{ value: '0', disabled: true }],
      sgst:[{ value: '0', disabled: true }],
      totalAmt:[{ value: '0', disabled: true }],
      totalTax:[{ value: '0', disabled: true }],
      adstklinsts:[],

    })}

  orderlineDetailsArray(): FormArray {
    return <FormArray>this.adstkPucahseFrom.get('stkLines')
  }



  get f() { return this.adstkPucahseFrom.controls; }

  adstkpurchase(adstkPucahseFrom:any) {  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayRequItem[0]=true;
    this.displayBillType1[0]=true;
    this.displayGstper[0]=true;
    this.displayGstTaxType[0]=true;
    this.displayAmount[0]=true;
    var loginName =(sessionStorage.getItem('tktNo'));
    this.adstkPucahseFrom.patchValue({adtktNo:loginName });

    var loginDiv =(sessionStorage.getItem('divisionName'));
    this.adstkPucahseFrom.patchValue({adDivision:loginDiv });

    var loginempName =(sessionStorage.getItem('empName'));
    this.adstkPucahseFrom.patchValue({adBuyer:loginempName });

    var logineptName =(sessionStorage.getItem('deptName'));
    this.adstkPucahseFrom.patchValue({adDept:logineptName });

    
    var loginouId =(sessionStorage.getItem('ouId'));
    this.adstkPucahseFrom.patchValue({adouId:loginouId,advndBilldate:new Date() });

    var loginlocId =(sessionStorage.getItem('locId'));
    this.adstkPucahseFrom.patchValue({adLoc:loginlocId });

    var loginlocname =(sessionStorage.getItem('locName'));
    this.adstkPucahseFrom.patchValue({adLoc1:loginlocname });
    
    var patch = this.adstkPucahseFrom.get('stkLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        adstksrNo: 1,
        adstklinsts:'BOOKED',
        
       
      }
    );
    var patch = this.adstkPucahseFrom.get('stkLines') as FormArray;

    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    )

    this.service.getallcitylist(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.allcitylist = data.obj;
        console.log(this.allcitylist);
      }
    );


    this.service.gstperList()
      .subscribe(
        data => {
          this.gstperList = data.obj;
          console.log(this.gstperList);
        }
      );

      this.service.adminDeptVendorListFn()
    .subscribe(
      data => {
        this.AllAdminvendornameList =data;
      }
    );
    
    
    this.service.Linestatusist()
    .subscribe(
      data => {
        this.Linestatusist = data.obj;
      }
    );

    this.disableFiled()

  }

  disableFiled(){
    this.adstkPucahseFrom.get('adheaderId')?.disable();
    this.adstkPucahseFrom.get('adBuyer')?.disable();
    this.adstkPucahseFrom.get('adtktNo')?.disable();
    this.adstkPucahseFrom.get('totalTax')?.disable();
    this.adstkPucahseFrom.get('totalAmt')?.disable();
    this.adstkPucahseFrom.get('adDivision')?.disable();
    // this.adstkPucahseFrom.get('advndBilldate1')?.disable();
    // this.adstkPucahseFrom.get('totalAmt')?.disable();
    // this.adstkPucahseFrom.get('totalAmt')?.disable();
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  



  addRow(i:number) {    
  
    this.displayRequItem[i]=false;
    this.displayBillType1[i]=false;
    this.displayGstper[i] = false;
    this.displayGstTaxType[i]=false;
    this.orderlineDetailsArray().push(this.AdstkLinesGroup());
    var len = this.orderlineDetailsArray().length;

    var patch = this.adstkPucahseFrom.get('stkLines') as FormArray;
    (patch.controls[len-1]).patchValue(
      {
        adstksrNo:len, 
        adstklinsts:'BOOKED',
      
      }
    );
    // this.displayRequDep[len-1]=true;
    this.displayRequItem[len-1]=true;
   this.displayBillType1[len-1]=true;
   this.displayGstper[len-1]=true;
   this.displayGstTaxType[len-1]=true;
    this.displayAmount[len-1]=true;
  }



  onSelectItemType(event:any,i:number){
    var itemType=event.target.value;
    var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    var itemType12=trim(itemType1);
    var itemcat = this.AllreqItemCatagList.find((itemcat:any) => itemcat.category === itemType);
    console.log(itemcat);
    var codeType=itemcat.category;

    this.orderlineDetailsArray().controls[i].patchValue({adstkItem:codeType})
    this.service.onSelectReqItemNameFn(codeType)
    .subscribe(
      data => {
        this.onSelectItemNameFnList = data.obj;
        console.log(this.onSelectItemNameFnList);
      }
    );
    
   }


   onSelectItemName(event:any,i:number){
    this.displayCSVUpload=false;
    var item=event.target.value;
    var itemLi = this.onSelectItemNameFnList.find((itemList:any) => itemList.codeName === item);
    console.log(itemLi);
    var budget = this.onSelectItemNameFnList.find((itemList:any )=> itemList.codeName === item);
    console.log(budget);
    var patch = this.adstkPucahseFrom.get('stkLines') as FormArray;
   
   }


   onKey(i:number, event:any) {  
    // alert(i)    
    var arrayControlNew = this.adstkPucahseFrom.get('stkLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    var pricingQty = arrayControl[i].adstkQty;
    var rate = arrayControl[i].adunitRate;
    var gstPer = arrayControl[i].adstkTax;
    var addsbttl = arrayControl[i].adsubTotal;
    var discAmt = arrayControl[i].addiscAmt;
    var subTot = Math.round(((pricingQty* rate-discAmt )+Number.EPSILON) * 100) / 100;
    var todisAmt =Math.round((subTot + Number.EPSILON)*100)/100;
          var gstType = this.adstkPucahseFrom.get('adtaxCat')?.value;
          if (gstType==='S-C-GST'){
            if (gstPer==='18' || gstPer===18){
              this.sgst1  = (Math.round(((todisAmt*9/100) + Number.EPSILON)*100)/100);
            }
            if (gstPer==='12' || gstPer===12){
              this.sgst1  = (Math.round(((todisAmt*6/100) + Number.EPSILON)*100)/100);
            }
            if (gstPer==='5' || gstPer===5){
              this.sgst1  = (Math.round(((todisAmt*2.5/100) + Number.EPSILON)*100)/100); 
            }
            if (gstPer === '28' || gstPer === 28){
             
              this.sgst1 = Math.round(((todisAmt*14/100) + Number.EPSILON)*100)/100;
            }
            if (gstPer==='0'){
              this.sgst1=0;
            }
          }
          if (gstType==='IGST'){
            this.igst1  = Math.round(((todisAmt*gstPer/100) + Number.EPSILON)*100)/100;
            this.igst1 = Math.ceil(this.igst1);

          }
        //   alert(this.igst1)
        //  debugger;
          if (this.igst1===undefined){
            this.igst1=0;
          }
          if (this.sgst1===undefined){
            this.sgst1=0;
          }
        
          // alert(this.sgst1+'-----'+'-----'+this.igst1)
          var gstTot1 = ( this.sgst1+ this.sgst1+this.igst1);
          // alert(gstTot1)
          var gstTot= gstTot1;
          Math.ceil(gstTot1);
          // alert(gstTot+'---gstTot')
          var totAmt=todisAmt+gstTot;  ///subTot
          var patch = this.adstkPucahseFrom.get('stkLines') as FormArray;
          patch.controls[i].patchValue({ adtaxAmt: gstTot });
          patch.controls[i].patchValue({ adsubTotal: subTot });
          patch.controls[i].patchValue({ adtotalAmt: totAmt.toFixed(2)});
          patch.controls[i].patchValue({ discAmt: todisAmt});
          patch.controls[i].patchValue({ sgst: this.sgst1});
          patch.controls[i].patchValue({ cgst: this.sgst1});
          patch.controls[i].patchValue({ igst: this.igst1});
          this.updateTotAmtPerline(0)
  }

  updateLineOnCancel(i:number,event:any){
    var lineStatus1 = event.target.value;
    var trxArrVal = this.adstkPucahseFrom.get('stkLines')?.value;
    var trxArr = this.adstkPucahseFrom.get('stkLines') as FormArray;

   if (lineStatus1 === 'CANCELLED') {
trxArr.controls[i].patchValue({ 'adstkTax': 0, 'adstkQty': 0, 'adunitRate': 0, 'igst':0, 'cgst':0,'sgst':0,'adsubTotal':0,'adtaxAmt':0,'adtotalAmt':0,'discAmt':0,'addiscAmt':0 },);  /////'qty': 0, 'rate': 0, 'subtotal': 0, 'gstAmount':0,'totalAmt':0,
  }
   this.updateTotAmtPerline(i)
}

  updateTotAmtPerline(lineIndex:any) {
    var formArr = this.adstkPucahseFrom.get('stkLines') as FormArray;
    var formVal = formArr.getRawValue();
    var adtotalAmt1 = 0;
    var adtaxAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].adtotalAmt == undefined || formVal[i].adtotalAmt == null || formVal[i].adtotalAmt == '') {

      } else {
        adtotalAmt1 = adtotalAmt1 + Number(formVal[i].adtotalAmt);
      }
      if (formVal[i].adtaxAmt == undefined || formVal[i].adtaxAmt == null || formVal[i].adtaxAmt == '') {

      } else {
        adtaxAmt1 = adtaxAmt1 + Number(formVal[i].adtaxAmt);
      }
        
    }

    this.adstkPucahseFrom.patchValue({ 'totalAmt':adtotalAmt1.toFixed(2),'totalTax':adtaxAmt1.toFixed(2)});
    // adtaxAmt1.toFixed(0)
    // adtotalAmt1.toFixed(0)
   }

  transData(val:any) {
    
    return val;
}


  newMast() {
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Bill Recorder Save is progress....Do not refresh the Page';
    var orderLines = this.adstkPucahseFrom.get('stkLines')?.value;
    var orderLinesNew = this.adstkPucahseFrom.get('stkLines') as FormArray;
    const formValue = this.transData(this.adstkPucahseFrom.value);
    formValue.transactionType='PO';
    console.log(formValue);
    let jsonData = this.adstkPucahseFrom.getRawValue();
    this.service.StckRecordedSubmit(jsonData).subscribe((res: any) => {
      if (res.code === 200) {
         alert(res.message);
        this.dataDisplay = 'Stock Added Successfully';
        this.adstkPucahseFrom.disable();
        this.adstkPucahseFrom.patchValue({adheaderId1: res.obj.adheaderId });
        this.adstkPucahseFrom.patchValue({adheaderId: res.obj.adheaderId });
        this.displayButton = false;
        this.isVisiblePoApprove=true;
        this.isVisibleupdateMast1=true;
      } else {
        if (res.code === 400) {
          alert(res.message);

        }
      }
    });
  }


  getUserIdsFirstWay($event:any) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.AllAdminvendornameList, userId);
      }
    }
  }

  searchFromArray(arr: any, regex: any) {
    let matches: any = [], i;
    for (i = 0; i < arr.length; i++) {

    }
    return matches;
  };


  onSelectVendorNameFN(event:any){
    var suppName = event.target.value;
    console.log(this.AllAdminvendornameList);
    let selectedValue = this.AllAdminvendornameList.find((v:any) => v.name == suppName);
    console.log(selectedValue.suppId);
    // alert(selectedValue.suppNo);
   this.adstkPucahseFrom.patchValue({advendId:selectedValue.suppNo});
 
  }

  purcahseorder(){
    var poord=this.adstkPucahseFrom.get('adheaderId')?.value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.purchaseorderfn(poord)
    .subscribe((data: any) => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
    })

  }

  adheaderIdFindFN(adheaderId1:any){
    this.closeResetButton = true;
    this.progress = 0;
    this.displayButton = false;
   this.displayCSVUpload=false;
   this.adstkPucahseFrom.patchValue({ adstkTax: sessionStorage.getItem('code') });
    var patch = this.adstkPucahseFrom.get('stkLines') as FormArray;
    patch.controls[0].patchValue({ adstkTax: 'code' });
      this.service.adheaderIdFindFN(adheaderId1)
        .subscribe(
          data => {
            if (data.code === 400) {
              this.closeResetButton = true;
              this.progress = 0;
              this.dataDisplay = 'Bill Number Not Found ';
              return;
            }
            if (data.code === 200) {
              this.isVisiblePouploaded=true;
              this.displayremovebutton=false;
            //  this.isVisiblePurchaseord=true;
              this.orderlineDetailsArray().clear();
              this.dataDisplay = 'Data Display Successfully....';
              this.adstkPucahseFrom.patchValue(data.obj);
              console.log(this.AllreqItemCatagList);                 /////AllreqItemCatagList
              let control = this.adstkPucahseFrom.get('stkLines') as FormArray;
              for (let i = 0; i < data.obj.stkLines.length; i++) {
                var BillLinesAllList1: FormGroup = this.AdstkLinesGroup();
                control.push(BillLinesAllList1);
                this.displayRequItem[i] = false;
                this.displayBillType1[i] = false;
                this.displayGstper[i] = false;
                
                if (data.obj.stkLines[i].adstklinsts == 'BOOKED') {
                  this.displayLineflowStatusCode[i]=false;
                  this.displayAmount[i]=false;
                  this.isVisiblePurchaseord=true;
                  
                }
                else{
                  this.displayLineflowStatusCode[i]=true; 
                }
                if (data.obj.stkLines[i].adstklinsts == 'CANCELLED') {
                  this.displayLineflowStatusCode[i]=true;
                  this.displayRequItem[i]=false;
                this.displayBillType1[i]=false;
                this.displayGstper[i]=false;
                  this.displayAmount[i]=false;
                }
                if (data.obj.stkLines[i].adstklinsts == 'CLOSED') {
                  this.displayLineflowStatusCode[i]=true;
                  this.displayRequItem[i]=false;
                this.displayBillType1[i]=false;
                this.displayGstper[i]=false;
                  this.displayAmount[i]=false;
                }
              }
              if (data.obj.adstatus == 'APPROVED') {
                this.isVisiblePoApprove=false;
                this.isVisibleupdateMast1=false;
                this.adstkPucahseFrom.disable();
                this.isVisiblePurchaseord=true;
              }
              // alert(data.obj.adstatus)
              if(data.obj.adstatus == 'Active'){
                this.isVisiblePoApprove=true;
                this.isVisibleupdateMast1=true;
                this.isVisiblePurchaseord=true;
              }
              this.adstkPucahseFrom.patchValue(data.obj);
              var billDate1 = this.pipe.transform(data.obj.advndBilldate, 'yyyy-MM-dd');
              this.advndBilldate = billDate1;
              this.adstkPucahseFrom.patchValue({ advndBilldate1: this.pipe.transform(data.obj.advndBilldate, 'yyyy-MM-dd') });
              this.adstkPucahseFrom.patchValue({ adheaderId: data.obj.adheaderId});
              this.adstkPucahseFrom.patchValue({podocName:data.obj.adheaderId});
              this.adstkPucahseFrom.patchValue({advendId:data.obj.advendId});
              this.adstkPucahseFrom.patchValue({advend:data.obj.vendorName});
              
              this.adstkPucahseFrom.disable();

              let selectedValue = this.AllAdminvendornameList.find((v:any) => v.vendorName === data.obj.vendorName);
              console.log(selectedValue);
             this.adstkPucahseFrom.patchValue({advend:selectedValue.vendorName,advendId:selectedValue.advendId});
            
            }
          }
        )
  }

  

  uploadCSVFile(event:any){
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    // this.isDisabledUpload=true;
    this.displayButton=false;
    var file=this.fileInput.nativeElement.files[0];
     var venId=this.adstkPucahseFrom.get('advendId')?.value;
     var addept=this.adstkPucahseFrom.get('adDept')?.value;
     var div=this.adstkPucahseFrom.get('adDivision')?.value;
     var locId=this.adstkPucahseFrom.get('adLoc')?.value;
     var buyer=this.adstkPucahseFrom.get('adBuyer')?.value;
     var adouid=this.adstkPucahseFrom.get('adouId')?.value;
     var tktNo=this.adstkPucahseFrom.get('adtktNo')?.value;
     var adbilno=this.adstkPucahseFrom.get('advendBillno')?.value;
     var txct=this.adstkPucahseFrom.get('adtaxCat')?.value;
     var tottax=this.adstkPucahseFrom.get('totalTax')?.value;
     var totamt=this.adstkPucahseFrom.get('totalAmt')?.value;
    this.service.PoUpoadDocument1(formData,file,venId,addept,div,locId,buyer,adouid,tktNo,adbilno,txct,tottax,totamt).subscribe((res: any) => {  
      if (res.code === 200) {        
        alert(res.message);
         this.dataDisplay ='File Uploaded Successfully....'
         this.closeResetButton=true;
         this.adstkPucahseFrom.disable();
         this.adstkPucahseFrom.patchValue({adheaderId:res.obj.adheaderId});
        this.adheaderIdFindFN(res.obj.adheaderId);
    
       } else {
         if (res.code === 400) {
           alert('Error In File : \n' + res.message+'---'+ res.obj);
           this.dataDisplay ='File Uploading Failed....'
           this.closeResetButton=true;
          //  this.isDisabledUpload=false;
          //  this.displaySalesErrorList=false
         }
       }
     });
  }


  updateMast1(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Update in progress....Do not refresh the Page';
    var orderLines1 = this.adstkPucahseFrom.get('stkLines') as FormArray;
    var orderLines = orderLines1.getRawValue();
    console.log(orderLines); 
    let jsonData = this.adstkPucahseFrom.getRawValue();
    this.service.updatePurchaseLinefn(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.closeResetButton = true;
        this.progress = 0;
        this.dataDisplay = res.message;
      }
      else{
        alert(res.message);
      }
    })
    
  }

  approvePod(){
    var poId=this.adstkPucahseFrom.get('adheaderId')?.value;
    // alert(poId)
    this.service.approvePodfn(poId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.adstkPucahseFrom.disable();
        this.AdstkLinesGroup().disable();
        this.isVisiblePoApprove=false;
        this.isVisibleupdateMast1=false;
        this.isVisiblePurchaseord=true;
      }
    })
  }
nonNegativeIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      // If the value is null or empty, don't validate it (allow required validator to handle it)
      if (value === null || value === undefined || value === '') {
        return null;
      }
  
      const num = Number(value);
  
      // Check if the number is an integer and non-negative
      if (!Number.isInteger(num) || num < 0) {
        return { nonNegativeInteger: true };
      }
  
      return null;
    };
  }


  isDisabled(index: number): boolean {
    return index % 2 === 0;
  }


  RemoveRow(i:number){
    var poLineArrray = this.adstkPucahseFrom.get('stkLines') as FormArray;
    var poLineArrrayDis = poLineArrray.getRawValue();
    if (poLineArrrayDis.length === 1){
      alert('Not Able to Delete This Line.!');
      return;
    }
    this.orderlineDetailsArray().removeAt(i);
  }

}
