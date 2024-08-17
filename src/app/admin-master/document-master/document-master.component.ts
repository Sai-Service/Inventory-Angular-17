import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { AdminMasterService } from '../admin-master.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrl: './document-master.component.css'
})
export class DocumentMasterComponent {
  DocumentMasterForm:FormGroup;
  docSrlID:number;
  transactionType:string;
  locId:number;
  ouId:number;
  financialYear:number;
  docSrlNo:number;
  createdBy:string;
  createdDate:Date;
  updatedby:string;
  updatedDate:Date;
  attribute1:string;
  attribute2:string;
  attribute3:number;
  displayButton=true;
  displayButtonCondition=true;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  DoctransactiontypeList:any[];
  ALLlocIdList:any[];
  alldocmstList:any[];


  constructor(private fb: FormBuilder, private router: Router,private router1:ActivatedRoute,private service: AdminMasterService, private location: Location,
    private AdminMasterService:AdminMasterService) {
    this.DocumentMasterForm = fb.group({
      docSrlID:[],
      transactionType:[],
  locId:[],
  ouId:[],
  financialYear:[],
  docSrlNo:[],
  createdBy:[],
  createdDate:[],
  updatedby:[],
  updatedDate:[],
  attribute1:[],
  attribute2:[],
  attribute3:[],

    }) 
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.DocumentMasterForm.patchValue({ouId:sessionStorage.getItem('ouId')});
    this.DocumentMasterForm.patchValue({financialYear:'2024'});
    this.DocumentMasterForm.patchValue({createdBy:sessionStorage.getItem('tktNo')});
    this.DocumentMasterForm.patchValue({attribute2:'0000'});
   

    this.AdminMasterService.DoctransactiontypeList()
    .subscribe(
      data => {
        this.DoctransactiontypeList = data.obj;
        console.log(this.DoctransactiontypeList);
      }
    );



    this.AdminMasterService.getLocationId(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.ALLlocIdList = data.obj;
          console.log(this.ALLlocIdList);
        }
      );
    
      this.disableField()
  }

  disableField(){
    this.DocumentMasterForm.get('docSrlID')?.disable();
    this.DocumentMasterForm.get('docSrlNo')?.disable();
    this.DocumentMasterForm.get('financialYear')?.disable();
  }
  
  DocMaster(DocumentMasterForm: any) { }

  onSelectItemType(event:any){
    var trnsType=event.target.value;
    alert(event.target.value)
    var itemType1 = trnsType.substr(trnsType.indexOf(': ') + 1, trnsType.length);
    var itemType12 = (itemType1).trim();
    let select = this.DoctransactiontypeList.find(d => d.codeDesc === itemType12);
    console.log(select);
        this.DocumentMasterForm.patchValue({attribute3: select.cmntypeId });
        
      }
    
      message: string = "Please Fix the Errors !";
      msgType: string = "Close";
      getMessage(msgType: string) {
        this.msgType = msgType;
        if (msgType.includes("Save")) {
          this.message = "Do you want to Save the changes(Yes/No)?"
        }
        if (msgType.includes("Reset")) {
          this.message = "Do you want to Reset the changes(Yes/No)?"
        }
        
        if (msgType.includes("Close")) {
          this.message = "Do you want to Close the Form(Yes/No)?"
        }
        if (msgType.includes("Update")) {
          this.message = "Do you want to Update the Form(Yes/No)?"
        }
      }
    
    
      executeAction() {
        if (this.msgType.includes("Save")) {
          this.saveDocMaster()
        }
    
        if (this.msgType.includes("Reset")) {
          window.location.reload();
        }
    
        if (this.msgType.includes("Close")) {
          this.close();
        }
        if (this.msgType.includes("Update")) {
          this.updateDocMaster();
        }
      }
    
      close() {
        this.location.back();
      }

      transData(val:any) {
    
        return val;
     }



      saveDocMaster(){
        this.closeResetButton = true;
        this.progress = 0;
        this.dataDisplay = 'Document Save is progress....Do not refresh the Page';
        const formValue = this.transData(this.DocumentMasterForm.value);
        console.log(formValue);
        this.AdminMasterService.saveDocMaster(formValue).subscribe((res: any) => {
          if (res.code === 200) {
             alert(res.message);
             this.DocumentMasterForm.patchValue({docSrlNo:res.obj.docSrlNo});
             this.DocumentMasterForm.patchValue({docSrlID:res.obj.docSrlID});
            this.dataDisplay = res.message;
            this.DocumentMasterForm.disable();
            this.displayButtonCondition = false;
          } else {
            if (res.code === 400) {
              alert(res.message);
            }
          }
        });


      }

      updateDocMaster(){
        this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Document Update is progress....Do not refresh the Page';
    const formValue = this.transData(this.DocumentMasterForm.value);
    this.DocumentMasterForm.patchValue({updatedby:sessionStorage.getItem('tktNo')});
    var docSrlID= this.DocumentMasterForm.get('docSrlID')?.value;
    console.log(formValue);
    this.AdminMasterService.itemDocUpdate(docSrlID,formValue).subscribe((res: any) => {
      if (res.code === 200) {
         alert(res.message);
        this.dataDisplay = res.message;
        this.DocumentMasterForm.disable();
        this.displayButtonCondition = false;
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });

      }

      DocumentNoFind(docSrlID:any){
        alert(docSrlID)
    this.closeResetButton = true;
    this.progress = 0;
    this.dataDisplay = 'Data Display successfully'
    this.DocumentMasterForm.get('docSrlID')?.disable();
    this.AdminMasterService.AdminDocNoFindFN(docSrlID)
    .subscribe(
      data => {
        this.DocumentMasterForm.patchValue(data.obj);
        this.displayButtonCondition = false;

      }
    );
        
      }

      
  searchMast() {
    var locid = this.DocumentMasterForm.get('locId')?.value;
    var ouid = this.DocumentMasterForm.get('ouId')?.value;
    this.AdminMasterService.allDocmstSearch(sessionStorage.getItem('ouId'),locid)
      .subscribe(
        data => {
          this.alldocmstList = data.obj;
          console.log(this.alldocmstList);
          // this.displayButton=false;
        }
      );
  }
     
}
