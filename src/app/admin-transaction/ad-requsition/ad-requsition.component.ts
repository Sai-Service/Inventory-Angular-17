import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminTransactionService } from '../admin-transaction.service';

import { Location } from "@angular/common";


@Component({
  selector: 'app-ad-requsition',
  templateUrl: './ad-requsition.component.html',
  styleUrl: './ad-requsition.component.css'
})
export class AdRequsitionComponent {
  AdreqForm:FormGroup;
  reqRemarks:string;
reqlnNo:number;
reqhdNo:number;
srlNo:number;	
city:number;
location:number;
dept:number;
qty:number;
reqUsername:string;
itemcat:string;
itemName:string;
admintktNo:string;
userstatus:string;
viewAllReqisision:any=[]
viewAllStokList:any=[]
createdBy:string;
creationDate:Date;
deptId:number;
adminstatus:string;
issuedQty:number;
receivedQty:number;
balanceQty:number;
reqUsertktno:string;
attribute1:String;
AllRequiDeprtList:any=[];
avlQty:number;

displayButton= true;
public sub: any;


displayRequDep:Array<boolean>=[];
displayRequItem:Array<boolean>=[];
displayLineflowStatusCode: Array<boolean> = [];
displayLineflowStatusCode1:Array<boolean> =[];
displayBillType1:Array<boolean>=[];
isDisableStockViewbutton:boolean = false;
displayadminstatus:Array<boolean>=[];
displayuserstatus:Array<boolean>=[];
displayaqty:Array<boolean>=[];
displayissuedQty:Array<boolean>=[];
isVisibleLineupdateMast: boolean = true;
isVisiblestatusClose:boolean=false;
rejReason:string;
rejQty:number;

dataDisplay: any;
progress = 0;
closeResetButton = true;
RejectreasonList:any=[];

pipe = new DatePipe('en-US');
  now = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: AdminTransactionService,private router1: ActivatedRoute,
    private adminServiceService: AdminTransactionService) {
    this.AdreqForm = fb.group({
      reqhdNo:[],
      reqDate:[],
      reqDateNew:[],
      reqRemarks:[],
      city:[],
      loginArray1:[],
      loginArray:[],
      locName:[],
      location:[],
        dept:[],
        reqUsername:[], 
        admintktNo:[],
        reqUsertktno:[],
        attribute1:[],
        reqLines: this.fb.array([this.reqitemLinesGroup()]),
    })
   }


   reqitemLinesGroup() {
    return this.fb.group({
      reqlnNo:[],
      reqhdNo:[],
      srlNo:[{ value: '', disabled: true }],
      qty:[{ value: '', disabled: true }],
      itemName:[{ value: '', disabled: true }],
      deptId:[],
      tktNo:[],
      itemcat:[{ value: '', disabled: true }],
      userstatus:[{ value: '', disabled: true }],
      adminstatus:[],
      issuedQty:[],
      receivedQty:[],
      balanceQty:[{ value: '', disabled: true }],
      rejReason:[0],
      rejQty:[{ value: '', disabled: true }],
      avlQty:[{ value: '', disabled: true }],
    })
  }

   Adrequisision(AdreqForm: any) { }
   get f() { return this.AdreqForm.controls; }

   requestlineDetailsArray(): FormArray {
    return <FormArray>this.AdreqForm.get('reqLines')
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var patch = this.AdreqForm.get('reqLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
        userstatus:'PENDING',
        adminstatus:'PENDING'
      }
    );

    this.sub = this.router1.params.subscribe(params => {
      this.reqhdNo = params['reqhdNo'];
      if (this.reqhdNo != undefined) {
        this.ReqHedIdFindFN(this.reqhdNo);
        this.AdreqForm.get('reqhdNo')?.disable();
        // this.isVisibleOrderFind = false;
      }
    });

    this.AdreqForm.get('reqhdNo')?.disable();
    this.AdreqForm.get('reqDateNew')?.disable();
    this.AdreqForm.get('reqDate')?.disable();
    this.AdreqForm.get('reqUsername')?.disable();
    this.AdreqForm.get('dept')?.disable();
    this.AdreqForm.get('locName')?.disable();
    this.AdreqForm.get('location')?.disable();
    this.AdreqForm.get('admintktNo')?.disable();
    this.AdreqForm.get('balanceQty')?.disable();
    this.AdreqForm.get('userstatus')?.disable();
    this.AdreqForm.get('rejQty')?.disable();

    

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


  

  onSelectRejectQty(event:any,i:any){
    var rejectResoan = event.target.value;
    var orderLinesNew = this.AdreqForm.get('reqLines') as FormArray;
    var orderLines = this.AdreqForm.get('reqLines')?.value;
    var balQty = orderLines[i].balanceQty;
    // alert(balQty)
    orderLines.controls[i].patchValue({rejQty:balQty,balanceQty:0})
  }

  ViweStockDetails(attribute1:any) {
    this.displayButton = false;
    var ouId = Number(sessionStorage.getItem('ouId'));
     
      var LocId=this.AdreqForm.get('location')?.value;
      var Stock =this.AdreqForm.get('attribute1')?.value;
    this.service.viewStokListFn(ouId,LocId,Stock)
      .subscribe((res: any) => {
          if (res.code == 200) {
            this.viewAllStokList=res.obj;
          }
          else {(res.code == 400)
            alert('Stock Name Not Present')
          }
        }
  
      );
  
  }

  viewDocument(){
    var deptId = Number(sessionStorage.getItem('deptId'));
  var ouId = Number(sessionStorage.getItem('ouId'));
    var tktNo =(sessionStorage.getItem('tktNo')) ;
    var stsreq='OPEN';
    this.service.viewReqisisionListFn(ouId,deptId,tktNo,stsreq)
    .subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
          this.viewAllReqisision=res.obj;
          
        // this.dataDisplay ='File Uploaded Sucessfully....'
        // this.closeResetButton=true;
      }
      else{}
  })
  }


  ReqHedIdFindFN(billNo:any) {
    // debugger;
    // alert(billNo)
    this.closeResetButton = true;
    this.progress = 0;
    this.displayButton=false;
      this.service.RequAdminFindFN(billNo)
        .subscribe(
          data => {
              this.requestlineDetailsArray().clear();
              this.dataDisplay = 'Data Display Sucessfully....';
              this.AdreqForm.patchValue(data.obj);
              this.isDisableStockViewbutton = true;
              let control = this.AdreqForm.get('reqLines') as FormArray;
              for (let i = 0; i < data.obj.reqLines.length; i++){
                var BillLinesAllList1: FormGroup = this.reqitemLinesGroup();
                control.push(BillLinesAllList1);
                // debugger;
                if (data.obj.reqLines[i].adminstatus == 'PENDING' || data.obj.reqLines[i].adminstatus==null) {
                  this.displayadminstatus[i] = true;
                  this.displayaqty[i]=true;
                  this.displayissuedQty[i]=true;
                }
                if (data.obj.reqLines[i].adminstatus == 'REJECT' || data.obj.reqLines[i].adminstatus == 'ISSUE'){
                  this.displayadminstatus[i] = false;
                  this.displayaqty[i]=false;
                  this.displayissuedQty[i]=false;
                  this.AdreqForm.get('issuedQty')?.disable();
                  this.AdreqForm.get('adminstatus')?.disable();
                  


                }
                // debugger;
                if (data.obj.reqLines[i].adminstatus == 'ISSUE' && data.obj.reqLines[i].userstatus=='ACCEPT') {
                  this.displayadminstatus[i] = false;
                  this.displayaqty[i]=false;
                  this.displayissuedQty[i]=false;
                  this.isVisibleLineupdateMast=false;
                  this.isVisiblestatusClose=true;
                  this.AdreqForm.get('issuedQty')?.disable();
                  this.AdreqForm.get('adminstatus')?.disable();
                }
                if (data.obj.reqstatus != 'OPEN'){
                  this.isVisibleLineupdateMast=false;
                  this.isVisiblestatusClose=false;
                 }
              }
             this.AdreqForm.patchValue(data.obj);
            
            // this.AdreqForm.patchValue({ reqDateNew: this.pipe.transform(data.obj.receiptDt, 'dd-MM-yyyy') });
            //   if (data.obj.reqstatus != 'OPEN'){
            //     for (let i = 0; i < data.obj.reqLines.length; i++){
            //       if (data.obj.reqLines[i].adminstatus == 'ISSUE' && data.obj.reqLines[i].userstatus=='ACCEPT')
            //     this.displayadminstatus[i] = false;
            //       this.displayaqty[i]=false;
            //       this.displayissuedQty[i]=false;
            //       this.isVisibleLineupdateMast=false;
            //   }
            //  }
            //  else{
            //   this.isVisibleLineupdateMast=true;
            //  }
             var reqDate1 = data.obj.reqDate;
             var reqDate2 = this.pipe.transform(reqDate1, 'dd-MM-yyyy');
            //  alert(reqDate2)
             this.AdreqForm.patchValue({reqDateNew:this.pipe.transform(data.obj.reqDate, 'dd-MM-yyyy')})
            }
           )
        }


        statusClosed(){
          var shipHeaderNo = this.AdreqForm.get('reqhdNo')?.value;
          this.service.changeStatus(shipHeaderNo).subscribe((res: any) => {
            if (res.code==200){
              alert(res.message);
              this.ReqHedIdFindFN(res.obj)
            }
            else{
              alert(res.message)
            }
          })
        }


        onKey(i:any, event:any) {
          
          var arrayControlNew = this.AdreqForm.get('reqLines') as FormArray;
          var arrayControl = arrayControlNew.getRawValue();
        }

        onKeyStockCal(i:any,event:any){
          // event.target.disabled = true;
          var arrayControlNew = this.AdreqForm.get('reqLines') as FormArray;
                var arrayControl = arrayControlNew.getRawValue();
                var qtyFix = arrayControl[i].qty;
                var issuedQtyFix = arrayControl[i].issuedQty;
                // if(){}
                var BalanceStock= Math.round((qtyFix-issuedQtyFix +Number.EPSILON) * 100) / 100;
                var itemName= arrayControl[i].itemName;
                var patch = this.AdreqForm.get('reqLines') as FormArray;
                patch.controls[i].patchValue({ balanceQty: BalanceStock,rejQty:BalanceStock });
                this.adminServiceService.onhandQtyFn(itemName,sessionStorage.getItem('locId'))
                .subscribe(
                  data => {
                    // alert(data.obj.length)
                    if (data.obj.length===0){
                      var patch11 = this.AdreqForm.get('reqLines') as FormArray;
                      this.displayadminstatus[i]=false;
                      this.AdreqForm.get('adminstatus')?.disable();
                      alert('Selected Item Stock Not Available. Please Check.!');
                      patch11.controls[i].patchValue({ avlQty: 0 ,adminstatus:'REJECT',issuedQty:0});
                    }
                    else{
                    var patch = this.AdreqForm.get('reqLines') as FormArray;
                    patch.controls[i].patchValue({ adminstatus:'ISSUE'});
                  }
                  }
                );
      
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

        LineupdateMast() { 
          this.closeResetButton = false;
          this.progress = 0;
          this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
          var orderLines = this.AdreqForm.get('reqLines')?.value;
          var orderLinesNew = this.AdreqForm.get('reqLines') as FormArray;
          // const formValue = this.transData(this.AdreqForm.value).getRawValue();
          let formValue = this.AdreqForm.getRawValue();
          console.log(formValue); 
          this.service.UpdateAdminReqBilllineRecorder(formValue)
          .subscribe((res: any) => {
              if (res.code === 200) {
                alert(res.message);
                this.dataDisplay=''
                this.AdreqForm.disable();
                this.displayButton=false;
              } else {
                if (res.code === 400) {
                  alert(res.message);
                  
                }
              }
            });
          }

      }

