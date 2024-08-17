import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from,Observable } from 'rxjs';
import { Url } from 'url';
import { FormsModule } from '@angular/forms';
// import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { ItTransService } from '../it-trans.service';


interface suppBillsearch {

  headerId:number;
  compCode:string;
  billNo:string;
  billDate:Date;
  grandTotal:number;
  vendorName:string;
  cityId:number;
  startDate:Date;

}

@Component({
  selector: 'app-billrcd-src-form',
  templateUrl: './billrcd-src-form.component.html',
  styleUrl: './billrcd-src-form.component.css'
})
export class BillrcdSrcFormComponent {
  suppBillForm:FormGroup;
  headerId:number;
  compCode:string;
  billNo:string;
  billDate:Date;
  grandTotal:number;
  vendorName:string;
  cityId:number;
  startDate:Date;
  closeResetButton = true;
  display = false;
  progress = 0;
  dataDisplay: any;
  allbillrecordersearch:any[];
  AllvendornameList:any=[];
  private sub: any;
  pipe = new DatePipe('en-US');
  date = new Date();
  userList1: any[] = [];
lastkeydown1: number = 0;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor(private fb: FormBuilder, private router: Router,private router1: ActivatedRoute, private service:ItTransService ) {
    this.suppBillForm = this.fb.group({
      headerId:[],
  compCode:[],
  billNo:[],
  billDate:[],
  grandTotal:[],
  vendorName:[],
  cityId:[],
  startDate:[],

  


    })
  }
  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
   var cityID =Number(sessionStorage.getItem('ouId'));
    this.suppBillForm.patchValue({ cityId: cityID });

  

    this.service.AllsuppBillvendornameList()
      .subscribe(
        data => {
          this.AllvendornameList = data.obj;
          console.log(this.AllvendornameList);
        }
        );

      }


  get f() { return this.suppBillForm.controls; }

  SuppListS(suppBillForm: any) { }
 
  transData(val:any) {
     
   return val;
 }
 AllsuperdataSearch(){
  this.closeResetButton=false;
  this.progress = 0;
  this.dataDisplay ='Data Searching in progress....Do not refresh the Page'
  var  itemCode = this.suppBillForm.get('headerId')?.value;
  var  itemType = this.suppBillForm.get('compCode')?.value;
  var  locName = this.suppBillForm.get('billNo')?.value;
  var  deptName = this.suppBillForm.get('grandTotal')?.value;
  var  divName = this.suppBillForm.get('vendorName')?.value;
  var city = this.suppBillForm.get('cityId')?.value;
  const formValue = this.transData(this.suppBillForm.value);
  this.service.SupplierBillLikeSupperSearchFn(formValue)
  .subscribe(
    (res: any) => {
      if (res.code==200){
        alert(res.message)
      this.allbillrecordersearch= res.obj;
      this.closeResetButton=true;
      this.progress = 0;
      this.dataDisplay ='Data Display successfully'
   
    if (res.obj.length !=0){
      
    }
}
  else {
    if (res.code === 400) {
      alert(res.message);
      this.closeResetButton=true;
      this.progress = 0;
      this.dataDisplay ='Data Not Found !!!! '
    }
  }
    });
}



 dataSearch(){
  this.closeResetButton=false;
  this.progress = 0;
  this.dataDisplay ='Data Searching in progress....Do not refresh the Page'
  var  itemCode = this.suppBillForm.get('headerId')?.value;
  var  itemType = this.suppBillForm.get('compCode')?.value;
  var  locName = this.suppBillForm.get('billNo')?.value;
  var  deptName = this.suppBillForm.get('grandTotal')?.value;
  var  divName = this.suppBillForm.get('vendorName')?.value;
  var city = this.suppBillForm.get('cityId')?.value;
  var stDt = this.suppBillForm.get('billDate')?.value;
  const formValue = this.transData(this.suppBillForm.value);
  this.service.SupplierBillLikeSearchFn(formValue)
  .subscribe(
    (res: any) => {
      if (res.code==200){
        alert(res.message)
      this.allbillrecordersearch= res.obj;
      this.closeResetButton=true;
      this.progress = 0;
      this.dataDisplay ='Data Display successfully'
   
    if (res.obj.length !=0){
      
    }
}
  else {
    if (res.code === 400) {
      alert(res.message);
      this.closeResetButton=true;
      this.progress = 0;
      this.dataDisplay ='Data Not Found !!!! '
    }
  }
    });
}

refresh() {
  window.location.reload();
}

close() {
  this.router.navigate(['admin']);
}


searchbillDateW() {
  var stDt =this.suppBillForm.get('billDate')?.value;
  var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');
  this.service.BillSerchDateSearch(stDate,sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.allbillrecordersearch = data.obj;
        console.log(this.allbillrecordersearch);
      }
    );
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


searchFromArray(arr:any, regex:any) {
  let matches:any[] = [], i;
  for (i = 0; i < arr.length; i++) {
  
  }
  return matches;
};

onSelectVendorName(event:any){
  var suppName = event.target.value;
  console.log(this.AllvendornameList);
  let selectedValue = this.AllvendornameList.find((v:any) => v.vendorName == suppName);
  console.log(selectedValue.vendorId);
 this.suppBillForm.patchValue({suppId:selectedValue.vendorId});
  alert(selectedValue.vendorId);
}

}
