import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service'
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';
import { trim } from 'jquery';

const MIME_TYPES :any= {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-faassetreports',
  templateUrl: './faassetreports.component.html',
  styleUrl: './faassetreports.component.css'
})
export class FAassetreportsComponent {
  FAReportForm:FormGroup;
  closeResetButton=true;
  oufieldvisible:boolean=true;
  oufieldvisibleOu:boolean=true;
  dataDisplay: any;
  progress = 0;
  locId:number;
  bathSts:string;
  batchName:string;
  public AccRepLocationList: any = [];
  BatchnameList:any=[];
  public AlllocationitemList:any=[];

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.FAReportForm = this.fb.group({
      
      ouId:[],
      ouCity:[],
      file:[],
      locId:[],
      bathSts:[],
      batchName:[],

    })

  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
      
    this.reportService.getAccLocationSearch(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.AccRepLocationList = data.obj;
          console.log(this.AccRepLocationList);
        }
      );
  
    if(sessionStorage.getItem('attribute3')==='ALLFA'){
      this.oufieldvisibleOu=true;
      this.oufieldvisible=false;
      // this.FAReportForm.get('bathSts')?.disable();
      // this.FAReportForm.get('batchName')?.disable();
      // this.FAReportForm.get('locId')?.disable();
    }
    if(sessionStorage.getItem('attribute3')!=='ALLFA'){   
      this.oufieldvisibleOu=false;
      this.oufieldvisible=true;
      // this.FAReportForm.get('ouId')?.disable();
     
    }

    

     
      var locId=this.FAReportForm.get('locId')?.value;
      var btchsts=this.FAReportForm.get('bathSts')?.value;
     
      this.reportService.AlllocationitemList()
      .subscribe(
        data => {
          this.AlllocationitemList = data.obj;
          console.log(this.AlllocationitemList);
        }
      );

  }



   refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  get f() { return this.FAReportForm.controls; }
  itfainventory(FAReportForm: any) {
  }



  onSelectBatchName(event:any) {
    var locId = event.target.value;
    var btchsts = event.target.value;
    // var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    // var itemType12 = trim(itemType1);
    var locId=this.FAReportForm.get('locId')?.value;
      var btchsts=this.FAReportForm.get('bathSts')?.value;
    this.reportService.getBatchNameSearch(locId,btchsts)
      .subscribe(
        data => {
          this.BatchnameList = data.obj;
          console.log(this.BatchnameList);
        }
      );
  }
  

  onSelectOuCity(event:any) {
    var itemType = event.target.value;
    var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
    var itemType12 = trim(itemType1);
    this.reportService.getAllOuLocationId(itemType12)
      .subscribe(
        data => {
          this.AccRepLocationList = data.obj;
          console.log(this.AccRepLocationList);
        }
      );
  }


  FABatchWiseRepo() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var locId=this.FAReportForm.get('locId')?.value;
    var btchsts=this.FAReportForm.get('bathSts')?.value;
    var batchName=this.FAReportForm.get('batchName')?.value;
    var oucId=this.FAReportForm.get('ouId')?.value;
    if(oucId===null){ locId = sessionStorage.getItem('ouId') }
    if (locId === null) { locId = '' }
    if (batchName === null) { batchName = '' }
    if (btchsts === null) { btchsts = '' }
    alert(batchName);
    const fileName = 'FA BATCH WISE REPORT OF-' + batchName + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.FAssetBatchWiseReport(oucId,batchName,locId,btchsts )
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  

}
