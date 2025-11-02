import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';

import { Location } from "@angular/common";
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-hodapproval-form',
  templateUrl: './hodapproval-form.component.html',
  styleUrl: './hodapproval-form.component.css'
})
export class HodapprovalFormComponent {
  HodApprovalForm: FormGroup;
  reqRemarks: string;
  reqlnNo: number;
  reqhdNo: number;
  srlNo: number;
  reqstatus: string;
  city: number;
  location: number;
  dept: number;
  qty: number;
  reqUsername: string;
  itemcat: string;
  itemName: string;
  admintktNo: string;
  userstatus: string;
  viewAllReqisision: any = []
  viewAllStokList: any = []
  createdBy: string;
  creationDate: Date;
  deptId: number;
  adminstatus: string;
  issuedQty: number;
  receivedQty: number;
  balanceQty: number;
  reqUsertktno: string;
  attribute1: String;
  attribute2: String;
  AllRequiDeprtList: any = [];
  avlQty: number;

  displayButton = true;
  public sub: any;


  displayRequDep: Array<boolean> = [];
  displayRequItem: Array<boolean> = [];
  displayLineflowStatusCode: Array<boolean> = [];
  displayLineflowStatusCode1: Array<boolean> = [];
  displayBillType1: Array<boolean> = [];
  isDisableStockViewbutton: boolean = false;
  displayadminstatus: Array<boolean> = [];
  displayuserstatus: Array<boolean> = [];
  displayaqty: Array<boolean> = [];
  displayissuedQty: Array<boolean> = [];
  isVisibleLineupdateMast: boolean = true;
  isVisiblestatusClose: boolean = false;
  rejReason: string;
  rejQty: number;

  dataDisplay: any;
  progress = 0;
  closeResetButton = true;
  RejectreasonList: any = [];
  attribute5: number;

  pipe = new DatePipe('en-US');
  now = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: AdminTransactionService, private router1: ActivatedRoute,
    private adminServiceService: AdminTransactionService) {
    this.HodApprovalForm = fb.group({
      reqhdNo: [],
      reqDate: [],
      reqDateNew: [],
      reqRemarks: [],
      city: [],
      loginArray1: [],
      loginArray: [],
      locName: [],
      location: [],
      dept: [],
      reqUsername: [],
      admintktNo: [],
      reqUsertktno: [],
      reqstatus: [],
      attribute1: [],
      attribute2: [],
      reqLines: this.fb.array([this.reqitemLinesGroup()]),
    })
  }


  reqitemLinesGroup() {
    return this.fb.group({
      reqlnNo: [],
      reqhdNo: [],
      srlNo: [{ value: '', disabled: true }],
      qty: [{ value: '', disabled: false }],
      itemName: [{ value: '', disabled: true }],
      deptId: [],
      tktNo: [],
      itemcat: [{ value: '', disabled: true }],
      userstatus: [{ value: '', disabled: true }],
      adminstatus: [],
      issuedQty: [],
      receivedQty: [],
      balanceQty: [{ value: '', disabled: true }],
      rejReason: [0],
      rejQty: [{ value: '', disabled: true }],
      avlQty: [{ value: '', disabled: true }],
      attribute5: [],
    })
  }

  HodApproval(HodApprovalForm: any) { }
  get f() { return this.HodApprovalForm.controls; }

  requestlineDetailsArray(): FormArray {
    return <FormArray>this.HodApprovalForm.get('reqLines')
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var patch = this.HodApprovalForm.get('reqLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
        userstatus: 'PENDING',
        adminstatus: 'PENDING'
      }
    );

    this.sub = this.router1.params.subscribe(params => {
      this.reqhdNo = params['reqhdNo'];
      if (this.reqhdNo != undefined) {
        this.ReqHedIdFindFN(this.reqhdNo);
        this.HodApprovalForm.get('reqhdNo')?.disable();
        // this.isVisibleOrderFind = false;
      }
    });

    this.HodApprovalForm.get('reqhdNo')?.disable();
    this.HodApprovalForm.get('reqDateNew')?.disable();
    this.HodApprovalForm.get('reqDate')?.disable();
    this.HodApprovalForm.get('reqUsername')?.disable();
    this.HodApprovalForm.get('dept')?.disable();
    this.HodApprovalForm.get('locName')?.disable();
    this.HodApprovalForm.get('location')?.disable();
    this.HodApprovalForm.get('admintktNo')?.disable();
    this.HodApprovalForm.get('balanceQty')?.disable();
    this.HodApprovalForm.get('userstatus')?.disable();
    this.HodApprovalForm.get('rejQty')?.disable();



    this.service.RejectreasonList()
      .subscribe(
        data => {
          this.RejectreasonList = data.obj;
        }
      )

  }


  isDisabled(index: number): boolean {
    return index % 2 === 0;
  }




  onSelectRejectQty(event: any, i: any) {
    var rejectResoan = event.target.value;
    var orderLinesNew = this.HodApprovalForm.get('reqLines') as FormArray;
    var orderLines = this.HodApprovalForm.get('reqLines')?.value;
    var balQty = orderLines[i].balanceQty;
    // alert(balQty)
    orderLines.controls[i].patchValue({ rejQty: balQty, balanceQty: 0 })
  }

  ViweStockDetails(attribute1: any) {
    this.displayButton = false;
    var ouId = Number(sessionStorage.getItem('ouId'));

    var LocId = this.HodApprovalForm.get('location')?.value;
    var Stock = this.HodApprovalForm.get('attribute1')?.value;
    this.service.viewStokListFn(ouId, LocId, Stock)
      .subscribe((res: any) => {
        if (res.code == 200) {
          this.viewAllStokList = res.obj;
        }
        else {
          (res.code == 400)
          alert('Stock Name Not Present')
        }
      }

      );

  }

  viewDocument() {
    var deptId = Number(sessionStorage.getItem('deptId'));
    var ouId = Number(sessionStorage.getItem('ouId'));
    var tktNo = (sessionStorage.getItem('tktNo'));
    var stsreq = 'OPEN';
    this.service.viewReqisisionListFn(ouId, deptId, tktNo, stsreq)
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.viewAllReqisision = res.obj;

          // this.dataDisplay ='File Uploaded Sucessfully....'
          // this.closeResetButton=true;
        }
        else { }
      })
  }


  ReqHedIdFindFN(billNo: any) {
    // debugger;
    // alert(billNo)
    this.closeResetButton = true;
    this.progress = 0;
    this.displayButton = true;
    this.service.RequAdminFindFN(billNo)
      .subscribe(
        data => {
          this.requestlineDetailsArray().clear();
          this.dataDisplay = 'Data Display Sucessfully....';
          this.HodApprovalForm.patchValue(data.obj);
          this.isDisableStockViewbutton = true;
          let control = this.HodApprovalForm.get('reqLines') as FormArray;
          for (let i = 0; i < data.obj.reqLines.length; i++) {
            var BillLinesAllList1: FormGroup = this.reqitemLinesGroup();
            control.push(BillLinesAllList1);
            // debugger;
            if (data.obj.reqLines[i].adminstatus == 'PENDING' || data.obj.reqLines[i].adminstatus == null) {
              this.displayadminstatus[i] = true;
              this.displayaqty[i] = true;
              this.displayissuedQty[i] = true;
            }
            if (data.obj.reqLines[i].adminstatus == 'REJECT' || data.obj.reqLines[i].adminstatus == 'ISSUE') {
              this.displayadminstatus[i] = false;
              this.displayaqty[i] = false;
              this.displayissuedQty[i] = false;
              this.HodApprovalForm.get('issuedQty')?.disable();
              this.HodApprovalForm.get('adminstatus')?.disable();

              if (data.obj.attribute2 = 'APPROVED') {
                alert(data.obj.attribute2)
                this.displayaqty[i] = false;
                this.displayButton = false;
              }
              if (data.obj.attribute2 != 'APPROVED') {
                alert(data.obj.attribute2)
                this.displayaqty[i] = true;
                this.displayButton = true;
              }

            }
            // debugger;
            if (data.obj.reqLines[i].adminstatus == 'ISSUE' && data.obj.reqLines[i].userstatus == 'ACCEPT') {
              this.displayadminstatus[i] = false;
              this.displayaqty[i] = false;
              this.displayissuedQty[i] = false;
              this.isVisibleLineupdateMast = false;
              this.isVisiblestatusClose = true;
              this.HodApprovalForm.get('issuedQty')?.disable();
              this.HodApprovalForm.get('adminstatus')?.disable();
            }
            if (data.obj.reqstatus != 'OPEN') {
              this.isVisibleLineupdateMast = false;
              this.isVisiblestatusClose = false;
            }
          }
          this.HodApprovalForm.patchValue(data.obj);

          var reqDate1 = data.obj.reqDate;
          var reqDate2 = this.pipe.transform(reqDate1, 'dd-MM-yyyy');
          //  alert(reqDate2)
          this.HodApprovalForm.patchValue({ reqDateNew: this.pipe.transform(data.obj.reqDate, 'dd-MM-yyyy') })
        }
      )
  }



  transData(val: any) {

    return val;
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  LineupdateMast() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
    var orderLines = this.HodApprovalForm.get('reqLines')?.value;
    var orderLinesNew = this.HodApprovalForm.get('reqLines') as FormArray;
    let formValue = this.HodApprovalForm.getRawValue();
    console.log(formValue);
    this.service.UpdateAdminReqBilllineRecorder(formValue)
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.dataDisplay = ''
          this.HodApprovalForm.disable();
          this.displayButton = false;
        } else {
          if (res.code === 400) {
            alert(res.message);

          }
        }
      });
  }



  Approval() {

    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
    var orderLines = this.HodApprovalForm.get('reqLines')?.value;
    var orderLinesNew = this.HodApprovalForm.get('reqLines') as FormArray;
    this.HodApprovalForm.patchValue({ attribute2: 'APPROVED' });
    let formValue = this.HodApprovalForm.getRawValue();
    console.log(formValue);
    this.service.HodApprovalRecorde(formValue)
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.dataDisplay = ''
          this.HodApprovalForm.disable();
          this.displayButton = false;
        } else {
          if (res.code === 400) {
            alert(res.message);

          }
        }
      });

  }



  Reject() {
    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
    var orderLines = this.HodApprovalForm.get('reqLines')?.value;
    var orderLinesNew = this.HodApprovalForm.get('reqLines') as FormArray;
    this.HodApprovalForm.patchValue({ attribute2: 'REJECT' });
    let formValue = this.HodApprovalForm.getRawValue();
    console.log(formValue);
    this.service.HodApprovalRecorde(formValue)
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.dataDisplay = ''
          this.HodApprovalForm.disable();
          this.displayButton = false;
        } else {
          if (res.code === 400) {
            alert(res.message);

          }
        }
      });

  }

}

