import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';
import { ItTransService } from '../it-trans.service';
@Component({
  selector: 'app-tras-list-form',
  templateUrl: './tras-list-form.component.html',
  styleUrl: './tras-list-form.component.css'
})
export class TrasListFormComponent {
  stoctrnasferForm: FormGroup;
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;
  stockReceivedList:any=[];

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute,private TransactionService:ItTransService) { 
    this.stoctrnasferForm = this.fb.group({
      
    })
  }
  ngOnInit(): void {
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='Data Loading in progress....Do not refresh the Page';
    this.TransactionService.getTransferList(sessionStorage.getItem('locId')).subscribe((res: any) => {
      if (res.code === 200) {
        this.stockReceivedList = res.obj;
        this.dataDisplay ='Data Display Sucessfully....'
        this.closeResetButton=true;
      }
      else if (res.code===400){
        alert(res.message);
        this.dataDisplay ='Data Display Failed....'
        this.closeResetButton=true;
      }
    })
  }



 



  stoctransfer(stocrecivedForm:any) {}
  getByTranferId(transId:any){
    // alert(transId)
    this.router.navigate(['/admin/transaction/RecivedFrom', transId]);
 
  //     data => {
  //   this.stoctrnasferForm.patchValue({newloc:data.obj.newloc,})
     
  //  } 
 }

 resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


}


