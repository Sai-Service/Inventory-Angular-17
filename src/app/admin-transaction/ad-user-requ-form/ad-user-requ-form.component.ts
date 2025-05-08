import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-ad-user-requ-form',
  templateUrl: './ad-user-requ-form.component.html',
  styleUrl: './ad-user-requ-form.component.css'
})
export class AdUserRequFormComponent {
  requisisionForm:FormGroup;
  reqhdNo:string;
  loginArray1:string | null;
  // reqDate:Date;
  pipe = new DatePipe('en-US');
now=new Date();
// disabled:boolean=false;
reqDate=this.pipe.transform(this.now,'yyyy-MM-dd');
reqUsername:string;
dept:string;
loginArray:string;
admintktNo:string;
reqRemarks:string;
location:string;
city:string;
reqUsertktno:string;
itemcat:string|null;
itemName:string;
reqhdNo1:number;
lineValidation = false;
BilllineValidation=false;



Asigntolocadmin:any=[];
AllreqItemCatagList:any=[];
onhandQtyList:any=[];
onSelectItemNameFnList:any=[];
attribute1:string;
public itemMap:any = new Map<string, any[]>();
public itemMap2 = new Map<number, any[]>();
invType: string;
isVisibleUserRequitionSaveSave:boolean=true;
isVisibleUserRequitionupdate:boolean=true;
isVisibleAcceptAllLineBtn:boolean=true;
isVisibleuserRequitionDisable=true;
isVisibleuserRequitionDisable1=false;
isVisibleGetqtydisable=true;
isDisabled = false;
isButtonDisabled=true;

  constructor(private fb: FormBuilder, private router: Router, private service: AdminTransactionService,private router1: ActivatedRoute,private adminServiceService: AdminTransactionService,private location1: Location) {
    this.requisisionForm = fb.group({
      reqhdNo:[],
      loginArray1:[],
      reqDate:[],
      reqUsername:[],
      dept:[],
      loginArray:[],
      admintktNo:[],
      reqRemarks:[],
      location:[],
      city:[],
      reqhdNo1:[],
      reqUsertktno:[],
      attribute1:[],
      reqLines: this.fb.array([this.reqitemLinesGroup()]),
    })
   }

   requestlineDetailsArray(): FormArray {
    return <FormArray>this.requisisionForm.get('reqLines')
  }

  reqitemLinesGroup() {
    return this.fb.group({
      reqlnNo:[],
      reqhdNo:[],
      qty:[],
      avlQty:[],
      itemName:[],
      deptId:[],
      tktNo:[],
      itemcat:[[Validators.required,{value: 'itemcat', disabled: true}]],
      userstatus:[],
      receivedQty:[0],
      balanceQty:[0],
      
      adminstatus:[],
      issuedQty:[{ value: '', disabled: true }],
      srlNo:[{ value: '', disabled: true }],
      
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    // this.requestlineDetailsArray().disable()
    this.loginArray1 = sessionStorage.getItem('ouCity');
    var  loginArray = sessionStorage.getItem('locName');
    this.isVisibleUserRequitionupdate=false;
    this.isVisibleAcceptAllLineBtn=false;
    this.requisisionForm.patchValue({reqUsername:sessionStorage.getItem('empName'),city : Number(sessionStorage.getItem('ouId')) });
    this.requisisionForm.patchValue({dept:sessionStorage.getItem('deptName'),location:sessionStorage.getItem('locId') });
    this.requisisionForm.patchValue({loginArray:loginArray });
    this.requisisionForm.patchValue({attribute1:sessionStorage.getItem('tktNo') });
    

    var patch = this.requisisionForm.get('reqLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
        userstatus:'PENDING',
      }
    );

    this.service.Asigntolocadmin(sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
    .subscribe(
      data => {
        this.Asigntolocadmin = data.obj;
        console.log(this.Asigntolocadmin);
      }
    );
    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    );
  


    this.requisisionForm.get('loginArray1')?.disable();
    this.requisisionForm.get('city')?.disable();
    this.requisisionForm.get('location')?.disable();
    this.requisisionForm.get('reqDate')?.disable();
    this.requisisionForm.get('reqUsername')?.disable();
    this.requisisionForm.get('dept')?.disable();
    this.requisisionForm.get('loginArray')?.disable();
    this.requisisionForm.get('location')?.disable();
    this.requisisionForm.get('avlQty')?.disable();
    this.requisisionForm.get('reqhdNo')?.disable();
    
  }

  



  requisision(requisisionForm: any) { }

  ReqHedIdFindFN(reqhdNo:any){
    alert(reqhdNo)
    this.service.RequAdminFindFN(reqhdNo).subscribe(
      data => {
          this.requestlineDetailsArray().clear();
          this.requestlineDetailsArray().disable()
          this.isVisibleuserRequitionDisable=false;
          this.isVisibleUserRequitionupdate=false;
          this.isDisabled=false;
          this.isVisibleUserRequitionSaveSave=false;
          this.isVisibleuserRequitionDisable1=true;
          this.requisisionForm.get('srlNo')?.disable;
         
          this.requisisionForm.get('avlQty')?.disable;
          this.requisisionForm.get('qty')?.disable;
          this.requisisionForm.get('issuedQty')?.disable;
          this.requisisionForm.get('adminstatus')?.disable;
          this.requisisionForm.get('userstatus')?.disable
          // this.requisisionForm.patchValue(data.obj);
          let control = this.requisisionForm.get('reqLines') as FormArray;
         
          for (let i = 0; i < data.obj.reqLines.length; i++){
            var BillLinesAllList1: FormGroup = this.reqitemLinesGroup();
            control.push(BillLinesAllList1);
            if (data.obj.reqLines[i].adminstatus==='ISSUE' ){
            
              if (data.obj.reqLines[i].userstatus==='PENDING'){
                this.isVisibleUserRequitionupdate=true;
              }
          
            }

            if (data.obj.reqLines[i].adminstatus==='REJECT' ){
            
              if (data.obj.reqLines[i].userstatus==='PENDING'){
                this.isVisibleUserRequitionupdate=true;
              }
          
            }
          //   if (data.obj.reqLines[i].adminstatus !='ISSUE'){
          //     alert('Admin Status not Issue. Please Contact Your Admin Head.!');
          //     this.isVisibleUserRequitionupdate=false;
          // }
          }
          this.requisisionForm.patchValue(data.obj);
          this.requisisionForm.patchValue({reqDate: this.pipe.transform(data.obj.reqDate, 'dd-MM-yyyy') })
        }
       )
  }




  onSelectItemType(event:any,i:any){
    var itemType:any=event.target.value;
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
    this.requestlineDetailsArray().controls[i].patchValue({itemCategory:itemcat.category})
    this.service.onSelectReqItemNameFn1(codeType,sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        // if (Array.isArray(data.obj)) {   .sort((a:any, b:any) => a.name.localeCompare(b.name));
          this.onSelectItemNameFnList = data.obj;
        // } else {
        this.onSelectItemNameFnList = data.obj;
        // }
        console.log(this.onSelectItemNameFnList);
        this.itemMap.set(itemType, data.obj);
          this.itemMap2.set(i, this.itemMap.get(itemType));
       this.isButtonDisabled=false;
      }
    );
    
   }


   onSearchItemName(event: Event, index: number) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log('Search input for index', index, ':', searchValue);
  }

   onSelectItemName(event:any,i:any){
    var itemName = event.target.value; 
    this.adminServiceService.onhandQtyFn(itemName,sessionStorage.getItem('locId')) //,sessionStorage.getItem('locId')
    .subscribe(
      data => {
        this.onhandQtyList = data.obj;
        console.log(this.onhandQtyList);
        if (data.obj.length===0){
       
        }
        else{
        var patch = this.requisisionForm.get('reqLines') as FormArray;
       
      }
      var patch1 = this.requisisionForm.get('reqLines')?.value;
      var itemType1 = itemName.substr(itemName.indexOf(': ') + 1, itemName.length);
      for (let k = 0; k < patch1.length;k++){
        if (i != k){
          if (patch1[k].itemName === itemType1){
            alert('Same Item Present In Line no : '+ (k+1));
            this.requestlineDetailsArray().controls[i].patchValue({ itemName:null})
            return;
          }
        }
      }
      




      }
    );
   }

   message: string = "Please Fix the Errors !";
   msgType: string = "Close";
   getMessage(msgType: string) {
     this.msgType = msgType;
     if (msgType.includes("Save")) {
      //  this.submitted = true;
       (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.requisisionForm.invalid) {
         //this.submitted = false;
         (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
         alert('saving PO - Validator error');
         return;
       }
       this.message = "Do you want to SAVE the changes(Yes/No)?"
 
     }
     if (msgType.includes("Accept")) {
      //  this.submitted = true;
       (document.getElementById('updateBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.requisisionForm.invalid) {
         //this.submitted = false;
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
     if (this.msgType.includes("Save")) {
       // alert('saving PO');
       this.receiptSave();
     }

     if (this.msgType.includes("Accept")){
      this.LineupdateMast()
     }
 
     if (this.msgType.includes("Reset")) {
       window.location.reload();
     }
 
     if (this.msgType.includes("Close")) {
       this.close();
     }
   }
 
   close() {
     this.location1.back();
   }
 

   receiptSave(){
    // this.closeResetButton = false;
    // this.progress = 0;
    // this.dataDisplay = 'Receipt Saving in progress....Do not refresh the Page';
    this.isButtonDisabled = true;
    var orderLines1 = this.requisisionForm.get('reqLines') as FormArray;
    var orderLines = orderLines1.getRawValue();
    console.log(orderLines); 
    let jsonData = this.requisisionForm.getRawValue();
    var arrayControlNew = this.requisisionForm.get('reqLines') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
  
    this.adminServiceService.userRequitionSaveFn(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        var shipNo=res.obj;
        this.requisisionForm.patchValue({reqhdNo:res.obj.reqhdNo});
        alert(res.obj.reqhdNo)
      
        this.isVisibleUserRequitionSaveSave=false;
      }
      else{
        alert(res.obj);
        this.isVisibleUserRequitionSaveSave=true;
      }
   })
   }


   addRow(i:any) {
   
    this.requestlineDetailsArray().push(this.reqitemLinesGroup());
    var len = this.requestlineDetailsArray().length;
    var patch = this.requisisionForm.get('reqLines') as FormArray;
    (patch.controls[len-1]).patchValue(
      {
        srlNo:len,   
        userstatus:'PENDING'
      }
    );
  }



  RemoveRow(i:any){
   
    this.requestlineDetailsArray().removeAt(i);
    var trxLnArr2 = this.requisisionForm.get('reqLines') as FormArray;
    var trxLnArr1 = trxLnArr2.getRawValue();
    if (trxLnArr1.length === 1) {
      alert('Not able to Delete This Line');
      return;
    }
    this.requestlineDetailsArray().removeAt(i);
    // alert('Total Line Amount Is Zero...Please click on Click Final Amt Button....')
  }


  transData(val:any) {
    
    return val;
 }

  LineupdateMast() { 
    var reqheaderNo = this.requisisionForm.get('reqhdNo')?.value;
    this.service.UpdateUserReqBilllineRecorder(reqheaderNo)
    .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // this.dataDisplay=''
          this.requisisionForm.disable();
          this.ReqHedIdFindFN(res.obj)
          // this.displayButton=false;
        } else {
          if (res.code === 400) {
            alert(res.message);
            
          }
        }
      });
    }

    acceptAllLine(){
      var len = this.requestlineDetailsArray().length;
      var allLine = this.requisisionForm.get('reqLines')?.value;
      var patch = this.requisisionForm.get('reqLines') as FormArray;
      for (let i=0;i<allLine.length;i++){
        (patch.controls[i]).patchValue(
            {
              userstatus:'Accept'
            }
          ); 
    }

}

onKey(i:any,event:any){}



CheckLineValidations(i: number) {
  var prcLineArr1 = this.requisisionForm.get('reqLines')?.value;
  var lineValue1 = prcLineArr1[i].itemcat;
  var lineValue2 = prcLineArr1[i].itemName;
  var lineValue3 = prcLineArr1[i].qty;

  var j = i + 1;
  if (lineValue1 === undefined || lineValue1 === null || lineValue1 === '') {
    alert("Line-" + j + " BILL TYPE :  should not be null value");
    this.lineValidation = false;
    return;
  }

}

}
