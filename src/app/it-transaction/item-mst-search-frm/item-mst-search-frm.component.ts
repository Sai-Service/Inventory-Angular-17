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

interface ItemMasterlit {
  temCode:string;
  itemType:string;
  locName:string;
  deptName:string;
  divName:string;
  legalEntity:string;
  usertktNo:string;
  userName:string;
  userDesigntn:string;
  productMake:string;
  productserialNo:string;
  purchaseInvNo:string;
  vendorName:string;
  faNo:string;
  city:any;
  itemId:number;


}


@Component({
  selector: 'app-item-mst-search-frm',
  templateUrl: './item-mst-search-frm.component.html',
  styleUrl: './item-mst-search-frm.component.css'
})
export class ItemMstSearchFrmComponent {
  ItemListSForm: FormGroup;
  allitemMasterList: any[];
  itemCode:string;
  itemType:string;
  locName:string;
  deptName:string;
  divName:string;
  legalEntity:string;
  usertktNo:string;
  userName:string;
  userDesigntn:string;
  productMake:string;
  productserialNo:string;
  purchaseInvNo:string;
  vendorName:string;
  faNo:string;
  public AllllocationitemList: any=[];
  public AlldepartmentitemList: any=[];
  public AlldivisionitemList: any=[];
  public AllproducttypeList: any=[];
  closeResetButton = true;
  display = false;
  progress = 0;
  city:any;
  isVisibleSupperdata:boolean=true;
  isVisibleloactiondata:boolean=true;
  dataDisplay: any;
  totInvAmt=0;
  itemId:number;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
    constructor(private fb: FormBuilder, private router: Router,router1: Router, private service:ItTransService ) {
    this.ItemListSForm = this.fb.group({
      itemCode:[],
      itemType:[],
      locName:[],
  deptName:[],
  divName:[],
  legalEntity:[],
  usertktNo:[],
  userName:[],
  userDesigntn:[],
  productMake:[],
  productserialNo:[],
  purchaseInvNo:[],
  vendorName:[],
  faNo:[],
  city:[],
  itemId:[],

      custContact:['', [Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
   var cityID =Number(sessionStorage.getItem('ouId'));
    this.ItemListSForm.patchValue({ city: cityID });

 
  

    this.service.AllllocationitemList(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.AllllocationitemList = data.obj;
          console.log(this.AllllocationitemList);
        }
      );

      this.service.AlldepartmentitemList()
      .subscribe(
        data => {
          this.AlldepartmentitemList = data.obj;
          console.log(this.AlldepartmentitemList);
        }
      );

      this.service.AlldivisionitemList()
      .subscribe(
        data => {
          this.AlldivisionitemList = data.obj;
          console.log(this.AlldivisionitemList);
        }
      );

      this.service.AllproducttypeList()
      .subscribe(
        data => {
          this.AllproducttypeList = data.obj;
          console.log(this.AllproducttypeList);
        }
      );




      if(  sessionStorage.getItem('role')==='Admin') {
        // alert('Admin'+'-------In1')
          this.isVisibleloactiondata=true;
          this.isVisibleSupperdata=false;
        
        }
        if(  sessionStorage.getItem('role')==='SuperAdmin') {
            this.isVisibleloactiondata=false;
            this.isVisibleSupperdata=true;
          
          }
        if(sessionStorage.getItem('role')==='User')
        {
          //  alert('User'+'-------In1')
          this.isVisibleloactiondata=true;
          this.isVisibleSupperdata=false;
        
        }

  }

  
  

 get f() { return this.ItemListSForm.controls; }

 ItemListS(ItemListSForm: any) { }

 transData(val:any) {
    
  return val;
}

transDatad(val:any) {
  delete val.city;
  return val;
}

  dataSearch(){
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='Data Searching in progress....Do not refresh the Page'
    var  itemCode = this.ItemListSForm.get('itemCode')?.value;
    var  itemType = this.ItemListSForm.get('itemType')?.value;
    var  locName = this.ItemListSForm.get('locName')?.value;
    var  deptName = this.ItemListSForm.get('deptName')?.value;
    var  divName = this.ItemListSForm.get('divName')?.value;
    var city = this.ItemListSForm.get('city')?.value;
   
    const formValue = this.transData(this.ItemListSForm.value);
    console.log(formValue);
    this.service.itemMasterLikeSearchFn(formValue)
    .subscribe(
      (res: any) => {
        if (res.code==200){
          alert(res.message)
        this.allitemMasterList = res.obj;
        this.closeResetButton=true;
        this.progress = 0;
        this.dataDisplay ='Data Displaye Succefully'
     
      if (res.obj.length !=0){
        
      }
      for (let x=0; x<this.allitemMasterList.length; x++){
        this.totInvAmt = Math.round(((this.totInvAmt += (this.allitemMasterList[x].orAmt)) + Number.EPSILON) * 100) / 100;
        // console.log(this.totInvAmt);
    }}
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

  Supperdata(){
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='Data Searching in progress....Do not refresh the Page'
    var  locName = this.ItemListSForm.get('locName')?.value;
    var  itemType = this.ItemListSForm.get('itemType')?.value;
    var  deptName = this.ItemListSForm.get('deptName')?.value;
    var  divName = this.ItemListSForm.get('divName')?.value;
    
    const formValue = this.transDatad(this.ItemListSForm.value);
    console.log(formValue);
   
    this.service.itemMasterLikeSupperSearchFn(formValue)
    .subscribe(
      (res: any) => {
        if (res.code==200){
          alert(res.message)
        this.allitemMasterList = res.obj;
        this.closeResetButton=true;
        this.progress = 0;
        this.dataDisplay ='Data Displaye Succefully'
     
      if (res.obj.length !=0){
        
      }
      for (let x=0; x<this.allitemMasterList.length; x++){
        this.totInvAmt = Math.round(((this.totInvAmt += (this.allitemMasterList[x].orAmt)) + Number.EPSILON) * 100) / 100;
        // console.log(this.totInvAmt);
    }}
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

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      // xlsx.utils.json_to_sheet(this.storeAllOrderData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'CounterSaleOrderList.xlsx');
  }
}
