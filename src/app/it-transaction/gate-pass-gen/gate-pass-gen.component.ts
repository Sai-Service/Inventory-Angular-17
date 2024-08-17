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
  createBy: string;
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
  createBy: string;
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






  constructor(private fb: FormBuilder, private router: Router, private service: ItTransService, private router1: ActivatedRoute) {
    this.Date = formatDate(this.date, 'dd-MM-yyyy', 'en-US');
    this.gatePassForm = fb.group({
      gatepassId: [],
      gatepassNo: [],
      toDate: [],
      createBy: [],
      gateType: [],
      gpitemType: [],
      gpDepName: [],
      gpDiv: [],
      gpOuName: [],
      gpRemark: [],
      gpitemCode: [],
      gitemSn: [],
      gatepassLoc: [],
      gptypeId: [],
      gpouId: [],
      gptoLocname: [],
      gpvendName: [],
    })
  }


  get f() { return this.gatePassForm.controls; }

  gatePGen(gatePassForm: any) { }

  transData(val: any) {
    return val;

  }

  ngOnInit(): void{
    $("#wrapper").toggleClass("toggled");
    var loginName = (sessionStorage.getItem('empName'));
    this.gatePassForm.patchValue({ createBy: loginName });

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
    this.gatePassForm.get('createBy')?.disable();
    this.gatePassForm.get('gpitemType')?.disable();
    this.gatePassForm.get('gitemSn')?.disable();
    this.gatePassForm.get('gatepassLoc')?.disable();
    this.gatePassForm.get('gpDepName')?.disable();
    this.gatePassForm.get('gpDiv')?.disable();

  }



  refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  GetPassgenData() {
    const formValue: gatepasGenerator = this.gatePassForm.getRawValue();
    this.service.GatepasssgenForm(formValue).subscribe((data: any) => {
      if (data.code === 200) {
        alert(data.message);
        this.displayButton = false;
        this.gatePassForm.disable();
        this.gatePassForm.patchValue({ gatepassNo: data.obj.gatepassNo, gatepassId: data.obj.gatepassId });
      } else {
        if (data.code === 400) {
          alert(data.message);

        }
      }
    });
  }

  gpcodeFind(gatepassNo: any) {
    // alert(gatepassNo)
    this.displayButton = false;
    this.gatePassForm.get('gpitemCode')?.disable();
    this.gatePassForm.get('gatepassNo')?.disable();
    this.progress = 0;
    this.dataDisplay = '';
    this.displayVendorAndLoc=true;
    // this.isVisibleVendorlist = true;

    // this.isVisibleloactionList = true;
    // var gatepassNo = this.gatePassForm.get('gatepassNo').value;
    // alert(gatepassNo);
    this.service.gpCodeFindFN(sessionStorage.getItem('ouId'), gatepassNo)
      .subscribe(
        data => {
          if (data.code == 200) {
            this.gatePassForm.patchValue(data.obj);
            this.gatePassForm.disable();
            this.progress = 0;
            this.dataDisplay = 'Data Display Successfuly';
          }
          else {
            alert(data.message)
            this.dataDisplay = 'Data Not Found';
          }
        }

      );


  }

  ItemCodeget(gpitemCode: any) {
    this.service.ItemCodeGetSearchFn(sessionStorage.getItem('ouId'), gpitemCode)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.gatePassForm.patchValue({ gitemSn: data.obj.productserialNo, gpDepName: data.obj.deptName, gpDiv: data.obj.divName, gpitemType: data.obj.itemType, gatepassLoc: data.obj.locName })

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
      this.isVisibleloactionList = false;
    }
    if (gateType === 'REPAIR') {
      // this.isVisibleVendorlist = true;
      this.displayVendorAndLoc=true;
      this.isVisibleloactionList = false;

    }
    if (gateType === 'TRANSFER') {
      // this.isVisibleVendorlist = false;
      this.displayVendorAndLoc=false;
      this.isVisibleloactionList = true;
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
