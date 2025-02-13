import { Component,ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItmasterService } from '../itmaster.service';
import { DatePipe, Location } from '@angular/common';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-faupdate-form',
  templateUrl: './faupdate-form.component.html',
  styleUrl: './faupdate-form.component.css'
})
export class FAupdateFormComponent {
  FAupdationFrom:FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  displayButton=true;
  @ViewChild('fileInput') fileInput:any;
  files:string;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItmasterService) {
    this.FAupdationFrom = this.fb.group({
      
      ouId:[],
      ouCity:[],
      file:[],


    })

  }


   refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  get f() { return this.FAupdationFrom.controls; }
  itfaupation(FAupdationFrom: any) {
  }


  
  uploadFAupdateCSVFile(event:any){
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    this.displayButton=false;
    var file=this.fileInput.nativeElement.files[0];
     var ceatedby=sessionStorage.getItem('tktNo');
    this.reportService.FAupdatecsvUpoadDocument(formData,file,ceatedby).subscribe((res: any) => {  
      if (res.code === 200) {        
        alert(res.message);
         this.dataDisplay ='File Uploaded Successfully....'
         this.closeResetButton=true;
        //  this.adstkPucahseFrom.disable();
        //  this.adstkPucahseFrom.patchValue({adheaderId:res.obj.adheaderId});
        // this.adheaderIdFindFN(res.obj.adheaderId);
    
       } else {
         if (res.code === 400) {
           alert('Error In File : \n' + res.message+'---'+ res.obj);
           this.dataDisplay ='File Uploading Failed....'
           this.closeResetButton=true;
          //  this.isDisabledUpload=false;
          //  this.displaySalesErrorList=false
         }
       }
     });
  }



 

}
