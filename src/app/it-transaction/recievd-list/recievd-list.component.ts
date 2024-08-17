import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';
import {  } from '../it-trans.service';
import { ItTransService } from '../it-trans.service';

@Component({
  selector: 'app-recievd-list',
  templateUrl: './recievd-list.component.html',
  styleUrl: './recievd-list.component.css'
})
export class RecievdListComponent {
    stocrecivedForm: FormGroup;
    closeResetButton =true;
    dataDisplay: any;
    progress = 0;
    stockReceivedList:any=[];
  
    constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private TransactionService:ItTransService) { 
      this.stocrecivedForm = this.fb.group({
        
      })
    }
  
    ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      this.closeResetButton=false;
      this.progress = 0;
      this.dataDisplay ='Data Loading in progress....Do not refresh the Page';
      this.TransactionService.getReceivedList(sessionStorage.getItem('locId')).subscribe((res: any) => {
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
  
  
    stocrecived(stocrecivedForm:any) {
    }
    getByTranferId(transId:any){
      this.router.navigate(['/admin/itTransaction/recvdForm', transId]);
    }
  
  
    resetMast() {
      window.location.reload();
    }
    
    closeMast() {
      this.router.navigate(['admin']);
    }
    
  }
  