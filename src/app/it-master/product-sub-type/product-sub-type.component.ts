import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ItmasterService } from '../itmaster.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';


interface IcodMaster {
  typeId: number;
  subtypeName: String;
  prodType: number;
  description: string;
  comments: string;
  status: string;
  startDate: Date;
  cmntypeId: number;
  code: string;
  codeType: string;
  prodName: string;
  codeDesc: string;
}


@Component({
  selector: 'app-product-sub-type',
  templateUrl: './product-sub-type.component.html',
  styleUrl: './product-sub-type.component.css'
})
export class ProductSubTypeComponent {
  inventorysubtypeMasterForm: FormGroup;
  typeId: number;
  subtypeName: String;
  prodType: number;
  description: string;
  comments: string;
  startDate: Date;
  cmntypeId: number;
  code: string;
  codeDesc: string;
  codeType: string;
  prodName: string;

  // attribute1:number;

  public CodeTypeList: any = [];
  checkValidation = false;
  allinvsubtypList: any[];
  public AllproducttypeList: any = [];
  //  public AllproducttypeList:any;
  displayEndDate = false;
  displaystartDate = true;
  displayButton = true;
  public status = "Active";
  pipe = new DatePipe('en-US');



  constructor(private fb: FormBuilder, private router: Router, private service: ItmasterService) {
    this.inventorysubtypeMasterForm = fb.group({
      typeId: [],
      subtypeName: [],
      prodType: [],
      description: [],
      comments: [],
      status: [],
      startDate: [],
      cmntypeId: [],
      code: [],
      codeDesc: [],

      codeType: [],
      prodName: [],
      //  attribute1:[],
    })
  }




  typeIdFind(typeId: any) {
    // alert(typeId)
    this.displayButton = false;
    this.displaystartDate = false;
    this.displayButton = true;
    this.inventorysubtypeMasterForm.get('startDate')?.disable();
    this.service.typeIdFindFN(typeId)
      .subscribe(
        data => {
          this.inventorysubtypeMasterForm.patchValue(data.obj);
          // alert(data.obj.startDate)
          this.inventorysubtypeMasterForm.patchValue({ startDate: this.pipe.transform(data.obj.startDate, 'yyyy-MM-dd') });
        }
      );
  }


  transData(val: any) {
    return val;
  }



  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayButton = true;
    this.inventorysubtypeMasterForm.patchValue({ typeId: sessionStorage.getItem('typeId') })
    this.inventorysubtypeMasterForm.patchValue({ subtypeName: sessionStorage.getItem('subtypeName') })
    this.inventorysubtypeMasterForm.patchValue({ prodType: sessionStorage.getItem('prodType') })
    this.inventorysubtypeMasterForm.patchValue({ description: sessionStorage.getItem('description') })
    this.inventorysubtypeMasterForm.patchValue({ comments: sessionStorage.getItem('comments') })
    this.inventorysubtypeMasterForm.patchValue({ status: 'Active' })
    this.inventorysubtypeMasterForm.patchValue({ codstartDateype: sessionStorage.getItem('startDate') });




    this.service.AllproducttypeList()
      .subscribe(
        data => {
          this.AllproducttypeList = data.obj;
          console.log(this.AllproducttypeList);
        }
      );

  }

  get f() { return this.inventorysubtypeMasterForm.controls; }

  inventorysubtypeMaster(inventorysubtypeMasterForm: any) { }


  CheckDataValidations() {
    const formValue: IcodMaster = this.inventorysubtypeMasterForm.value;

    var msg1;

    if (formValue.subtypeName === undefined || formValue.subtypeName === null) {
      this.checkValidation = false;
      msg1 = " SUB TYPE NAME: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.prodType === undefined || formValue.prodType === null) {
      this.checkValidation = false;
      msg1 = " PRODUCT TYPE: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.description === undefined || formValue.description === null) {
      this.checkValidation = false;
      msg1 = " DESCRIPTION: Should not be null....";
      alert(msg1);
      return;
    }


    this.checkValidation = true

  }

  resetMast() {
    window.location.reload();
  }


  closeMast() {
    this.router.navigate(['admin']);
  }


  newMast() {
    const formValue: IcodMaster = this.transData(this.inventorysubtypeMasterForm.value);
    this.CheckDataValidations();
    if (this.checkValidation === true) {
      console.log(formValue);

      this.service.InventorysubypeMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.inventorysubtypeMasterForm.disable();
          // this.typeIdFind(res.obj.codeId)
          this.displayButton = false;

        } else {
          if (res.code === 400) {
            alert(res.message);

          }
        }
      });
    }
  }

  updateMast() {

    const formValue: IcodMaster = this.inventorysubtypeMasterForm.getRawValue();
    this.CheckDataValidations();
    if (this.checkValidation === true) {

      this.service.UpdateinventorysubtypeMasterById(formValue, formValue.typeId).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // window.location.reload();
          this.inventorysubtypeMasterForm.disable();
        } else {
          if (res.code === 400) {
            alert(res.message);
            this.inventorysubtypeMasterForm.disable();
            this.inventorysubtypeMasterForm.reset();
          }
        }
      });
    }
  }

  searchMast() {
    this.service.allinsubtypAllSearch()
      .subscribe(
        data => {
          this.allinvsubtypList = data.obj;
          console.log(this.allinvsubtypList);
        }
      );
  }



}
