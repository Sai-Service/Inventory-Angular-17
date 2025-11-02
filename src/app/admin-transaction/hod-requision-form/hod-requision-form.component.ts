import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';
import { Location } from "@angular/common";
import { data } from 'jquery';

@Component({
  selector: 'app-hod-requision-form',
  templateUrl: './hod-requision-form.component.html',
  styleUrl: './hod-requision-form.component.css'
})
export class HodRequisionFormComponent {
 HodRequitionListForm:FormGroup
  viewAllReqisision:any=[];
  reqhdNo:number;
  pendingCount: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private service:AdminTransactionService,private router1: ActivatedRoute,
private location: Location) { 
    this.HodRequitionListForm = fb.group({
      reqhdNo:[],


    })
  }

  adminRequitionList(HodRequitionListForm: any) { }

  ngOnInit(): void {
    var deptId = (sessionStorage.getItem('deptName'));
var ouId = Number(sessionStorage.getItem('ouId'));
  var UserName =(sessionStorage.getItem('tktNo')) ;
   var attribute5 =(sessionStorage.getItem('attribute5')) ;
  this.service.hodApprovalReqListFn(ouId,deptId,attribute5,UserName)
  .subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
        this.viewAllReqisision=res.obj;
        
    }
    else{}
})
  }


//  fetchPendingDataCount() {
//     try {
//         const response =  fetch('/api/pending-data');
//         const data =  response.json();
//         updateMenuBar(data.count);
//     } catch (error) {
//         console.error('Error fetching pending data:', error);
//     }
// }

  ReqHedIdFindFN(reqhdNo:any){
  // alert(reqhdNo);
  this.router.navigate(['/admin/admintransaction/HodApprovalForm']) 
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
    this.location.back();
  }
}
