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
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  locId:number;
  bathSts:string;
  batchName:string;
  public AccRepLocationList: any = [];
  BatchnameList:any=[];

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

     
      var locId=this.FAReportForm.get('locId')?.value;
      var btchsts=this.FAReportForm.get('bathSts')?.value;
     
  
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



  onSelectOuCity(event:any) {
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
  


  FABatchWiseRepo() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var locId=this.FAReportForm.get('locId')?.value;
    var btchsts=this.FAReportForm.get('bathSts')?.value;
    var batchName=this.FAReportForm.get('batchName')?.value;
      alert(batchName);
    const fileName = 'FA BATCH WISE REPORT OF-' + batchName + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.FAssetBatchWiseReport( locId, btchsts,batchName )
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  

}
