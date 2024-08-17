import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminMasterService } from '../admin-master.service';
import { Location } from "@angular/common";

interface IItemMaster {
  segment: string;
  oemWarrentyEndDate: Date;
  description: string;
  loyaltyCardDate: Date;
  categoryId: number;
  uom: string;
  tyreMake: string;
  materialType: string;
  tyreNo: string;
  bookletNo: string;
  toolkit: string;
  fuelType: string;
  costing: string;
  stockable: string;
  purchasable: string;
  costCenter: number;
  hsnSacCode: string;
  hsnGstPer: number;
  internalOrder: string;
  marginCategory: string;
  assetItem: string;
  lotSize: number;
  status: string;
  type: string;
  mainModel: string;
  colorCode: string;
  variantCode: string;
  chassisNo: string;
  engineNo: string;
  vehicleDelvDate: Date;
  manYaer: string;
  // octraiBillDate:Date;
  // octraiType:string;
  warrantyStatus: string;
  ewStatus: string;
  ewStartDate: Date;
  ewEndDate: Date;
  ewPeriod: number;
  ewBookletNo: string;
  smartCardNumber: number;
  ewInsurerId: string;
  ewInsurerSite: string;
  itemType: string;
  insurerCompId: string;
  insurerSiteId: string;
  interiors: string;
  rips: string;
  twoTone: string;
  hold: string;
  holdReason: string;
  cngKitNumber: number;
  cngCylinderNo: number;
  keyNo: number;
  batteryMake: string;
  batteryNo: string;
  loyaltyCardNumber: string;
  fastTagIssueDate: Date;
  fastTagNo: string;
  smartCardIssueDate: Date;
  tempRegNo: string;
  tempRegDate: Date;
  poChargeAccount: number;
  vin: string;
  isTaxable: string;
  taxCategoryPur: number;
  taxCategorySale: number;
}

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.css'
})
export class ItemMasterComponent {
  itemMasterForm: FormGroup;
  itemcat:string;
  itemName:string;
  AllreqItemCatagList:any=[];
  AllreqItemCatagList1:any[];
  onSelectItemNameFnList:any=[];
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  category:string;
  item:string;
  itemDescription:string;
  displayStatus=true;
  status:string;
  statusList:any=[];
  hasncodeList:any=[];
  Alluomlist:any=[];
  displayInactive=true;
  endDate:Date;
  displayButton=true;
  displayButtonCondition=true;
  itemId:string;
  allitemcatmstList:any[];
  hsnCode:string;
  uom:string;
  stockable:string;
  purchasable:string;
  costing:string;
  internalOrder:string;
  isTaxable:string;
  assetItem:string;
  userList1: any[] = [];
  lastkeydown1: number = 0;
  displayCosting = true;

  constructor(private fb: FormBuilder, private router: Router,private router1:ActivatedRoute,private service: AdminMasterService, private location: Location,
    private AdminMasterService:AdminMasterService) {
    this.itemMasterForm = fb.group({
      itemName:[],
      itemcat:[],
      category:[],
      item:[],
      itemDescription:[],
      status:[],
      endDate:[],
      itemId:[],
      hsnCode:[],
      uom:[],
      stockable:[],
      purchasable:[],
      costing:[],
      internalOrder:[],
      isTaxable:[],
      assetItem:[],

    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.itemMasterForm.patchValue({status:'Active'});

    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    )

    this.service.AllreqItemCatagList1()
    .subscribe(
      data => {
        this.AllreqItemCatagList1 = data.obj;
        console.log(this.AllreqItemCatagList1);
      }
    );

    this.AdminMasterService.statusList()
    .subscribe(
      data => {
        this.statusList = data.obj;
        console.log(this.statusList);
      }
    );

    this.AdminMasterService.ALLhasncodelist()
    .subscribe(
      data => {
        this.hasncodeList = data;
        console.log(this.hasncodeList);
      }
    );

    this.AdminMasterService.Alluomlist()
    .subscribe(
      data => {
        this.Alluomlist = data.obj;
        console.log(this.Alluomlist);
      }
    );

    this.disableField();
  }
  
  disableField(){
    this.itemMasterForm.get('stockable')?.disable();
    this.itemMasterForm.get('purchasable')?.disable();
    this.itemMasterForm.get('costing')?.disable();
    this.itemMasterForm.get('internalOrder')?.disable();
    this.itemMasterForm.get('isTaxable')?.disable();
    this.itemMasterForm.get('assetItem')?.disable();
  }



  itemMaster(itemMasterForm: any) { }


  onSelectItemType(event:any){
    var itemType=event.target.value;
    alert(itemType)
    this.service.onSelectReqItemNameFn(itemType)
    .subscribe(
      data => {
        this.onSelectItemNameFnList = data.obj;  
        console.log(data.obj);
             
      }
    );
    
   }


   onSelectItemName(event:any){
    
   }

   itemNameFind(){
    var itemname = this.itemMasterForm.get('itemName')?.value;
    let select = this.onSelectItemNameFnList.find((d:any) => d.item === itemname);
    console.log(select);
    this.AdminMasterService.findByItemDetails(select.itemId)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.itemMasterForm.patchValue(data.obj);
          this.displayStatus=false;
          this.displayButtonCondition=false;
          this.afterSearchDisable();
        }
        else{
          alert(data.message);
        }    
      }
    );    
   }

   afterSearchDisable(){
    this.itemMasterForm.get('category')?.disable();
    this.itemMasterForm.get('item')?.disable();
    // this.itemMasterForm.get('category')?.disable();
    // this.itemMasterForm.get('category')?.disable();
   }

   itemNamesearchFind(){
    var itemname = this.itemMasterForm.get('com.item')?.value;
    // let select = this.onSelectItemNameFnList.find(d => d.item === itemname);
    // console.log(select);
    this.AdminMasterService.findByItemDetails(itemname)
    .subscribe(
      data => {
        if (data.code===200){
          alert(data.message);
          this.itemMasterForm.patchValue(data.obj);
          this.displayStatus=false;
          this.displayButtonCondition=false;
        }
        else{
          alert(data.message);
        }    
      }
    );    
   }

   

   onOptionsSelectede(event: any) {
    var status=event.target.value;
    alert(status)
    var sta = status.substr(status.lastIndexOf(':') + 1).trim();
    alert(sta)
    if (sta === 'Inactive') {
      this.displayInactive = false;
      // this.displaystartDate = false;
      this.endDate = new Date();
    }
    else if (sta === 'Active') {
      this.itemMasterForm.get('endDate')?.reset();
    }
  }


  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      this.message = "Do you want to Save the changes(Yes/No)?"
    }
    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }
    
    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    if (msgType.includes("Update")) {
      this.message = "Do you want to Update the Form(Yes/No)?"
    }
  }


  executeAction() {
    if (this.msgType.includes("Save")) {
      this.saveItemMaster()
    }

    if (this.msgType.includes("Reset")) {
      window.location.reload();
    }

    if (this.msgType.includes("Close")) {
      this.close();
    }
    if (this.msgType.includes("Update")) {
      this.updateItemMaster();
    }
  }

  close() {
    this.location.back();
  }

  saveItemMaster(){
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Item Save is progress....Do not refresh the Page';
    const formValue = this.transData(this.itemMasterForm.getRawValue());
    console.log(formValue);
    this.AdminMasterService.itemMasterSave(formValue).subscribe((res: any) => {
      if (res.code === 200) {
         alert(res.message);
        this.dataDisplay = res.message;
        this.itemMasterForm.disable();
        this.displayButtonCondition = false;
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }


  updateItemMaster(){
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Item Update is progress....Do not refresh the Page';
    const formValue = this.transData(this.itemMasterForm.getRawValue());
    var itemId= this.itemMasterForm.get('itemId')?.value;
    console.log(formValue);
    this.AdminMasterService.itemMasterUpdate(itemId,formValue).subscribe((res: any) => {
      if (res.code === 200) {
         alert(res.message);
        this.dataDisplay = res.message;
        this.itemMasterForm.disable();
        this.displayButtonCondition = false;
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }

  
  transData(val:any) {
    
    return val;
 }

 searchMast(){
  var searchText = this.itemMasterForm.get('category')?.value;
  this.AdminMasterService.allItemmstSearch(searchText)
    .subscribe(
      data => {
        this.allitemcatmstList = data.obj;
        console.log(this.allitemcatmstList);
       
      }
    );

 }


 CostingEvent(e:any) {
  alert(e.target.checked)
  if (e.target.checked) {
    this.costing = 'Y'
    this.displayCosting = false;
  }
  else {
    this.costing = 'N';
    this.displayCosting = true;
  }
}


stockableEvent(e:any) {
  if (e.target.checked) {
    this.stockable = 'Y'
  }
  else {
    this.stockable = 'N';
  }
}


PurchasableEvent(e:any) {
  if (e.target.checked) {
    this.purchasable = 'Y'
  }
  else {
    this.purchasable = 'N';
  }
}


InternalOrderEvent(e:any) {
  if (e.target.checked) {
    this.internalOrder = 'Y'
  }
  else {
    this.internalOrder = 'N';
  }
}

Istaxable(e:any) {
  if (e.target.checked) {
    this.isTaxable = 'Y'
  }
  else {
    this.isTaxable = 'N';
  }
}

AssetItem(e:any) {
  if (e.target.checked) {
    this.assetItem = 'Y'
  }
  else {
    this.assetItem = 'N';
  }
}

onSelectItemDetails(event:any){
  // alert(event.target.value)
  var itemType =event.target.value;
  var selectCostingDetails = this.AllreqItemCatagList1.find(d =>d.codeType===itemType);
  console.log(selectCostingDetails);
  // alert(selectCostingDetails.costing)
  if (selectCostingDetails.costing==='Y'){
    this.itemMasterForm.patchValue({costing:'Y'})
  }
  if (selectCostingDetails.internalOrder==='Y'){
    this.itemMasterForm.patchValue({internalOrder:'Y'})
  }
  if (selectCostingDetails.isTaxable==='Y'){
    this.itemMasterForm.patchValue({isTaxable:'Y'})
  }
  if (selectCostingDetails.purchable==='Y'){
    this.itemMasterForm.patchValue({purchasable:'Y'})
  }
  if (selectCostingDetails.stockable==='Y'){
    this.itemMasterForm.patchValue({stockable:'Y'})
  }
  if (selectCostingDetails.assetItem==='Y'){
    this.itemMasterForm.patchValue({assetItem:'Y'})
  }
  if (selectCostingDetails.costing===null){
    this.itemMasterForm.patchValue({costing:'N'})
  }
  if (selectCostingDetails.internalOrder===null){
    this.itemMasterForm.patchValue({internalOrder:'N'})
  }
  if (selectCostingDetails.isTaxable===null){
    this.itemMasterForm.patchValue({isTaxable:'N'})
  }
  if (selectCostingDetails.purchable===null){
    this.itemMasterForm.patchValue({purchasable:'N'})
  }
  if (selectCostingDetails.stockable===null){
    this.itemMasterForm.patchValue({stockable:'N'})
  }
  if (selectCostingDetails.assetItem===null){
    this.itemMasterForm.patchValue({assetItem:'N'})
  }
}



getUserIdsFirstWay($event: any) {
  let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
  this.userList1 = [];
}

  }
