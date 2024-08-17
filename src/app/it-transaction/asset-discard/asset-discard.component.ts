import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItTransService } from '../it-trans.service';
import { ItmasterService } from 'D:/Jyotik/itinventory/newe/angular/itInvenoryAndAdmin/src/app/it-master/itmaster.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import * as xlsx from 'xlsx';
import { TypeofExpr } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';


interface Assetdiscard {

  ditemId: number;
  itemCode: string;
  itemId: string;
  date: Date;
  transType: number;
  transDate: string;
  value: number;
  reasonId: number;
  itemTypeId: number;
  productMake: string;
  assetNo: string;
  city: number;
  compId: number;
  division: number;
  location: number;
  dept: number;
  deptName: string;
  divName: string;
  locName: string;
  legalEntity: string;
  cityName: string;
  itemType: string;
  faNo: string;
  userName: String;
  mtmNo: string;
  productserialNo: string;
  dvendorlist: string;
  valueGst:number;
  gst:number;


  status: string;
  remarks: string;
  createdBy:string;
  lastupdatedBy:string;

}
@Component({
  selector: 'app-asset-discard',
  templateUrl: './asset-discard.component.html',
  styleUrl: './asset-discard.component.css'
})
export class AssetDiscardComponent {
  aseetDiscardForm: FormGroup;
  ditemId: number;
  itemCode: string;
  itemId: string;
  // date:Date;
  transType: Number;
  transDate: String;
  value: number;
  reasonId: number;
  itemTypeId: number;
  productMake: string;
  assetNo: string;
  city: number;
  compId: number;
  division: number;
  location: number;
  dept: number;
  deptName: string;
  divName: string;
  locName: string;
  legalEntity: string;
  cityName: string;
  itemType: string;
  faNo: string;
  userName: String;
  mtmNo: string;
  productserialNo: string;
  dvendorlist: string;
  valueGst:number;
  gst:number;
  status: string;
  remarks: string;
  displayButton = true;
  displayEndDate = false;
  displaystartDate = true;
  closeResetButton = true;
  display:any;
  dataDisplay:any;
  progress = 0;
  pipe = new DatePipe('en-US');
  date = new Date();
  Date = '';
  public TranstypList: any=[];
  public ReasonList: any=[];
  public DvendorList: any=[];
  public allassetdiscardeSearch: any=[];
  maxDate = new Date();
 displayGstper =true;
  gstperList:any;
  createdBy:string;
  lastupdatedBy:string;


  constructor(private fb: FormBuilder, private router: Router, private service1: ItmasterService, private service : ItTransService) {
    this.Date = formatDate(
      this.date,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );




    this.aseetDiscardForm = fb.group({
      ditemId: [],
      itemCode: [],
      itemId: [],
      date: [],
      transType: [],
      transDate: [],
      value: [],
      reasonId: [],
      itemTypeId: [],
      itemType: [],
      productMake: [],
      assetNo: [],
      city: [],
      compId: [],
      division: [],
      location: [],
      dept: [],
      deptName: [],
      divName: [],
      locName: [],
      legalEntity: [],
      cityName: [],
      faNo: [],
      valueGst:[],
      gst:[],
      status: [],
      remarks: [],
      userName: [],
      mtmNo: [],
      productserialNo: [],
      dvendorlist: [],
      createdBy:[],
      lastupdatedBy:[],


    })
  }


  AssetitemcodeFindFN(itemCode:any) {
    // alert(itemCode)
    this.displayButton = false;
    this.displaystartDate = false;
    this.service.AssetitemcodeFindFN(itemCode)
      .subscribe(
        data => {
          this.aseetDiscardForm.patchValue(data.obj);
        
        }
      )
  }

  AssetdiscardFindFN(itemCode:any) {
    this.displayButton = true;
    this.displaystartDate = false;
    this.displayGstper= false;
    this.aseetDiscardForm.patchValue({gst: sessionStorage.getItem('code')});
    this.aseetDiscardForm.get('gst')?.disable();
    this.aseetDiscardForm.get('transDate')?.disable();
    this.aseetDiscardForm.get('gst')?.disable();
    this.aseetDiscardForm.get('value')?.disable();
    this.aseetDiscardForm.get('dvendorlist')?.disable();
    this.aseetDiscardForm.get('transType')?.disable();
    this.aseetDiscardForm.get('reasonId')?.disable();
    this.aseetDiscardForm.get('status')?.disable();
    this.aseetDiscardForm.patchValue({gst: sessionStorage.getItem('code')});
    this.service.AssetdiscardFindFN(itemCode)
      .subscribe(
        data => {
          this.aseetDiscardForm.patchValue(data.obj);
          // alert(data.obj.transDate)
          this.aseetDiscardForm.patchValue({ transDate: this.pipe.transform(data.obj.transDate, 'yyyy-MM-dd') });
       
           alert(data.obj.gst)
           this.aseetDiscardForm.patchValue({ gst: data.obj.gst });
         
        }
      )
  }






  transData(val:any) {
    return val;
  }
  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }





  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.aseetDiscardForm.patchValue({ ditemId: sessionStorage.getItem("ditemId") });
    this.aseetDiscardForm.patchValue({ status: 'Discard' })
    this.aseetDiscardForm.patchValue({ ouId: sessionStorage.getItem('ouId') });
    this.aseetDiscardForm.patchValue({createdBy:sessionStorage.getItem('loginName')});
    this.aseetDiscardForm.patchValue({lastupdatedBy:sessionStorage.getItem('loginName')})
    this.displayGstper = true;

    this.service.TranstypList()
      .subscribe(
        data => {
          this.TranstypList = data.obj;
          console.log(this.TranstypList);
        }
      );

    this.service.ReasonList()
      .subscribe(
        data => {
          this.ReasonList = data.obj;
          console.log(this.ReasonList);
        }
      );

      this.service.DvendorList()
      .subscribe(
        data => {
          this.DvendorList = data.obj;
          console.log(this.DvendorList);
        }
      );
       
      this.service.AssetDgstperList()
      .subscribe(
        data => {
          this.gstperList = data.obj;
          console.log(this.gstperList);
        }
      );

      if(  sessionStorage.getItem('role')==='Admin') {


      }
      if(sessionStorage.getItem('role')==='User'){}
      this.aseetDiscardForm.get('ditemId')?.disable();
      this.aseetDiscardForm.get('valueGst')?.disable();
      // this.aseetDiscardForm.get('itemCode')?.disable();
      this.aseetDiscardForm.get('itemType')?.disable();
      this.aseetDiscardForm.get('productMake')?.disable();
      this.aseetDiscardForm.get('productserialNo')?.disable();
      this.aseetDiscardForm.get('mtmNo')?.disable();
      this.aseetDiscardForm.get('cityName')?.disable();
      this.aseetDiscardForm.get('legalEntity')?.disable();
      this.aseetDiscardForm.get('divName')?.disable();
      this.aseetDiscardForm.get('userName')?.disable();
      this.aseetDiscardForm.get('locName')?.disable();
      this.aseetDiscardForm.get('deptName')?.disable();
      this.aseetDiscardForm.get('status')?.disable();
  }


  public validation() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
    var transType = this.aseetDiscardForm.get('transType')?.value;
    var dvendorlist = this.aseetDiscardForm.get('dvendorlist')?.value;
    var transDate = this.aseetDiscardForm.get('transDate')?.value;
    var reasonId = this.aseetDiscardForm.get('reasonId')?.value;
    var value = this.aseetDiscardForm.get('value')?.value;
    var gst = this.aseetDiscardForm.get('gst')?.value;
    var valueGst =this.aseetDiscardForm.get('valueGst')?.value;


    if (transType ===undefined || transType === null || transType===''){
      alert('Please Select Transfer.!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Transfer Type.!';
      return;
    }
    
    if (dvendorlist ===undefined || dvendorlist === null || dvendorlist===''){
      alert('Please Select Vendor Name.!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Vendor Name.!';
      return;
    }

    if (reasonId ===undefined || reasonId === null || reasonId ===''){
      alert('Please Select Reason .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Reason .!';
      return;
    }
    if (value ===undefined || value === null || value ===''){
      alert('Please Select Value(without GST) .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Reason .!';
      return;
    }
    if (gst ===undefined || gst === null || gst ===''){
      alert('Please Select Value(in persentage(%)) .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Value(in persentage(%)) .!';
      return;
    }

    if (valueGst ===undefined || valueGst === null ){
      alert('Please Select Value(in persentage(%)) .!');
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select Value(in persentage(%)) .!';
      return;
    }

  }



  onKey(event:any){
    event.target.disabled = true;
          var dvalue = this.aseetDiscardForm.get('value')?.value;
          var gst = this.aseetDiscardForm.get('gst')?.value;
          var valueGst =this.aseetDiscardForm.get('valueGst')?.value;
          var gstTot= Math.round((dvalue*gst/100 +Number.EPSILON) * 100) / 100;
          var totalvalue= Math.round((dvalue+gstTot +Number.EPSILON)*100)/100;
          this.aseetDiscardForm.patchValue({valueGst:totalvalue.toFixed(0)})

  }








  newMast() {

    var isvaliddata1 = this.validation();
    // if (isvaliddata1 === false) {
    //   return;
    // }
    const formValue: Assetdiscard = this.transData(this.aseetDiscardForm.value);
    formValue.productMake=this.aseetDiscardForm.get('productMake')?.value;
    console.log(formValue);
    this.service.AssetdiscrdSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.aseetDiscardForm.disable();
      
        this.aseetDiscardForm.patchValue({ ditemId: res.obj.ditemId });
        this.displayButton = false;

      } else {
        if (res.code === 400) {
          alert(res.message);

        }
      }
    });
  }

  searchMast() {
    var searchText = this.aseetDiscardForm.get('status')?.value;
    alert(searchText);
    this.service.allassetdiscardeSearch(sessionStorage.getItem('ouId'), searchText)
      .subscribe(
        data => {
          this.allassetdiscardeSearch = data.obj;
          console.log(this.allassetdiscardeSearch);
        });
  }




}

