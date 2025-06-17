import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Url } from 'url';
import { FormsModule } from '@angular/forms';
// import { MasterService } from 'src/app/master/master.service'
import { DatePipe, formatDate, Location } from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { ItTransService } from '../it-trans.service';
import { saveAs } from 'file-saver';


interface gatepasGenerator {
  gatepassId: number;
  gatepassNo: string;
  toDate: '';
  createdBy: string;
  gateType: string;
  gpitemType: string;
  gpDepName: string;
  gpDiv: string;
  gpOuName: string;
  gpRemark: string;
  gpitemCode: string;
  gitemSn: string;
  gatepassLoc: string;
  gptypeId: string;
  gpouId: Number;
  gptoLocname: string;
  gpvendName: string;
  loginLocation:string;


}

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-gate-pass-gen',
  templateUrl: './gate-pass-gen.component.html',
  styleUrl: './gate-pass-gen.component.css'
})
export class GatePassGenComponent {
  gatePassForm: FormGroup;
  gatepassId: number;
  gatepassNo: string;
  toDate: '';
  createdBy: string;
  gateType: string;
  gpitemType: string;
  gpDepName: string;
  gpDiv: string;
  gpOuName: string;
  gpRemark: string;
  gptypeId: string;
  gpouId: Number;
  gptoLocname: string;
  gpvendName: string;
  pipe = new DatePipe('en-US');
  date = new Date();
  Date = '';
  ItemCodeGetSearchFn: Array<string> = [];
  gpitemCode: string;
  gitemSn: string;
  gatepassLoc: string;
  GatepassTypeList: any = [];
  AllvendornameList: any = [];
  tolocationName: any = [];
  // isVisibleVendorlist: boolean = false;
  displayVendorAndLoc=false;
  isVisibleloactionList: boolean = false;
  displayButton = true;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  lstcomments: any;
  srlNo:number;
  displayItemCode:Array<boolean>=[];
  displayremovebutton:boolean=true;
  displayLoction=false;
  loginLocation:string;





  constructor(private fb: FormBuilder, private router: Router, private service: ItTransService, private router1: ActivatedRoute) {
    this.Date = formatDate(this.date, 'dd-MM-yyyy', 'en-US');
    this.gatePassForm = fb.group({
      gatepassId: [],
      gatepassNo: [],
      toDate: [],
      createdBy: [],
      gateType: [],
      gpRemark: [],
      gatepassLoc: [],
      gptypeId: [],
      gpouId: [],
      gpheaderId:[],
      gptoLocname: [],
      gpvendName: [],
      loginLocation:[],
      gatepassLines: this.fb.array([this.GateLinesGroup(),

      ]),
    })
  }
  GateLinesGroup() {
    return this.fb.group({
      srlNo:[],
      gpitemCode: [],
      gitemSn: [],
      gatepassLoc: [],
      gpDepName: [],
      gpDiv: [],
      gpitemType:[],
    })
  }


  get f() { return this.gatePassForm.controls; }

  gatePGen(gatePassForm: any) { }

  transData(val: any) {
    return val;

  }

  ngOnInit(): void{
    $("#wrapper").toggleClass("toggled");
    this.displayItemCode[0]=true;
    var loginName = (sessionStorage.getItem('empName'));
    var locName = (sessionStorage.getItem('locName'));

    this.gatePassForm.patchValue({ createdBy:loginName });
    this.gatePassForm.patchValue({ loginLocation: locName });
    
    var ouID = (sessionStorage.getItem('ouId'));
    this.gatePassForm.patchValue({ gpouId: ouID });


    this.service.GatepassTypeList()
      .subscribe(
        data => {
          this.GatepassTypeList = data.obj;
        }
      );

    this.service.AllvendornameList()
      .subscribe(
        data => {
          this.AllvendornameList = data.obj;
          console.log(this.AllvendornameList);
        }
      );


    this.service.getLocationId(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.tolocationName = data.obj;
          console.log(this.tolocationName);

        }
      );

    this.gatePassForm.get('gatepassId')?.disable();
    this.gatePassForm.get('createdBy')?.disable();
    this.gatePassForm.get('gpitemType')?.disable();
    this.gatePassForm.get('gitemSn')?.disable();
    this.gatePassForm.get('gatepassLoc')?.disable();
    this.gatePassForm.get('gpDepName')?.disable();
    this.gatePassForm.get('gpDiv')?.disable();


    var patch = this.gatePassForm.get('gatepassLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        srlNo: 1,

      }
    );
  }



  refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  GatepasslineDetailsArray(): FormArray {
    return <FormArray>this.gatePassForm.get('gatepassLines')
  }
  

  addRow(i: number) {
    this.displayItemCode[i]=false;
      this.GatepasslineDetailsArray().push(this.GateLinesGroup());
      var len = this.GatepasslineDetailsArray().length;
      var patch = this.gatePassForm.get('gatepassLines') as FormArray;
      (patch.controls[len - 1]).patchValue(
        {
          srlNo: len,
         
        }
      );
      this.displayItemCode[len-1]=true;

  }

  RemoveRow(i:number){
    alert('you confirm to delate this line!!!!')
    var gatepLineArrray = this.gatePassForm.get('gatepassLines') as FormArray;
    var GatepLineArrrayDis = gatepLineArrray.getRawValue();
    if (GatepLineArrrayDis.length === 1){
      alert('Not Able to Delete This Line.!');
      return;
    }
    this.GatepasslineDetailsArray().removeAt(i);
  }


  GetPassgenData() {
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Bill Recorder Save is progress....Do not refresh the Page';
    var orderLines = this.gatePassForm.get('gatepassLines')?.value;
    var orderLinesNew = this.gatePassForm.get('gatepassLines') as FormArray;
    const formValue = this.transData(this.gatePassForm.value);
    console.log(formValue);
    let jsonData = this.gatePassForm.getRawValue();
    this.service.GatepasssgenForm(jsonData).subscribe((res: any) => {
      if (res.code === 200) {
         alert(res.message);
        this.dataDisplay = 'Gate Pass Genreted Successfully';
        this.gatePassForm.disable();
        this.displayButton = false;
        this.gatePassForm.patchValue({gatepassId: res.obj.gpheaderId });
        this.gatePassForm.patchValue({gatepassNo: res.obj.gatepassNo });
      
      } 
        if (res.code === 400) {
          alert(res.message);

        }
      
    });
  }





  gpcodeFind(gpcode: any) {
    this.displayButton = false;
    this.gatePassForm.get('gpitemCode')?.disable();
    this.gatePassForm.get('gatepassNo')?.disable();
    this.progress = 0;
    this.dataDisplay = '';
    this.displayVendorAndLoc = true;
    var gpouId = sessionStorage.getItem('ouId')
    this.service.gpCodeFindFN(gpcode,gpouId)
      .subscribe(
        data => {
          if (data.code == 200) {
             this.GatepasslineDetailsArray().clear();
            this.dataDisplay = 'Data Display Successfully....';
            let control = this.gatePassForm.get('gatepassLines') as FormArray;
            for (let i = 0; i < data.obj.gatepassLines.length; i++) {
              var BillLinesAllList: FormGroup = this.GateLinesGroup();
              console.log(BillLinesAllList);
              control.push(BillLinesAllList);
              this.displayItemCode[i] =false;
              this.gatePassForm.disable();
              this.gatePassForm.patchValue({gatepassId: data.obj.gpheaderId });
              this.GatepasslineDetailsArray().controls[i].patchValue({srlNo: data.obj.srlNo, gpitemCode: data.obj.gpitemCode, gpDepName: data.obj.gpDepName, gitemSn: data.obj.gitemSn, gatepassLoc: data.obj.gatepassLoc})
              this.progress = 0;
              this.dataDisplay = 'Data Display Successfuly';
              this.gatePassForm.patchValue(data.obj);
            }
          }
          else {
            alert(data.message)
            this.dataDisplay = 'Data Not Found';
          }
        }

      );


  }

  ItemCodeget(event: any ,i:any) {
    var itemCode=event.target.value;
    this.service.ItemCodeGetSearchFn(sessionStorage.getItem('ouId'), itemCode)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.GatepasslineDetailsArray().controls[i].patchValue({gitemSn: data.obj.productserialNo, gpDepName: data.obj.deptName, gpDiv: data.obj.divName, gpitemType: data.obj.itemsubType, gatepassLoc: data.obj.locName})
            //this.gatePassForm.patchValue({ gitemSn: data.obj.productserialNo, gpDepName: data.obj.deptName, gpDiv: data.obj.divName, gpitemType: data.obj.itemType, gatepassLoc: data.obj.locName })

          } else {
            if (data.code === 400) {
              alert(data.message);

            }
          }
        }
      );
  }



  GatepassType(event: any) {
    var gateType = event.target.value;
    var loga = this.gatePassForm.get('gateType')?.value;
    if (gateType === 'SCRAP') {
      // this.isVisibleVendorlist = true;
      this.displayVendorAndLoc=true;
      // this.isVisibleloactionList = false;
      this.displayLoction=false;
    }
    if (gateType === 'REPAIR') {
      // this.isVisibleVendorlist = true;
      this.displayVendorAndLoc=true;
      // this.isVisibleloactionList = false;
      this.displayLoction=false;

    }
    if (gateType === 'TRANSFER') {
      // this.isVisibleVendorlist = false;
      this.displayVendorAndLoc=false;
      this.displayLoction = true;
    }
  }

  Gatepassprint() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'Gate Pass Print' + '.pdf';
    var gatepassNo = this.gatePassForm.get('gatepassNo')?.value;
    // alert(gatepassNo);

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.Gatepassprint(gatepassNo)
      .subscribe(data => {
        saveAs(new Blob([data]), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Gate Pass Print Generated Succesfully.'

      })
  }

  searchMast() {
    this.service.allGatePassSearch(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          this.closeResetButton = true;
          this.dataDisplay = 'Data Display Succesfully.'
        }
      );
  }
}
