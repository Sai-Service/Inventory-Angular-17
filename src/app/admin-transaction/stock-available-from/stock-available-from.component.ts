import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';

import { Location } from "@angular/common";


@Component({
  selector: 'app-stock-available-from',
  templateUrl: './stock-available-from.component.html',
  styleUrl: './stock-available-from.component.css'
})
export class StockAvailableFromComponent {
  availableQtyForm:FormGroup;
  AllreqItemCatagList:any=[];
  onSelectItemNameFnList:any=[];
  quantityList:any=[];
  constructor(private fb: FormBuilder, private router: Router, private service: AdminTransactionService,private router1: ActivatedRoute,) {
      this.availableQtyForm = fb.group({
        itemcat:[],
        itemName:[],
      })
     }

     availableQty(availableQtyForm: any) { }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");

    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    );

    // this.service.viewOnhandStockFn(ouId,LocId,Stock)
    // .subscribe((res: any) => {
    //     if (res.code == 200) {
    //       this.viewAllStokList=res.obj;
    //     }
    //     else {(res.code == 400)
    //       alert('Stock Name Not Present')
    //     }
    //   }

    // );
  }


  onSelectItemType(event:any){
    var codeType=event.target.value;
    this.service.onSelectReqItemNameFn(codeType)
    .subscribe(
      data => {
        this.onSelectItemNameFnList = data.obj;
      }
    );
    
   }

   getItemDetails(){
  var itemName=  this.availableQtyForm.get('itemName')?.value;
    this.service.onHandQtyOuFn(itemName)
    .subscribe(
      data => {
        this.quantityList = data.obj;
      }
    );
   }

   message: string = "Please Fix the Errors !";
   msgType: string = "Close";
   getMessage(msgType: string) {
     this.msgType = msgType;
     if (msgType.includes("Reset")) {
       this.message = "Do you want to Reset the changes(Yes/No)?"
     }
 
     if (msgType.includes("Close")) {
       this.message = "Do you want to Close the Form(Yes/No)?"
     }
   }
 
 
   executeAction() {
    
 
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
}
