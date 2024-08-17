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


@Component({
  selector: 'app-direct-req-form',
  templateUrl: './direct-req-form.component.html',
  styleUrl: './direct-req-form.component.css'
})
export class DirectReqFormComponent {
  directRequionForm:FormGroup;
  reqhdNo:string;
  reqhdNo1:string;
  pipe = new DatePipe('en-US');
  now=new Date();
  reqDate=this.pipe.transform(this.now,'yyyy-MM-dd')
  reqDateNew:string; 
  @ViewChild('fileInput') fileInput:any;
  reqUsername:string;
  transactionType:string;
  dept:string;
  locName:string;
  city:number;
  reqstatus:string;
  reqRemarks:string;
  finyear:string;
  admintktNo:string;
 public codeDesc:any;
  

  AllreqItemCatagList:any=[];
  onSelectItemNameFnList:any=[];
  onhandQtyList:any=[];
  requetedNameList:any=[];
  displayadstkCat:Array<boolean>=[];
  displayItemName:Array<boolean>=[];
  displayQty:Array<boolean>=[];
  displayremoveRow:Array<boolean>=[];
  public itemMap:any = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  invType: string;
  isVisibledirectRequitionSave:boolean=true;
  isVisiblestatusClose:boolean=false;
  isVisibledirectRequitionUpdate:boolean=false;
  isVisibledirectRequitionClose:boolean=false;
  displayCSVUpload=true;
  AlldivsubtypList:any=[];
  locName1:string;
  city1:string;

  constructor(private fb: FormBuilder, private router: Router, private service: AdminTransactionService,private router1: ActivatedRoute,
    private adminServiceService: AdminTransactionService) {
      this.directRequionForm = fb.group({
        reqhdNo:[],
        reqhdNo1:[],
        reqUsername:[],
        file:[],
        reqDateNew:[],
        reqDate:[],
        transactionType:[],
        dept:[],
        locName:[],
        reqstatus:[],
        city:[],
        finyear:[],
        reqRemarks:[],
        admintktNo:[],
        location:[],
        locName1:[],
        city1:[],
        reqLines: this.fb.array([this.reqitemLinesGroup()]),
      })
     }

     reqitemLinesGroup() {
      return this.fb.group({
        srlNo:[{ value: '', disabled: true }],
        divisionSubType:[],
        finyear:[{ value: '', disabled: true }],
        ticketNo:[],
        employeeName:[{ value: '', disabled: true }],
        dept:[{ value: '', disabled: true }],
        itemcat:[],
        itemName:[],
        qty:[0],
        avlQty:[{ value: '0', disabled: true }],
        issuedQty:[{ value: '0', disabled: true }],
        adminstatus:[{ value: '', disabled: true }],
        creationDate:[],

        
      })
     }

     requestlineDetailsArray(): FormArray {
      return <FormArray>this.directRequionForm.get('reqLines')
    }
  
    isDisabled(index: number): boolean {
      return index % 2 === 0;
    }
  

    disableFiled(){
      this.directRequionForm.get('transactionType')?.disable();
      this.directRequionForm.get('reqhdNo')?.disable();
      this.directRequionForm.get('reqDateNew')?.disable();
      this.directRequionForm.get('reqUsername')?.disable();
      this.directRequionForm.get('dept')?.disable();
      this.directRequionForm.get('locName1')?.disable();
      this.directRequionForm.get('city1')?.disable();
      this.directRequionForm.get('reqstatus')?.disable();
      this.directRequionForm.get('finyear')?.disable();
    }

    emplDetails(i:any,event:any){
      this.displayCSVUpload=false;
      var empName = event.target.value;
      this.adminServiceService.findByEmplName(sessionStorage.getItem('ouId'),empName)
    .subscribe(
      data => {
        var patch = this.directRequionForm.get('reqLines') as FormArray;
       (patch.controls[i]).patchValue(
      {
        employeeName: data.obj.empName,
        dept:data.obj.deptName,
        finyear:2425
      })
      }
    )
    var orderLines = this.directRequionForm.get('reqLines')?.value;
      var orderLinesNew = this.directRequionForm.get('reqLines') as FormArray;
      var divisionType = orderLines[i].divisionSubType;
    
    this.adminServiceService.checkItemdetails(empName,sessionStorage.getItem('locId'),divisionType)
      .subscribe(
        data => {
        console.log(data.obj);
        var currDate = new Date();
        var creationDate1 = data.obj[0].creationDate;
        var patch = this.directRequionForm.get('reqLines') as FormArray
      console.log(new Date(data.obj[0].creationDate));
          var lastCreationDate=new Date(data.obj[0].creationDate);
        patch.controls[i].patchValue({ creationDate: lastCreationDate+'-'+currDate});
        var mDays = this.diffDays(lastCreationDate,currDate);
        // alert(mDays)
        if (mDays <365) { 
          alert ("Already materail provided to this user within 365 days.Please Confirm!"+' '+
            data.obj[0].creationDate);
          // return;
        }
        }
      );
    }

    diffDays(dt1:any,dt2:any) {
      // debugger;
      // alert(dt1+'-----'+dt2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (2002 * 60 * 60 * 24));
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
      this.requestlineDetailsArray().controls[i].patchValue({adstkItem:itemcat.category})
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
     
      this.adminServiceService.onhandQtyFn(itemName,sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          this.onhandQtyList = data.obj;
          console.log(this.onhandQtyList);
          if (data.obj.length===0){
            alert('Selected Item Stock Not Available. Please Check.!')
          }
          else{
            var patch = this.directRequionForm.get('reqLines') as FormArray
          patch.controls[i].patchValue({ avlQty: data.obj[0].onhandqty});
        }
        }
      );
      
     }

    issueQty(i:any,event:any){
      var adstkQty = event.target.value;
      // alert(adstkQty)
      var arrayControlNew = this.directRequionForm.get('reqLines') as FormArray;
      var arrayControl = arrayControlNew.getRawValue();
      var patch = this.directRequionForm.get('reqLines') as FormArray
      console.log(arrayControl);  
      var rate = arrayControl[i].adunitRate;
      var totAmt = adstkQty*rate;
      patch.controls[i].patchValue({issuedQty:adstkQty})
      if (adstkQty > arrayControl[i].onhandQty){
        alert('You are enter more than On Hand Quantity.! please Confirm');
        return;
      }
    }

  ngOnInit(): void {
    this.displayadstkCat[0]=true;
    this.displayItemName[0]=true;
    this.displayQty[0]=true;
    this.displayremoveRow[0]=true;
    $("#wrapper").toggleClass("toggled");
    var patch = this.directRequionForm.get('reqLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
        adminstatus:'DIRECTISSUE',
        finyear:2425
      }
    );

    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    )

    
    this.service.AlldivsubtypList()
    .subscribe(
      data => {
        this.AlldivsubtypList = data.obj;
        console.log(this.AlldivsubtypList);
      }
    )


    this.directRequionForm.patchValue({transactionType:'Direct Requisition',reqUsername:sessionStorage.getItem('empName'),
    admintktNo:sessionStorage.getItem('tktNo'),dept:sessionStorage.getItem('deptName'),
    locName1:sessionStorage.getItem('locName'),city1:sessionStorage.getItem('ouName'),finyear:'24-25',
    location:sessionStorage.getItem('locId'),locName:sessionStorage.getItem('locId'),city:sessionStorage.getItem('ouId')})

    this.directRequionForm.get('transactionType')?.disable();
      this.directRequionForm.get('reqhdNo')?.disable();
      this.directRequionForm.get('reqDateNew')?.disable();
      this.directRequionForm.get('reqUsername')?.disable();
      this.directRequionForm.get('dept')?.disable();
      this.directRequionForm.get('locName1')?.disable();
      this.directRequionForm.get('city1')?.disable();
      this.directRequionForm.get('reqstatus')?.disable();
      this.directRequionForm.get('finyear')?.disable();
      this.directRequionForm.get('admintktNo')?.disable();
      this.directRequionForm.get('reqDate')?.disable();
      this.directRequionForm.get('finyear')?.disable();
    
  }

  directRequion(directRequionForm: any) { }

  addRow(i:any) {    
    this.requestlineDetailsArray().push(this.reqitemLinesGroup());
    var len = this.requestlineDetailsArray().length;
    var patch = this.directRequionForm.get('reqLines') as FormArray;
    (patch.controls[len-1]).patchValue(
      {
        srlNo:len, 
        finyear:2425,
        adminstatus:'DIRECTISSUE'
      }
    );
    this.displayadstkCat[len-1]=true;
    this.displayItemName[len-1]=true;
    this.displayQty[len-1]=true;
    this.displayremoveRow[len-1]=true;
  }
 

  RemoveRow(i:any){
    if (i === 0) {
    }
    else{
    this.requestlineDetailsArray().removeAt(i);
    var formVal = this.directRequionForm.get('reqLines')?.value;
    var formArr = this.directRequionForm.get('reqLines') as FormArray;
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
       (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.directRequionForm.invalid) {
         (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
         alert('saving PO - Validator error');
         return;
       }
       this.message = "Do you want to SAVE the changes(Yes/No)?"
 
     }
     if (msgType.includes("statusClose")) {
       (document.getElementById('statusCloseBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.directRequionForm.invalid) {
         (document.getElementById('statusCloseBtn') as HTMLInputElement).setAttribute('data-target', '');
         alert('saving PO - Validator error');
         return;
       }
       this.message = "Do you want to SAVE the changes(Yes/No)?"
 
     }
     if (msgType.includes("update")) {
      (document.getElementById('updateBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.directRequionForm.invalid) {
        (document.getElementById('updateBtn') as HTMLInputElement).setAttribute('data-target', '');
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
    // debugger;
     if (this.msgType.includes("Save")) {
       this.directReqitionSave();
     }
     if (this.msgType.includes("statusCls")) {
      this.statusClosed();
    }
    if (this.msgType.includes("update")) {
      this.updateRequition();
    }
     if (this.msgType.includes("Reset")) {
       window.location.reload();
     }
 
     if (this.msgType.includes("Close")) {
       this.close();
     }
   }


   resetMast() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }
   directReqitionSave(){
    var orderLines1 = this.directRequionForm.get('reqLines') as FormArray;
    var orderLines = orderLines1.getRawValue();
    console.log(orderLines); 
    let jsonData = this.directRequionForm.getRawValue();
    var arrayControlNew = this.directRequionForm.get('reqLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    this.adminServiceService.directRequitionFn(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // var shipNo=res.obj;
        this.directRequionForm.patchValue({reqhdNo:res.obj.reqhdNo});
        this.isVisibledirectRequitionSave=false;
        this.requitionNosearch(res.obj.reqhdNo)
        // alert(res.obj)
        // this.shipmentNosearch(res.obj)
      }
      else{
        alert(res.obj)
        this.isVisibledirectRequitionSave=true;
      }
   })
   }

   requitionNosearch(requitionNo:any){
    this.displayCSVUpload=false;
    this.adminServiceService.requitionNoFn(requitionNo)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.requestlineDetailsArray().clear();
          this.isVisibledirectRequitionSave=false;
          this.isVisiblestatusClose=true;
          this.isVisibledirectRequitionUpdate=true;
          this.isVisibledirectRequitionClose=true;
          let control = this.directRequionForm.get('reqLines') as FormArray;
          for (let i = 0; i < data.obj.reqLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.reqitemLinesGroup();
            control.push(BillLinesAllList1);
            this.displayadstkCat[i]=false;
            this.displayItemName[i]=false;
            this.displayQty[i]=false;
            this.displayremoveRow[i]=false;
          }
          if (data.obj.reqstatus==='CLOSED'){
            this.isVisibledirectRequitionSave=false;
          this.isVisiblestatusClose=false;
          this.isVisibledirectRequitionUpdate=false;
          this.isVisibledirectRequitionClose=false;
          this.directRequionForm.disable();
          }
        }
        else if (data.code==400){
          alert(data.message);
        }
        this.directRequionForm.patchValue(data.obj);
      }
    )
   }

   updateRequition(){
    var orderLines = this.directRequionForm.get('reqLines')?.value;
    var orderLinesNew = this.directRequionForm.get('reqLines') as FormArray;
    let formValue = this.directRequionForm.getRawValue();
    console.log(formValue); 
    this.adminServiceService.updateDirectRequition(formValue)
    .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // this.dataDisplay=''
          this.requitionNosearch(res.obj.reqhdNo)

          this.directRequionForm.disable();
          // this.displayButton=false;
        } else {
          if (res.code === 400) {
            alert(res.message);
            
          }
        }
      });
   }


   statusClosed(){
    var shipHeaderNo = this.directRequionForm.get('reqhdNo')?.value;
    this.service.changeStatus(shipHeaderNo).subscribe((res: any) => {
      if (res.code==200){
        alert(res.message);
        this.requitionNosearch(res.obj)
      }
      else{
        alert(res.message)
      }
    })
  }


  uploadCSVFile(event:any){
    // this.closeResetButton=false;
    // this.progress = 0;
    // this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    // this.displayButton=false;
    var file=this.fileInput.nativeElement.files[0];
     var city=sessionStorage.getItem('ouId');
    //  var reqRemarks=this.adstkPucahseFrom.get('adDept').value;
     var locId=sessionStorage.getItem('locId');
     var reqUsername=this.directRequionForm.get('reqUsername')?.value;
     var admintktNo=this.directRequionForm.get('admintktNo')?.value;
     var transactionType=this.directRequionForm.get('transactionType')?.value;
    this.adminServiceService.directRequiCsvUpl(formData,file,city,locId,reqUsername,admintktNo,transactionType).subscribe((res: any) => {  
      if (res.code === 200) {        
        alert(res.message);
        //  this.dataDisplay ='File Uploaded Sucessfully....'
        //  this.closeResetButton=true;
         this.directRequionForm.disable();
         this.directRequionForm.patchValue({reqhdNo:res.obj.reqhdNo});
        this.requitionNosearch(res.obj.reqhdNo);
       } else {
         if (res.code === 400) {
           alert('Error In File : \n' + res.message+'---'+ res.obj);
          //  this.dataDisplay ='File Uploading Failed....'
          //  this.closeResetButton=true;
         }
       }
     });
  }

}

