import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service'
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver'


const MIME_TYPES:any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-asset-history-form',
  templateUrl: './asset-history-form.component.html',
  styleUrl: './asset-history-form.component.css'
})
export class AssetHistoryFormComponent {
  AseetHistryForm:FormGroup;
  itemCode:string;
  ouId:number;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;


  constructor(private fb: FormBuilder, private router: Router, private service: ItReportService, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.AseetHistryForm = this.fb.group({
  
      ouId:[],
      itemCode:[],
      
      
    })
  }

  refresh() {
    window.location.reload();
  }
  
  close() {
    this.location1.back();
  }
  
  get f() { return this.AseetHistryForm.controls; }
  AssetHistyreport(AseetHistryForm: any) {
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.AseetHistryForm.patchValue({ ouId: sessionStorage.getItem('ouId') })
  
  
  }

 
  AssetHistoryRepolDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var itemcode = this.AseetHistryForm.get('itemCode')?.value;
    const fileName = 'Asset History Form -'+itemcode + '.pdf'; 
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.AssetHistoryForm(itemcode)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
       
      })
  }
  
}
