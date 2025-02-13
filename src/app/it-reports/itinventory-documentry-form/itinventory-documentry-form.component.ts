import { Component, ViewChild, OnInit } from '@angular/core';
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
  selector: 'app-itinventory-documentry-form',
  templateUrl: './itinventory-documentry-form.component.html',
  styleUrl: './itinventory-documentry-form.component.css'
})
export class ItinventoryDocumentryFormComponent {
  ItinventorydocFrom: FormGroup;
  displayCSVUpload: boolean = true;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  displayButton = true;
  @ViewChild('fileInput') fileInput: any;
  files: string;
  docName: string;
  viewAllDoucmnet: any = [];

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.ItinventorydocFrom = this.fb.group({

      ouId: [],
      ouCity: [],
      file: [],
      files: [],
      docName: [],
    })

  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.reportService.viewDocumentFn().subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.viewAllDoucmnet = res.obj;
        this.dataDisplay = 'Document Display Sucessfully....'
        this.closeResetButton = true;
      }
    })
    
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  get f() { return this.ItinventorydocFrom.controls; }
  itinventorydoc(ItinventorydocFrom: any){

  }

  uploadFile(event: any) {
    var file = this.ItinventorydocFrom.get('files')?.value;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Document Upload in progress....Do not refresh the Page'
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
    var docName = this.ItinventorydocFrom.get('docName')?.value;
    this.reportService.UpoadDocument1(formData, file, docName).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);

        this.dataDisplay = docName + '-' + 'Document Uploaded Sucessfully....'
        this.closeResetButton = true;
        this.ItinventorydocFrom.disable();
        this.ItinventorydocFrom.get('files')?.reset();
      }
      else {
        if (res.code === 400) {
          alert(res.message);

          this.dataDisplay = 'Document Uploading Failed....'
          this.closeResetButton = true;
          this.ItinventorydocFrom.get('files')?.reset();

        }
      }
    })
  }



  viewDocument() {
    this.reportService.viewDocumentFn().subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.viewAllDoucmnet = res.obj;
        this.dataDisplay = 'Document Display Sucessfully....'
        this.closeResetButton = true;
      }
    })
  }




  openDocument(docId: any) {
    var headerId = this.ItinventorydocFrom.get('itId')?.value;
    const fileName = 'download.pdf';
    this.reportService.openDocumentFn(docId)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
        
      });
  }
}





