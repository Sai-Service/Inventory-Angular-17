import { Component,ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service'
import { DatePipe, Location } from '@angular/common';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-itfacsv-upload-form',
  templateUrl: './itfacsv-upload-form.component.html',
  styleUrl: './itfacsv-upload-form.component.css'
})
export class ITFAcsvUploadFormComponent{
  FAinventorycsvFrom:FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  displayButton=true;
  @ViewChild('fileInput') fileInput:any;
  @ViewChild('fileInput1') fileInput1:any;
  
  files:string;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.FAinventorycsvFrom = this.fb.group({
      
      ouId:[],
      ouCity:[],
      file:[],
      file1:[],


    })

  }


   refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  get f() { return this.FAinventorycsvFrom.controls; }
  itfainventorycsv(FAinventorycsvFrom: any) {
  }


  
  uploadFAccCSVFile(event:any){
    debugger;
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    this.displayButton=false;
    var file=this.fileInput1.nativeElement.files[0];
     var ceatedby=sessionStorage.getItem('tktNo');
     console.log(file);
     
    this.reportService.FACsvaccUpoadDocument(formData,file,ceatedby).subscribe((res: any) => {  
      if (res.code === 200) {        
        alert(res.message);
         this.dataDisplay ='File Uploaded Successfully....'
         this.closeResetButton=true;
         this.FAinventorycsvFrom.disable();
         this.FAinventorycsvFrom.get('files')?.reset();
         
        


    
       } else {
         if (res.code === 400) {
           alert('Error In File : \n' + res.message+'---'+ res.obj);
           this.dataDisplay ='File Uploading Failed....'
           this.closeResetButton=true;
    
         }
       }
     });
  }



  uploadFAassetCSVFile(event:any){
    debugger
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    this.displayButton=false;
    var file=this.fileInput.nativeElement.files[0];
     var ceatedby=sessionStorage.getItem('tktNo');
      this.reportService.FACsvaccassetUpoadDocument(formData,file,ceatedby).subscribe((res: any) => {  
        if (res.code === 200) {        
          alert(res.message);
           this.dataDisplay ='File Uploaded Successfully....'
           this.closeResetButton=true;
           this.FAinventorycsvFrom.disable();
           this.FAinventorycsvFrom.get('files')?.reset();
      
      
         } else {
           if (res.code === 400) {
             alert('Error In File : \n' + res.message+'---'+ res.obj);
             this.dataDisplay ='File Uploading Failed....'
             this.closeResetButton=true;
           
           }
         }
       });
    }

}
