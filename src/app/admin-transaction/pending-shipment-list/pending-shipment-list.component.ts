import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';

import { Location } from "@angular/common";


@Component({
  selector: 'app-pending-shipment-list',
  templateUrl: './pending-shipment-list.component.html',
  styleUrl: './pending-shipment-list.component.css'
})
export class PendingShipmentListComponent {
  pendingShipmentListForm: FormGroup;
  locIdList:any=[];
  Location:string;
  locactionId:Number;

  viewAllReqisision:any=[];
  constructor(private fb: FormBuilder, private router: Router,private router1:ActivatedRoute, private adminServiceService: AdminTransactionService,private service: AdminTransactionService) { 
    this.pendingShipmentListForm = fb.group({
      Location:[],
      locactionId:[],
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");

var deptId = Number(sessionStorage.getItem('deptId'));
var ouId = Number(sessionStorage.getItem('ouId'));


this.adminServiceService.AlllocationIdList(ouId)
.subscribe(
  data => {
    this.locIdList = data.obj;
    console.log(this.locIdList);
  }
)
  }

  pendingShipmentList(pendingShipmentListForm: any) { }


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


  viewShipDetails(shipmentNumber:any) {
    this.router.navigate(['/admin/adminTransaction/ReceiptForm'], { queryParams: { shipmentNumber: shipmentNumber } });
    // alert(segment1);
  }


  getlocpendingship(){
    var locId =this.pendingShipmentListForm.get('locactionId')?.value;
    var stsreq='Stock Transfer';
    this.service.viewPendingShipment(stsreq,locId)
    .subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
          this.viewAllReqisision=res.obj;
      }
      else{
  
      }
  })
  }



  onlocationissueselect(event:any){
    var locName = event.target.value;
    var locNameList = this.locIdList.find((d:any) => d.locName === locName)
    console.log(locNameList);
    var locId=locNameList.locId;
    // alert(locId);
    this.pendingShipmentListForm.patchValue({locactionId:locId});
   
  }
}
