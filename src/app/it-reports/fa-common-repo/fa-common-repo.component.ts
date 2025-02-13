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
  selector: 'app-fa-common-repo',
  templateUrl: './fa-common-repo.component.html',
  styleUrl: './fa-common-repo.component.css'
})
export class FaCommonRepoComponent {
  FACommReportForm:FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  locId:number;
  bathSts:string;
  batchName:string;
  public AccRepLocationList: any = [];
  BatchnameList:any=[];

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.FACommReportForm= this.fb.group({
      
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

     
      var locId=this.FACommReportForm.get('locId')?.value;
      var btchsts=this.FACommReportForm.get('bathSts')?.value;
     
  
  }



   refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  get f() { return this.FACommReportForm.controls; }
  itfacominventory(FACommReportForm: any) {
  }


  FACommonRepo() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'FA COMMON REPORT (SCANNER FORMAT)' + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.FAssetCommonReport(sessionStorage.getItem('loginName'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  
}
