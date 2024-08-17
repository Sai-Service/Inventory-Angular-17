import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItReportService } from '../it-report.service';
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';



interface Assetinstt {

  astId:number;
  ouCity:string;
  city:number;
  locName:string;
  divName:string;
  vendorName:string;
  itemsubType:string;
  productMake:string;
  productmodelDetails:string;
  productserialNo:string;
  purchaseInvNo:string;
  myear:string;
  billDate:string;
  reqapprHod:string;
  userName:string;
  usertktNo:string;
  deptName:string;
  deptHod:string;
  itemCode:string;
  itemId:number;
  acctsDept:string;
  startdate:Date;
  warntyPeriod:string;
  compName:string;
  attribute3:string;
  astputDate:string;
  astinstBy:string;
  purchaseDt:string;

}

const MIME_TYPES:any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-asset-install-form',
  templateUrl: './asset-install-form.component.html',
  styleUrl: './asset-install-form.component.css'
})
export class AssetInstallFormComponent {
  AcknowledgementForm:FormGroup;
  astId:number;
  ouCity:string |null ;
  city:number;
  locName:string;
  // isDisabled: false
  isDisabled = true;
  divName:string;
  vendorName:string;
  itemsubType:string;
  productMake:string;
  productmodelDetails:string;
  productserialNo:string;
  purchaseInvNo:string;
  myear:string;
  billDate:string;
  reqapprHod:string;
  userName:string;
  usertktNo:string;
  deptName:string;
  deptHod:string;
  itemCode:string;
  itemId:number;
  acctsDept:string;
  startdate:Date;
  warntyPeriod:string;
  compName:string;
  attribute3:string;
  astputDate:string;
  astinstBy:string;
  

  displayButton = true;
  purchaseDt:Date;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  private sub: any;
  itemcodeAknFN:any;
  public AllcomapanyName: Array<string> = [];
  pipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, private router: Router, private service: ItReportService, private location1: Location, private router1: ActivatedRoute, private reportService: ItReportService) {
    this.AcknowledgementForm = this.fb.group({
      
      astId:[],
      ouCity:[],
      city:[],
      locName:[],
      divName:[],
      vendorName:[],
      itemsubType:[],
      productMake:[],
      productmodelDetails:[],
      productserialNo:[],
      purchaseInvNo:[],
      myear:[],
      billDate:[],
      reqapprHod:[],
      userName:[],
      usertktNo:[],
      deptName:[],
      deptHod:[],
      itemCode:[],
      itemId:[],
      startdate:[],
      warntyPeriod:[],
      compName:[],
      attribute3:[],
      astputDate:[],
      astinstBy:['IT DEPARTMENT'],
      purchaseDt:[],
      compCode:[]


    })
   }

   transData(val:any) {
    return val;
  }

   refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  get f() { return this.AcknowledgementForm.controls; }
  aknForm(AcknowledgementForm: any) {
    
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.ouCity = sessionStorage.getItem('ouCity');
    this.AcknowledgementForm.patchValue({ astinstBy:'IT DEPARTMENT' })
   
 
    this.service.AllcomapanyName()             
    .subscribe(
      data => {
        this.AllcomapanyName = data.obj;
        console.log(this.AllcomapanyName);
      }
    );


    this.disableFiled();

  }
  disableFiled(){
    // this.AcknowledgementForm.get('itemCode')?.disable();
    this.AcknowledgementForm.get('ouCity')?.disable();
    this.AcknowledgementForm.get('locName')?.disable();
    this.AcknowledgementForm.get('divName')?.disable();
    this.AcknowledgementForm.get('userName')?.disable();
    this.AcknowledgementForm.get('deptName')?.disable();
    this.AcknowledgementForm.get('usertktNo')?.disable();
    this.AcknowledgementForm.get('itemsubType')?.disable();
    this.AcknowledgementForm.get('vendorName')?.disable();
    this.AcknowledgementForm.get('productMake')?.disable();
    this.AcknowledgementForm.get('productserialNo')?.disable();
    this.AcknowledgementForm.get('myear')?.disable();
    this.AcknowledgementForm.get('purchaseInvNo')?.disable();
    this.AcknowledgementForm.get('purchaseDt')?.disable();
    this.AcknowledgementForm.get('astputDate')?.disable();
    this.AcknowledgementForm.get('compName')?.disable();
  }

   
  itemcodeAssetinstFind(itemCode:any){
    // alert(itemCode)
    this.displayButton=true;
    this.AcknowledgementForm.get('itemCode')?.disable();
    this.AcknowledgementForm.get('ouCity')?.disable();
    this.AcknowledgementForm.get('locName')?.disable();
    this.AcknowledgementForm.get('divName')?.disable();
    this.AcknowledgementForm.get('userName')?.disable();
    this.AcknowledgementForm.get('deptName')?.disable();
    this.AcknowledgementForm.get('usertktNo')?.disable();
    this.AcknowledgementForm.get('itemsubType')?.disable();
    this.AcknowledgementForm.get('vendorName')?.disable();
    this.AcknowledgementForm.get('productMake')?.disable();
    this.AcknowledgementForm.get('productserialNo')?.disable();
    this.AcknowledgementForm.get('myear')?.disable();
    this.AcknowledgementForm.get('purchaseInvNo')?.disable();
    this.AcknowledgementForm.get('purchaseDt')?.disable();
    this.AcknowledgementForm.get('astputDate')?.disable();
    this.AcknowledgementForm.get('compName')?.disable();
    this.service.itemcodeAssetinstFind(sessionStorage.getItem('city'),itemCode)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert("This Item Code Not Found/This Asset Have Allready Discarded !!!");

              return;
            }

            if (data.code === 200) {
            this.AcknowledgementForm.patchValue(data.obj);
            this.AcknowledgementForm.patchValue({ itemCode: data.obj.itemCode });
            var sss = this.AcknowledgementForm.patchValue({ compName:sessionStorage.getItem('compName')})
            this.AcknowledgementForm.patchValue({ purchaseDt: this.pipe.transform(data.obj.purchaseDt, 'yyyy-MM-dd') });
            this.AcknowledgementForm.patchValue({ astputDate: this.pipe.transform(data.obj.dtofInstall, 'yyyy-MM-dd') });
            
          }}
        )
  }

  newMast() {  
    const formValue: Assetinstt = this.AcknowledgementForm.getRawValue();
    this.reportService.AssetInstgenrate(formValue).subscribe((data: any) => {
      if (data.code === 200) {
        alert(data.message);    
        this.AcknowledgementForm.disable();
        this.AcknowledgementForm.patchValue({ itemCode: data.obj.itemCode });
        this.displayButton=false;
       
      } else {
        if (data.code === 400) {
          alert(data.message);
     
        }
      }
    });
  }


  
  reportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'Asset Installation Form' + '.pdf';
    var itemcode = this.AcknowledgementForm.get('itemCode')?.value;
    // alert(itemcode);
    
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.AssetinstallationForm(itemcode)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
       
      })
  }

}



