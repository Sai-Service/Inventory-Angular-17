import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from,Observable } from 'rxjs';
import { Url } from 'url';
import { FormsModule } from '@angular/forms';
import { DatePipe ,formatDate,Location} from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { AdminTransactionService } from '../admin-transaction.service';
import { saveAs } from 'file-saver';




interface Manugatepass {
  gatePassId:number;
  userLogin:string;
  divName:string |null;
  userLoginLocation:string;
  gatePassGate:string;
  department:string;
  gatePassType:string;
  itemCat:string;
  itemName:string;
  regNo:string;
  itemorvehicleDetails:string;
  serialNo:string;
  qty:number;
  name:string;
  contactNo:string;
  address:string;
  authorisedBy:string;
  remark:string;
  locId:number;
  createdBy:string;
  creationDate:string;
  creationDate1:string;

}

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-admingatepassgen',
  templateUrl: './admingatepassgen.component.html',
  styleUrl: './admingatepassgen.component.css'
})
export class AdmingatepassgenComponent {
  ManualGatepassform:FormGroup
  gatePassId:number;
  userLogin:string;
  userLoginLocation:string;
  gatePassGate:string;
  department:string;
  gatePassType:string;
  itemCat:string;
  itemName:string;
  regNo:string;
  itemorvehicleDetails:string;
  serialNo:string;
  qty:number;
  name:string;
  contactNo:string;
  address:string;
  authorisedBy:string;
  remark:string;
  locId:number;
  createdBy:string;
  pipe = new DatePipe('en-US');
  date=new Date();
  creationDate:Date;
  creationDate1:Date;
  displayButton = true;
  purchaseDt:Date;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  GatepassTypeList:any[];
  invType:string;
  itemMap=new Map<string, any[]>();
  itemMap2= new Map<string, any[]>();
  onSelectItemNameFnList:any[];
  AllreqItemCatagList:any[];
  displayItemame=true;
  displaygatePassType=true;
   allpendinggateList:any[];
  

  

  constructor(private fb: FormBuilder, private router: Router,private router1: ActivatedRoute, private adminSer: AdminTransactionService) {
    this.ManualGatepassform = this.fb.group({
      gatePassId:[],
  userLogin:[],
  userLoginLocation:[],
  gatePassGate:[],
  department:[],
  gatePassType:[],
  itemCat:[],
  itemName:[],
  regNo:[],
  itemorvehicleDetails:[],
  serialNo:[],
  qty:[],
  name:[],
  contactNo:[],
  address:[],
  itemcat:[],
  authorisedBy:[],
  remark:[],
  locId:[],
  createdBy:[],
  creationDate:[],
  creationDate1:[],
   returnDate: [{ value: '', disabled: true }],
    }) }

    transData(val:any) {
      return val;
    }
  
     refresh() {
      window.location.reload();
    }
  
    close() {
      // this.location1.back();
      this.router.navigate(['admin']);
    }
  
    get f() { return this.ManualGatepassform.controls; }
    gatepassForm(ManualGatepassform: any) {
      
    }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var Date =this.pipe.transform(this.date, 'dd-MM-yyyy') 
    this.ManualGatepassform.patchValue({ userLogin:sessionStorage.getItem('tktNo'),userLoginLocation:sessionStorage.getItem('locName'),department:sessionStorage.getItem('deptName'),creationDate1:Date,
      regNo:'NA',itemorvehicleDetails:'NA',serialNo:'NA',name:'NA',contactNo:'NA',address:'NA',qty:'1'
    });    //////,city : Number(sessionStorage.getItem('ouId'))
    


    var locId=sessionStorage.getItem('locName')
    this.adminSer.allpendinggateList(locId)
    .subscribe(
      data => {
        this.allpendinggateList = data.obj;
      }
    );


    this.adminSer.GatepassTypeList()
  .subscribe(data => {
    this.GatepassTypeList = data.obj.map((item: any) => {
      const value = item.codeDesc || '';

      const parts = value.split(':');

      return {
        ...item,
        codeDesc: parts.length > 1 ? parts[1].trim() : value
      };
    });
  });


    this.adminSer.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    );
  
    this.disableFiled();
  }

  disableFiled(){
    this.ManualGatepassform.get('userLogin')?.disable();
    this.ManualGatepassform.get('userLoginLocation')?.disable();
    // this.ManualGatepassform.get('gatePassId')?.disable();
    this.ManualGatepassform.get('creationDate1')?.disable();
    this.ManualGatepassform.get('department')?.disable();
  }

  newMast() {  
    var gatType = this.ManualGatepassform.get('gatePassType')?.value;
    var regNo = this.ManualGatepassform.get('regNo')?.value;
   var itemorvehicleDetails = this.ManualGatepassform.get('itemorvehicleDetails')?.value;
   var itemcat = this.ManualGatepassform.get('itemcat')?.value;
   var itemName = this.ManualGatepassform.get('itemName')?.value;
   var authorisedBy = this.ManualGatepassform.get('authorisedBy')?.value;
   const returnDate = this.ManualGatepassform.get('returnDate')?.value;
   const remark = this.ManualGatepassform.get('remark')?.value;
   
   if (gatType ==null || gatType ==undefined || gatType == ''){
    alert('Please Select the Gate Pass Type.!');
    return;
   }
    if (gatType =='Asset Repair' && !returnDate){
    alert('Please Select the Return date..!');
    return;
   }
   if ((regNo ==null || regNo ==undefined || regNo == '')||(itemorvehicleDetails ==null || itemorvehicleDetails ==undefined || itemorvehicleDetails == '')){
    alert('Please Enter Registration No or Vehicle Details.!');
    return;
   }
   if ((itemcat ==null || itemcat ==undefined || itemcat == '')||(itemName ==null || itemName ==undefined || itemName == '')){
    alert('Please Enter Item Category And Item Name.!');
    return;
   }
    if (authorisedBy ==null || authorisedBy ==undefined || authorisedBy == ''){
    alert('Please Enter authorisedBy Name.!');
    return;
   }

   if (remark ==null || remark ==undefined || remark == ''){
    alert('Please Enter Remark...!');
    return;
   }
    const formValue: Manugatepass = this.ManualGatepassform.getRawValue();
    formValue.divName = sessionStorage.getItem('divisionName');

    this.adminSer.Gatepassgenrated(formValue).subscribe((data: any) => {
      if (data.code === 200) {
        alert(data.message);    
        this.ManualGatepassform.disable();
      
        this.ManualGatepassform.patchValue({ gatePassId: data.obj.gatePassId });
        this.displayButton=false;
       
      } else {
        if (data.code === 400) {
          alert(data.message);
     
        }
      }
    });
  }



GatepassidFind(gatePassId:any){
    // alert(gatePassId)
    this.displayButton=false;
    this.displayItemame=false;
    this.displaygatePassType=false;
    this.adminSer.AdgatepassidFind(gatePassId)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("Gatepass No Not Found..");
              return;
            }
            if (data.code === 200) {
            this.ManualGatepassform.disable();
            this.ManualGatepassform.patchValue(data.obj);
            this.ManualGatepassform.patchValue({ gatePassId: data.obj.gatePassId });
          }}
        )
  }
onGatePassTypeChange(event: any) {
  const value = event.target.value;
  alert(value)

  if (value === 'Asset Repair') {
    this.ManualGatepassform.get('returnDate')?.enable();
  } else {
    this.ManualGatepassform.get('returnDate')?.disable();
    this.ManualGatepassform.get('returnDate')?.reset();
  }
}
  
  onSelectItemType(event:any){
    var itemType=event.target.value;
    // this.adminSer.onSelectReqItemNameFn1(itemType)
    // .subscribe(
    //   data => {
    //     this.onSelectItemNameFnList = data.obj;       
    //   }
    // );
  const ouId = sessionStorage.getItem('ouId');
    this.adminSer.onSelectReqItemNameFn1(itemType)
  .subscribe(data => {
    this.onSelectItemNameFnList = data.obj.filter((item:any) => {
      return ['mumbai', 'pune', 'kolhapur', 'goa', 'cochin', 'hyderabad']
        .some(city => item[city] === ouId);
    });

    console.log(this.onSelectItemNameFnList);
  });
    
    
   }

   gatePassView(){
    var orderNumber = this.ManualGatepassform.get('gatePassId')?.value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.adminSer.viewGatePassFn(orderNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
      })
   }




   pendingGateIdFind(itemId:any){



   }


}
