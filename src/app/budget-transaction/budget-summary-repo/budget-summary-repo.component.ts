import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver'
import { BudgetTraService } from '../budget-tra.service';
import { trim } from 'jquery';


const MIME_TYPES:any= {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};
interface budgetsearchfrom{

  budgetheaderId:number;
  cityId:number;
  companyName:string;
  divName:string;
  locName:string;
  deptName:string;
  finYear:string;

}
@Component({
  selector: 'app-budget-summary-repo',
  templateUrl: './budget-summary-repo.component.html',
  styleUrl: './budget-summary-repo.component.css'
})
export class BudgetSummaryRepoComponent {
  budgetsummryForm:FormGroup;
  finYear:string;
  finyearId:number;
  cityName:string;
  cityId:number;
  locName:string;
  locationId:number;
  isVisibleFynlyerList:boolean=true;
  isVisibleSuperRepo:boolean;
  isVisibleLocList:boolean;
  FainancialyearList:any=[];
  locIdList:any=[];
  getAllOuLocationIdFn:any=[];
  public AlllocationitemList: any=[];
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  

  constructor(private fb: FormBuilder, private router: Router,private service: BudgetTraService) {
    this.budgetsummryForm = fb.group({
      finyearId:[],
      finYear:[],
      cityName:[],
      cityId:[],
      locName:[],
      locationId:[],


     })}


  
     get f() { return this.budgetsummryForm.controls; }

     BudgetSumForm(budgetsummryForm: any) { }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled")

  

    // var Ouid =sessionStorage.getItem("ouId");
    // this.budgetsummryForm.patchValue({cityId:Ouid});


    this.service.TolocationIdList(sessionStorage.getItem('ouId')).subscribe(data => {
      this.locIdList = data.obj;
      let locCodeList = this.locIdList.filter((locId:any) => (locId.locId))
      console.log(locCodeList);
      this.locIdList=locCodeList;
  });

    this.service.FainancialyearList().subscribe(data => {
      this.FainancialyearList = data.obj;
      let FainancialyearListfn = this.FainancialyearList.filter((cmntypeId:any )=> (cmntypeId.cmntypeId))
      console.log(FainancialyearListfn);
      this.FainancialyearList=FainancialyearListfn;
    })




    this.service.AlllocationitemList()
  .subscribe(
    data => {
      this.AlllocationitemList = data.obj;
      console.log(this.AlllocationitemList);
    }
  );
  

  if(sessionStorage.getItem('role')==='SuperAdmin'){
    this.isVisibleLocList=true;
    this.isVisibleSuperRepo=true;
   


  }
  if(sessionStorage.getItem('role')==='Admin'){
    this.isVisibleLocList=false;
    var sss =sessionStorage.getItem("ouCity");
    this.budgetsummryForm.patchValue({cityName:sss});
    var cityId = sessionStorage.getItem('ouId')
    this.budgetsummryForm.patchValue({cityId:cityId});
    this.isVisibleSuperRepo=false;
   
  }
  if(sessionStorage.getItem('role')==='User'){
    this.isVisibleLocList=false;  
    var sss =sessionStorage.getItem("ouCity");
    this.budgetsummryForm.patchValue({cityName:sss});
    var cityId = sessionStorage.getItem('ouId')
    this.budgetsummryForm.patchValue({cityId:cityId});
    this.isVisibleSuperRepo=false;
   
  }



   
  }

  onlocationissueselect(event:any){
    var locName = event.target.value;
    var locNameList = this.locIdList.find((d:any) => d.locName === locName)
    console.log(locNameList);
    var locId=locNameList.locId;
    this.budgetsummryForm.patchValue({locationId:locNameList.locId});
   
  }

  onselectFainacialyear(event:any){
    var codeDesc = event.target.value;
    var FainancialyearList = this.FainancialyearList.find((d:any) => d.codeDesc === codeDesc)
    console.log(FainancialyearList);
    var locId=FainancialyearList.cmntypeId;
    this.budgetsummryForm.patchValue({finyearId:FainancialyearList.cmntypeId});
  }

  



  refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  onSelectOuCity(event:any) {
    var itemType = event.target.value;
    var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    var itemType12 = trim(itemType1);
    this.service.getAllOuLocationId(itemType12)
      .subscribe(
        data => {
          this.getAllOuLocationIdFn = data.obj;
          console.log(this.getAllOuLocationIdFn);
        }
      );
  }


  reportDetails(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'BUDGET SUMMARY REPORT -' + '.xlsx';
    var locId = this.budgetsummryForm.get('locationId')?.value;
    var ouId = this.budgetsummryForm.get('cityId')?.value;
    var finyer = this.budgetsummryForm.get('finYear')?.value;
    var deptid= ""
    if (ouId == null){ouId=sessionStorage.getItem('ouId')}
    if (ouId == null){ouId=''}
    if (locId === null) { locId = '' }
    if (finyer === null) { finyer = '' }
    alert(finyer + '---locId' + locId);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.BudgetSummuryReport(finyer,ouId,locId,deptid)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
        
      })
  }


  reportDetailsSuper(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'BUDGET SUMMARY REPORT ' + '.xlsx';
    var locId = this.budgetsummryForm.get('locationId')?.value;
    var ouId = this.budgetsummryForm.get('cityId')?.value;
    var finyer = this.budgetsummryForm.get('finYear')?.value;
    var deptid= ""
    if (ouId == null){ouId=''}
    if (locId === null) { locId = '' }
    if (finyer === null) { finyer = '' }
    alert(finyer + '---locId' + locId);
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.BudgetSummuryReport(finyer,ouId,locId,deptid)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report Generated Successfully...'
        
      })
  }
  

  

}
