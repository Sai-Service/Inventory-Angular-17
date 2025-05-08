import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import {AdminMasterService } from '../admin-master.service';
import { FactoryOrValue } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { DeclareVarStmt } from '@angular/compiler';

interface IsupplierMaster {
  suppId: number;
  suppNo: number | null;
  suppno: number | null;
  name: string ;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCode: string;
  state: string;
  mobile1: number;
  mobile2: number;
  emailId: string;
  contactPerson: string;
  contactNo: number;
  taxCategoryName: string;
  ticketNo: string;
  creditDays: number;
  creditLimit: number;
  remarks: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  ouId: string;
  souId: number;
  existing: string;
  ExeAddress: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  saddress4: string;
  scity: string;
  pinCd: string;
  sstate: string;
  status: string;
  smobile1: string;
  smobile2: string;
  endDate: Date;
  sstatus: string;
  emplId: number;
  aadharNo: string;
  msmestartdate:Date;
  msmeenddate:Date;
  // ticketNo:string;
  Ename: string;
  type: string;
  [type: string]:any;
 
  divisionId: number;
  compId: number;
  locId: number;
  //displayMsmeNo:
  // aadharNo:string;
  spanNo: string;
  sGstNo: string;
  sprePayAcct: string;
  prePayAcct: string;
  sliabilityAcct: string;
  staxCatName: string
  siteName: string;
  acctsPayCodeCombId: number;
  prepayCodeCombId: number;
  sacctsPayCodeCombId: number;
  sprepayCodeCombId: number;
  displaysite: boolean;
  createDebitMemoFlag: string;
  semailId: string;
  screateDebitMemoFlag: string;
  supTdsTyp: string;
  tdsCompanyType:string;
  supTdsYN: string;
  sbankName: string;
  sacctNo: string;
  sifscCode: string;
  supName: string;
  MSMESUBTYPE:String;
  MSMETYPE:String;
  code:string|null;
  codeDesc:string|null;
  agrestartdate:Date;
  agreenddate:Date;
}


@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrl: './vendor-master.component.css'
})
export class VendorMasterComponent {
  supplierMasterForm: FormGroup;
  isDisabled = false;
  suppId: number;
  suppNo: number | null;
  suppno: number | null;
  name: string;
  submitted = false;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCode: string;
  state: string;
  mobile1: number;
  mobile2: number;
  emailId: string;
  contactPerson: string;
  contactNo: number;
  taxCategoryName: string;
  ticketNo: string;
  creditDays: number;
  creditLimit: number;
  remarks: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  msmeYN = '';
  msmeNo: string
  msmestartdate:Date;
  msmeenddate:Date;
  agrestartdate:Date;
  agreenddate:Date;
  displayMsmeNo = false;
  showNewMsmeDateRow: boolean = false;
  newMsmeStartDate: string = '';
  newMsmeEndDate: string = '';
  newAgreementStartDate: string = '';
  newAgreementEndDate: string = '';
  public status = 'Active';
  supplierSiteMasterList: any[];
  lstcomments: any;
  lstcomments2: any[];
  array: any[];
  lstcommentsId: any[];
  displayButton = true;
  ouId: string | null;
  souId: number;
  existing: string;
  ExeAddress: string;
  saddress1: string | null;
  saddress2: string | null;
  saddress3: string | null;
  saddress4: string |null;
  scity: string|null;
  pinCd: string |null;
  sstate: string |null;
  smobile1: string;
  smobile2: string;
  suppSiteId: number;
  endDate: Date;
  sstatus: string;
  displayInactive = true;
  displayTdsTyp = true;
  type: string;
  Status1: any;
  code:string;
  fromDate: string = '';
  toDate: string = '';
  // aadharNo:string;
  ouIdSelected: number;
  emplId: number;
  public cityList: any[];
  public pinCodeList: any =[];
  public stateList: any[];
  public taxCategoryList: any =[];
  public ouIdList: any = [];
  public statusList:any= [];
  // public supplierSiteMasterList1 : Array<string>[][];
  public lstcommentsTax: any[];
  // public cityList: any =[];
  public cityList1: any;
  public YesNoList: any = [];
  displayadditional: boolean = true;
  aadharNo: string;
  divisionId: number;
  compId: number;
  supplierTyp: any[];
  displaySupplier: Boolean;
  displayEmployee: Boolean;
  // ticketNo:string;
  Ename: string;
  locId: number;
  displaySaveBtn: boolean = true;
  displayUpdBtn: boolean;
  displaySavBtn:boolean;
  spanNo: string;
  sGstNo: string;
  sprePayAcct: string;
  sacctsPayCodeCombId: number;
  sprepayCodeCombId: number;
  sliabilityAcct: string;
  staxCatName: string;
  siteName: string;
  public InterBrancList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: any = [];
  public locIdList: Array<string> = [];
  segment11: string;
  lookupValueDesc1: string;
  segment2: number;
  lookupValueDesc2: string;
  segment3: number;
  trans: string;
  lookupValueDesc3: string;
  segment4: number;
  lookupValueDesc4: string;
  segment5: string;
  lookupValueDesc5: string;
  showModal: boolean;
  segmentNameList: any;
  branch: any;
  acctsPayCodeCombId: number;
  liabilityAcct: string;
  prePayAcct: string;
  prepayCodeCombId: number;
  displaysite: boolean = true;
  createDebitMemoFlag = 'N';
  currentOp: string;
  semailId: string;
  screateDebitMemoFlag: string;
  displayenable = true;
  supTdsTyp: string;
  tdsCompanyType:string;
  getTdsType: any;
    supTdsYN: string;
  sbankName: string;
  sacctNo: string;
  sifscCode: string;
  supNamedata: any;
  supName: string;
  MSMETYPE:string;
  MSMESUBTYPE:String;
  public tdsSectionList: any = [];
  public AllmsmesupptypeList :any=[];
  public msmebussubtype :any=[];
  public minDate = new Date();
  public maxDate = new Date();
  onSelectItemNameFnList:any=[];
  AbstractControl:any;
  codeDesc:string[];

  constructor(private fb: FormBuilder, private router: Router, private service: AdminMasterService) {
    this.supplierMasterForm = fb.group({
      suppId: [],
      suppno: ['',Validators.required],
      supName: [],
      suppNo: ['',Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150), Validators.pattern('[a-zA-Z,.& 0-9/-]*')]],
      address1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address3: ['', [Validators.maxLength(50)]],
      address4: ['', [Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      contactNo: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      mobile1: ['', [Validators.required]],
      mobile2: [''],
      contactPerson: ['', [Validators.pattern('[a-zA-Z /-]*')]],
      taxCategoryName: [''],
      creditDays: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      creditLimit: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      remarks: [''],
      emailId: ['', [Validators.email]],
      state: ['', [Validators.required]],
      // gstNo: ['', [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}$"),Validators.minLength(15), Validators.maxLength(15)]],
      gstNo: [],
      // panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      panNo: [''],
      tanNo: ['',Validators.required],
      msmeYN: [],
      msmeNo: [],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]{6}$")]],
      status: ['', [Validators.nullValidator]],
      divisionId: [],
      compId: [],
      type: [],
      locId: [],
      ouId: [''],
      souId: [''],
      ExeAddress: [],
      saddress1: ['', [Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress2: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress3: ['', [Validators.maxLength(50)]],
      saddress4: ['', [Validators.maxLength(50)]],
      scity: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      pinCd: ['', [Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]],
      sstate: [],
      smobile1: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      smobile2: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      suppSiteId: [],
      endDate: [],
      sstatus: [],
      emplId: [],
      aadharNo: [],
      address1E: ['', [Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address2E: ['', [Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address3E: ['', [Validators.maxLength(50)]],
      address4E: ['', [Validators.maxLength(50)]],
      cityE: [],
      pinCodeE: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      stateE: [],
      ticketNo: [],
      Ename: [],
      spanNo: [],
      sGstNo: [],
      sprePayAcct: [],
      sliabilityAcct: [],
      staxCatName: [],
      siteName: [],
      acctsPayCodeCombId: [],
      liabilityAcct: [],
      segment11: [],
      lookupValueDesc1: [],
      segment2: [],
      lookupValueDesc2: [],
      segment3: [],
      lookupValueDesc3: [],
      segment4: [],
      lookupValueDesc4: [],
      segment5: [],
      lookupValueDesc5: [],
      prePayAcct: [],
      prepayCodeCombId: [],
      sacctsPayCodeCombId: [],
      sprepayCodeCombId: [],
      createDebitMemoFlag: [],
      semailId: [],
      screateDebitMemoFlag: [],
      supTdsTyp: [],
      tdsCompanyType:[],
      supTdsYN: ['', [Validators.required]],
      sbankName: [],
      sacctNo: [],
      sifscCode: [],
      MSMETYPE:[],
      MSMESUBTYPE:[],
      msmestartdate:[],
      msmeenddate:[],
      agrestartdate:[],
      agreenddate:[],
    
    });
  }

  get f() { return this.supplierMasterForm.controls}

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.supplierMasterForm.patchValue({ creditDays: '0', creditLimit: '0' });
    this.lstcomments = [];
    this.lstcomments.supplierSiteMasterList = [];
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.ouId = (sessionStorage.getItem('ouId'));
    // this.compId = 41;

    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data.obj;
          console.log(this.cityList);
        }
      );
    this.service.supplierType()
    .subscribe(
      data => {
        this.supplierTyp = data.obj;
        // console.log(this.supplierTyp);
      }
    )
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data.obj;
          console.log(this.statusList);
        }
      );

    this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data.obj;
          console.log(this.YesNoList);
        }
      );

    this.service.StateList()
      .subscribe(
        data => {
          this.stateList = data.obj;
          console.log(this.stateList);
        }
      );


      this.service.tdsSectionList()
      .subscribe(
        data => {
          this.tdsSectionList = data.obj;
          console.log(this.tdsSectionList);
        }
      );

      this.service.AllmsmesupptypeList()
    .subscribe(
      data => {
        this.AllmsmesupptypeList = data.obj;
        console.log(this.AllmsmesupptypeList);
      }
    )

    this.service.msmebussubtype()
    .subscribe(
      data => {
        this.msmebussubtype = data.obj;
        console.log(this.msmebussubtype);
      }
    )

  }

  private formatDate(date: string): string {
    const d = new Date(date); 
    const day = d.getDate(); 
    const month = d.toLocaleString('default', { month: 'short' }); 
    const year = d.getFullYear(); 
    return `${day}-${month}-${year}`; 
  }

  supplierMaster(supplierMaster: any) {
  }
  currentAcctTyp: string;
 


  onOptionsupTypeSelected(event:any){
    if (this.type != undefined) {
      if (event != this.type) {
        window.location.reload();
      }
    }

    this.type = this.supplierMasterForm.get('type')?.value;
 

    if (event === 'Employee') {
      // alert('Hi')
      this.displaySupplier = false;
      this.displayEmployee = true;
    } if (event === 'Supplier') {
      this.displaySupplier = true;
      this.displayEmployee = false;
    }
  }

  transData(val:any) {
    delete val.suppSiteId;
    delete val.existing;
    delete val.ExeAddress;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.saddress4;
    delete val.scity;
    delete val.pinCd;
    delete val.sstate;
    delete val.smobile1;
    delete val.smobile2;
    delete val.aadharNo;
    return val;
  }
  transDataforS(val:any) {
    // delete val.suppId;
    delete val.suppNo;
    delete val.name;
    delete val.address1;
    delete val.address2;
    delete val.address3;
    delete val.address4;
    delete val.city;
    delete val.pinCode;
    delete val.state;
    delete val.mobile1;
    delete val.mobile2;
    delete val.ticketNo;
    delete val.creditDays;
    delete val.creditLimit;
    delete val.remarks;
    delete val.existing;
    // delete val.ExeAddress;
    delete val.existing;
    delete val.ExeAddress;
    delete val.status;
    return val;
  }

  newsupplierMast() {
    const formValue: IsupplierMaster = this.transData(this.supplierMasterForm.value);
    this.service.SupliMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.suppNo = res.obj.suppNo;
        this.searchBySuppCode(this.suppNo);
        this.displayadditional = false;
        this.displaySaveBtn = false;
      } else {
        if (res.code === 400) {
          alert('Supplier Master Details Validation Error. Please Enter Validate Data !!!'+' '+res.message+' '+res.obj);
          
        }
      }
    });
  }

  UpdateSitesupplierMastExeSite() {
    const formValue: IsupplierMaster = this.transDataforS(this.supplierMasterForm.getRawValue());
   
    formValue.sacctsPayCodeCombId = this.supplierMasterForm.get('sacctsPayCodeCombId')?.value;
    formValue.sprepayCodeCombId = this.supplierMasterForm.get('sprepayCodeCombId')?.value;
    this.service.UpdateSiteSupliMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
      
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
         
        }
      }
    });
  }
  transDataSupp(val:any) {
    delete val.suppSiteId;
    delete val.existing;
    delete val.ExeAddress;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.saddress4;
    delete val.scity;
    delete val.pinCd;
    delete val.sstate;
    delete val.smobile1;
    delete val.smobile2;
    // delete val.aadharNo;
    // delete val.remarks;
    delete val.existing;
    delete val.ExeAddress;
    delete val.existing;
    delete val.ExeAddress;
    delete val.contactNo;
    delete val.tanNo;
    delete val.gstNo;
    delete val.panNo;
    delete val.emailId;
    // delete val.endDate;
    return val;
  }
  updatesupplierMast() {
    debugger;
    const formValue: IsupplierMaster = this.transDataSupp(this.supplierMasterForm.getRawValue());
   
    this.service.UpdateSupliMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message+'--'+res.obj);
          this.supplierMasterForm.reset();
        }
      }
    });
  };

  gstVerification(event: any) {

    var gstno = this.supplierMasterForm.get('gstNo')?.value
    // alert(gstno+'gst');
    // var sGstnoVal = this.customerMasterForm.get('sGstNo').value
    if (gstno === '') {
      this.supplierMasterForm.patchValue({ 'gstNo': 'GSTUNREGISTERED' });
      return;
    }
    else {
      // var regex: string = "{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}";
      var regex: string = "[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}";
      var p = new PatternValidator();
      var patt = new RegExp('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}');
      //  alert(gstno.length+'gstno.length');
      var validgst = patt.test(gstno);
      if (validgst === false && gstno.length == 15) {
        alert('Please enter valid GST Number');
      }

      else {
        // alert('Please enter valid GST Number');
        return ;
      }
      // return validgst;

      const gstNo1 = gstno.substr(2, 10);
      // this.panNo = gstNo1;
      alert('Gst verificaition' + gstNo1);
      this.supplierMasterForm.patchValue({ panNo: gstNo1 });
      var res = gstno.substr(0, 2);
      console.log(res);
      // alert(res+'res');
      const state = (this.supplierMasterForm.get('state')?.value).toUpperCase();
      console.log(state);
      console.log(this.state === 'MAHARASHTRA' && res === 27);
      switch (state) {
        case 'MAHARASHTRA':
          if (res != 27) {
            alert('Kindly entered correct GST No Start with 27');
            this.supplierMasterForm.get('gstNo')?.reset();
          }
          break;
        case 'GOA':
          if (res != 30) {
            alert('Kindly entered correct GST No Start with 30');
            this.supplierMasterForm.get('gstNo')?.reset();
          }
          break;
        case 'ANDHRA PRADESH':
          if (res != 28) {
            alert('Kindly entered correct GST No Start with 28');
            this.supplierMasterForm.get('gstNo')?.reset();
          }
          break;
        case 'KARNATAKA':
          if (res != 29) {
            alert('Kindly entered correct GST No Start with 29');
            this.supplierMasterForm.get('gstNo')?.reset();
          }
          break;
        case 'KERALA':
          if (res != 32) {
            alert('Kindly entered correct GST No Start with 32');
            this.supplierMasterForm.get('gstNo')?.reset();
          }
          break;
        case 'TELANGANA':
          if (res != 36) {
            alert('Kindly entered correct GST No Start with 36');
            this.supplierMasterForm.get('gstNo')?.reset();
          }
          break;
      }

    }

  }

  gstVerification1(event: any) {
    var gstno = this.supplierMasterForm.get('sGstNo')?.value
    // var sGstnoVal = this.customerMasterForm.get('sGstNo').value
    if (gstno === '') {
      this.supplierMasterForm.patchValue({ 'sGstNo': 'GSTUNREGISTERED' });
      return;
    }
    else {
      // var regex: string = "{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}";
      var regex: string = "[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}";
      var p = new PatternValidator();
      var patt = new RegExp('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}');
      //  alert(gstno.length+'gstno.length');
      var validgst = patt.test(gstno);
      if (validgst === false && gstno.length == 15) {
        alert('Please enter valid GST Number');
      }

      else {
        // alert('Please enter valid GST Number');
        return ;
      }
      // return validgst;

      const gstNo1 = gstno.substr(2, 10);
      // this.panNo = gstNo1;
      // alert('Gst verificaition'+ gstNo1);
      this.supplierMasterForm.patchValue({ 'spanNo': gstNo1 });
      var res = gstno.substr(0, 2);
      console.log(res);
      // alert(res+'res');
      const state = (this.supplierMasterForm.get('sstate')?.value).toUpperCase();
      console.log(state);
      console.log(this.state === 'MAHARASHTRA' && res === 27);
      switch (state) {
        case 'MAHARASHTRA':
          if (res != 27) {
            alert('Kindly entered correct GST No Start with 27');
            this.supplierMasterForm.get('sGstNo')?.reset();
          }
          break;
        case 'GOA':
          if (res != 30) {
            alert('Kindly entered correct GST No Start with 30');
            this.supplierMasterForm.get('sGstNo')?.reset();
          }
          break;
        case 'ANDHRA PRADESH':
          if (res != 28) {
            alert('Kindly entered correct GST No Start with 28');
            this.supplierMasterForm.get('sGstNo')?.reset();
          }
          break;
        case 'KARNATAKA':
          if (res != 29) {
            alert('Kindly entered correct GST No Start with 29');
            this.supplierMasterForm.get('sGstNo')?.reset();
          }
          break;
        case 'KERALA':
          if (res != 32) {
            alert('Kindly entered correct GST No Start with 32');
            this.supplierMasterForm.get('sGstNo')?.reset();
          }
          break;
        case 'TELANGANA':
          if (res != 36) {
            alert('Kindly entered correct GST No Start with 36');
            this.supplierMasterForm.get('sGstNo')?.reset();
          }
          break;
      }

    }

  }

  resetsupplierMast() {
    window.location.reload();
  }

  closesupplierMast() {
    this.router.navigate(['admin']);
  }

  createSitesupplierMast() {
    const formValue: IsupplierMaster = this.transDataforS(this.supplierMasterForm.value);
    this.service.SupliMasterSubmitForSite(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.isDisabled = true;
        alert(res.message);
        this.displayadditional = false;
        var acctNo = this.supplierMasterForm.get('suppNo')?.value;
        this.searchBySuppCode(acctNo);
        // this.supplierMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled = false;
          // this.supplierMasterForm.reset();s
        }
      }
    });
  }

  Select(suppSiteId: number) {
    this.displaysite = false;
    // alert(suppSiteId);
    this.lstcomments2 = this.lstcomments.supplierSiteMasterList;
    console.log(this.lstcomments2);
    let select = this.lstcomments2.find(d => d.suppSiteId === suppSiteId);
    let ouName = this.ouIdList.find((d:any) => d.ouId === select.ouId);
    // let select = this.lstcomments.find(d => d.suppSiteId === suppSiteId);
    if (select) {
      this.suppSiteId = select.suppSiteId
      this.saddress1 = select.address1
      this.saddress2 = select.address2
      this.saddress3 = select.address3
      this.saddress4 = select.address4
      this.scity = select.city
      this.pinCd = select.pinCd
      // this.sstate = select.state
      this.contactNo = select.contactNo
      this.contactPerson = select.contactPerson
      this.emailId = select.emailId
      this.gstNo = select.gstNo
      this.smobile1 = select.mobile1
      this.smobile2 = select.mobile2
      this.sbankName = select.bankName
      this.sacctNo = select.accountNo
      this.sifscCode = select.ifscCode
      // this.spanNo=select.panNo
      this.taxCategoryName = select.taxCategoryDesc

      this.supplierMasterForm.patchValue({
        sGstNo: select.gstNo,
        spanNo: select.panNo,
        sstate: select.state1,
        staxCatName: select.taxCategoryName,
        sstatus: select.status,
        souId: select.ouId,
        siteName: select.siteName,
        sliabilityAcct: select.attribute1,
        sprePayAcct: select.attribute2,
        sacctsPayCodeCombId: select.acctsPayCodeCombId,
        sprepayCodeCombId: select.prepayCodeCombId,
        screateDebitMemoFlag: select.createDebitMemoFlag
      });
      
    }
  }
  ExeAddressEvent(e:any) {
    if (e.target.checked) {
      this.supplierMasterForm.get('siteName')?.reset();
      this.supplierMasterForm.get('souId')?.reset();
      this.supplierMasterForm.get('sliabilityAcct')?.reset();
      this.supplierMasterForm.get('sprePayAcct')?.reset();
      this.saddress1 = this.supplierMasterForm.get('address1')?.value;
      this.saddress2 = this.address2
      this.saddress3 = this.address3
      // this.saddress4 = this.address4
      this.scity = this.supplierMasterForm.get('city')?.value;
      this.pinCd = this.supplierMasterForm.get('pinCode')?.value;
      this.sstate = this.state
      this.supplierMasterForm.patchValue({ smobile1: this.supplierMasterForm.get('mobile1')?.value });
      this.supplierMasterForm.patchValue({ semailId: this.supplierMasterForm.get('emailId')?.value });
      this.supplierMasterForm.patchValue({ spanNo: this.supplierMasterForm.get('panNo')?.value });
      this.supplierMasterForm.patchValue({ sGstNo: this.supplierMasterForm.get('gstNo')?.value });
      this.displaysite = true;
    }
    else {
      this.saddress1 = null;
      this.saddress2 = null;
      this.saddress3 = null;
      this.saddress4 = null;
      this.scity = null;
      this.pinCd = null;
      this.sstate = null;
    }
  }

  searchsupplierMast() {
    this.service.getsupplierMastSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

  onOptionTdsSelect(event: any) {
    if (event === 'Y') {
      this.displayTdsTyp = false;
      this.service.getTdsType()
        .subscribe(data => {
          this.getTdsType = data;
        }
        );
    }
    else {
      this.displayTdsTyp = true;
    }
  }

  searchBySuppCode(suppno:any) {
    this.currentOp = 'SEARCH';
    if (suppno != undefined) {
      this.service.getsearchBySuppCode(suppno)
        .subscribe(
          data => {
            this.lstcomments = data;
            console.log(this.lstcomments.supplierSiteMasterList);
            this.supplierMasterForm.patchValue(this.lstcomments);
            this.displayenable = false;
            this.supplierMasterForm.get('type')?.disable();
            this.supplierMasterForm.patchValue({
              panNo: this.lstcomments.supplierSiteMasterList[0].panNo,
              gstNo: this.lstcomments.supplierSiteMasterList[0].gstNo,
              prePayAcct: this.lstcomments.supplierSiteMasterList[0].attribute2,
              liabilityAcct: this.lstcomments.supplierSiteMasterList[0].attribute1,
              taxCategoryName: this.lstcomments.supplierSiteMasterList[0].taxCategoryName,
              createDebitMemoFlag: this.lstcomments.supplierSiteMasterList[0].createDebitMemoFlag,
              contactPerson: this.lstcomments.supplierSiteMasterList[0].contactPerson,
              contactNo: this.lstcomments.supplierSiteMasterList[0].contactNo,
              
            });

            
            this.city = this.lstcomments.city
            this.displayInactive = true;
       
            this.displaySaveBtn = false;
            this.displayUpdBtn = true;
            this.displaySavBtn=false;
            this.displayadditional = false;
            this.supplierMasterForm.get('gstNo')?.disable();
            this.supplierMasterForm.get('panNo')?.disable();
            this.supplierMasterForm.get('tanNo')?.disable();
            this.supplierMasterForm.get('liabilityAcct')?.disable();
            this.supplierMasterForm.get('prePayAcct')?.disable();
            this.supplierMasterForm.get('prePayAcct')?.disable();
            this.currentOp = 'INSERT';
           
          }
        );
    }
  }
  searchBySuppId(suppId:any) {
    if (suppId != undefined) {
      this.service.getsearchBySuppCode(suppId)
        .subscribe(
          data => {
            this.lstcommentsId = data;
            console.log(this.lstcommentsId);
            this.supplierMasterForm.patchValue(this.lstcommentsId);
          }
        );
    }
  }
  onOuIdSelected(souId: any) {
    console.log(souId);
    // if(ouId!=undefined){
    var siteState = this.supplierMasterForm.get('sstate')?.value;
    // alert(siteState+'state');
    if (souId != undefined && siteState != undefined) {
      // alert(' if');
      this.service.taxCategorySiteList1(souId, siteState)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.staxCatName = data.taxCategoryName;
            this.supplierMasterForm.patchValue({ staxCatName: data.taxCategoryName });
            // console.log(this.taxCategoryNameList);

          }
        );
    }
    // this.SearchTaxCat(ouId);

  }
  SearchTaxCat(ouId:any) {
    // alert(ouId);
    if (ouId > 0) {
      this.service.getTaxCat(ouId)
        .subscribe(
          data => {
            this.taxCategoryList = data;
            console.log(this.taxCategoryList);
            // this.allFunction(locId);
          }
        );
    }
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.supplierMasterForm.get('sstatus')?.value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.supplierMasterForm.get('endDate')?.reset();
      this.displayInactive = true;
    }
  }
  onOptionsSelectedSupp(event: any) {

    this.Status1 = this.supplierMasterForm.get('status')?.value;

    if (this.Status1 === 'Inactive') {

      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.supplierMasterForm.get('endDate')?.reset();
      this.displayInactive = true;
    }
  }

  onOptionStateSeleted(event: any) {
    // alert(city);
    if (this.currentOp === 'SEARCH') {
      return;
    }
    if (this.ouId != undefined && event != undefined) {
      this.service.taxCategorySiteList1(this.ouId, event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.taxCategoryName = data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );
    }
    // }
    // );
  }

  onOptionSiteStateSeleted(event: any) {
    // alert(event+'--'+this.supplierMasterForm.get('souId').value);
    if (this.currentOp === 'SEARCH') {
      return;
    }
    if (this.supplierMasterForm.get('souId')?.value != undefined && event != undefined) {
      this.service.taxCategorySiteList1(this.supplierMasterForm.get('souId')?.value, event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.staxCatName = data.taxCategoryName;
            this.supplierMasterForm.patchValue({ staxCatName: data.taxCategoryName })
            // console.log(this.taxCategoryNameList);

          }
        );
    }
  }
  onKey(event: any) {
    const gstNo1 = this.gstNo.substr(3, 10);
    this.panNo = gstNo1;
  }


  onOptionsSelectedCity1(event: any) {
    // alert(city);
    // this.service.cityList1(city)
    // .subscribe(
    //   data => {
    //     this.cityList1 = data;
    //     console.log(this.cityList1);
    //     // this.state=this.cityList1.attribute1;
    //     this.sstate=this.cityList1.attribute1;
    let select1 = this.cityList.find((d:any) => d.codeDesc === event);

    this.supplierMasterForm.patchValue({ sstate: select1.attribute1 });
    // console.log(this.cityList1.attribute1);
    // this.country = 'INDIA';
    var ouId = this.supplierMasterForm.get('souId')?.value;
    if (ouId != undefined && this.supplierMasterForm.get('sstate')?.value != undefined) {
      this.service.taxCategorySiteList1(ouId, this.supplierMasterForm.get('sstate')?.value)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            // this.staxCatName=data.taxCategoryName;
            this.supplierMasterForm.patchValue({ staxCatName: data.taxCategoryName });
            // console.log(this.taxCategoryNameList);

          }
        );
    }
    // });
  }
  onOptionGstno(event: any, tanNo:any) {
    // alert(event);
    var gstno = event.target.value;
    // alert(gstno);
    if (gstno.length == 15 && gstno != 'GSTUNREGISTERED') {

      const gstNo1 = gstno.substr(2, 10);
      this.panNo = gstNo1;
      tanNo.focus();
    }
    else {
      // this.gstNo='GSTUNREGISTERED';
      if (gstno.length == 0) {
        this.supplierMasterForm.patchValue({ 'gstNo': 'GSTUNREGISTERED' });
      }
      // panNo.focus();
    }
    return;

  }
  searchByConName(supName:any) {
    this.service.supplierName(supName)
      .subscribe(
        data => {
          this.supNamedata = data.obj;
        });
  }

  onMSMESelected(msmeYN: any) {
    // alert(msmeYN);
    if (msmeYN === 'Y') {
      this.displayMsmeNo = true;
    }
    else {
      this.displayMsmeNo = false;
    }
  }

  // onAgreementEndDateChange(selectedDate: string) {
  //   const today = new Date().toISOString().split('T')[0];
  
  //   if (selectedDate === today) {
  //     this.showNewMsmeDateRow = true;
  //   } else {
  //     this.showNewMsmeDateRow = false;
  //   }
  // }

  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      //       this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      
      this.message = "Do you want to SAVE the changes(Yes/No)?"

    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

  executeAction() {
    if (this.msgType.includes("Save")) {

      this.newsupplierMast();
    }

    if (this.msgType.includes("Reset")) {
      this.resetsupplierMast();
      //       this.itemMasterForm.reset();
    }

    if (this.msgType.includes("Close")) {
      // this.closeItemCatMast();
      this.router.navigate(['admin']);
    }
    return;
  }
  Reset(){
    window.location.reload();

  }
  Close(){
    this.router.navigate(['admin']);

  }

  public validation(): boolean {
    var validdata:any;
    const formValue: IsupplierMaster = this.supplierMasterForm.value;
    if (formValue.type === 'Supplier') {
      if (formValue.contactPerson === undefined) {
        alert('Please enter Contact  Person Name');
        validdata = false;
      }
      if (formValue.contactNo === undefined) {
        alert('Please enter Contact  No');
        validdata = false;

      }
      return validdata;
    }
    if (formValue.panNo != '') {

      var regex: string = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
      var p = new PatternValidator();
      var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
      validdata = patt.test(formValue.panNo);
      if (validdata === false) {
        alert('Please enter valid PAN Number');
      }
      return validdata;

    } else {
      alert('Please enter valid PAN Number');
      return false;
    }
  }



  onSelectItemType(event:any){
    var codeDesc=event.target.value;
    var itemType1 = codeDesc.substr(codeDesc.indexOf(': ') + 1, codeDesc.length);
    // var itemType12=trim(itemType1);
    var itemcat = this.AllmsmesupptypeList.find((itemcat:any) => itemcat.codeDesc === codeDesc);
    console.log(itemcat);
    
    var codeType=itemcat.codeDesc
 
    this.service.onSelectReqItemNameFn(codeType)
    .subscribe(
      data => {
        this.onSelectItemNameFnList = data.obj;
        console.log(this.onSelectItemNameFnList);
      }
    );
    
   }
}
