import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-pov-exp-master-repor',
  templateUrl: './pov-exp-master-repor.component.html',
  styleUrl: './pov-exp-master-repor.component.css'
})
export class PovExpMasterReporComponent {
 povExpreport:FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  locId:number;
  bathSts:string;
  batchName:string;
  public AccRepLocationList: any = [];
  BatchnameList:any=[];

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.povExpreport= this.fb.group({
      
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
     
    

  }



   refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  get f() { return this.povExpreport.controls; }
  itfacominventory(povExpreport: any) {
  }


  FACommonRepo() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report in Running....Do not refresh the Page';
    const fileName = 'PROVISIONAL EXPENSES BILLING REPORT' + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.provExpensesBillingReport()
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = 'Report downloaded successfully..... CHECK IN DIVISE DOWNLOAD FOLDER';
      })
  }



  
}