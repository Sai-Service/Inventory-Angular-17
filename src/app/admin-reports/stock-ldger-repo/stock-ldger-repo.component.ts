import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AdminReportsService } from '../admin-reports.service';
import { saveAs } from 'file-saver';
import { trim } from 'jquery';

const MIME_TYPES:any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}
@Component({
  selector: 'app-stock-ldger-repo',
  templateUrl: './stock-ldger-repo.component.html',
  styleUrl: './stock-ldger-repo.component.css'
})
export class StockLdgerRepoComponent {
  StklLedegerRepoForm:FormGroup;
  fromDate: Date| null;
  toDate: Date|null;
  locId: number|null;
  ouId: number |null;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  itemcat:string;
  itemName:string;
  public minDate = new Date();
  public maxDate = new Date();
  pipe = new DatePipe('en-US');
  public now = new Date();
  AllreqItemCatagList:any=[];
  onSelectItemNameFnList:any=[];
  public RepLocationList: any = [];


  constructor(private fb: FormBuilder, private router: Router, private service: AdminReportsService, private location1: Location, private router1: ActivatedRoute, ) {
    this.StklLedegerRepoForm = this.fb.group({
      fromDate: [],
      toDate: [],
      locId: [],
      ouId: [],
      itemcat:[],
      itemName:[],

    })

   }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");


    this.service.AllreqItemCatagList()
    .subscribe(
      data => {
        this.AllreqItemCatagList = data.obj;
        console.log(this.AllreqItemCatagList);
      }
    );

    this.service.getLocationSearch(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.RepLocationList = data.obj;
        console.log(this.RepLocationList);
      }
    );


  }



  // onSelectItemType(event:any){
  //   var codeType=event.target.value;
  //   this.service.onSelectReqItemNameFn(codeType,sessionStorage.getItem('ouId'))
  //   .subscribe(
  //     data => {
  //       this.onSelectItemNameFnList = data.obj;
  //     }
  //   );
    
  //  }

  //  onSelectItemType(event:any){
  //   // this.CheckLineValidationstaxtyp();
  //   var itemType=event.target.value;
  //   var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
  //   var itemType12=trim(itemType1);
  //   var itemcat = this.AllreqItemCatagList.find((itemcat:any) => itemcat.category === itemType);
  //   console.log(itemcat);
  //   var codeType=itemcat.category;
  //   const ouId = sessionStorage.getItem('ouId');
  //   this.service.onSelectReqItemNameFn1(itemType)
  // .subscribe(data => {
  //   this.onSelectItemNameFnList = data.obj.filter((item:any) => {
  //     return ['mumbai', 'pune', 'kolhapur', 'goa', 'cochin', 'hyderabad']
  //       .some(city => item[city] === ouId);
  //   });

  //   console.log(this.onSelectItemNameFnList);
  // });

    
  //  }

  onSelectItemType(event: any) {
      // this.CheckLineValidationstaxtyp();
      var itemType = event.target.value;
      var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
      var itemType12 = trim(itemType1);
      var itemcat = this.AllreqItemCatagList.find((itemcat: any) => itemcat.category === itemType);
      console.log(itemcat);
      var codeType = itemcat.category;
      const ouId = sessionStorage.getItem('ouId');
      this.service.onSelectReqItemNameFn1(codeType)
        .subscribe(data => {
          this.onSelectItemNameFnList = data.obj.filter((item: any) => {
            return ['mumbai', 'pune', 'kolhapur', 'goa', 'cochin', 'hyderabad']
              .some(city => item[city] === ouId);
          });
  
          console.log(this.onSelectItemNameFnList);
        });
    }
  
  

    onSearchItemName2(event: Event) {
      const input = (event.target as HTMLInputElement).value;
      console.log('User is typing:', input);
  
    }
  
  
  
    // onSelectItemName1(event: Event, index: number) {
    //   const selectedValue = (event.target as HTMLInputElement).value;
    //   console.log('Selected item:', selectedValue);
  
    // }
  


//   onSelectItemType(event: any) {
//   const codeType = event.target.value;

//   const ouId = (sessionStorage.getItem('ouId') || '').trim();  // example "104"

//   const cities = ['mumbai', 'pune', 'kolhapur', 'goa', 'cochin', 'hyderabad'];

//   this.service.onSelectReqItemNameFn1(codeType).subscribe((data: any) => {

//     this.onSelectItemNameFnList = data.obj.filter((item: any) => {

//       // check each city column value
//       return cities.some(city => {
//         return item[city] && item[city].toString().trim() === ouId;
//       });

//     });

//     console.log("Filtered output:", this.onSelectItemNameFnList);
//   });
// }


   onSearchItemName(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    console.log('User is typing:', input);
  
  }
  
  onSelectItemName1(event: Event) {
    const selectedValue = (event.target as HTMLInputElement).value;
    console.log('Selected item:', selectedValue);
   
  }


  get f() { return this.StklLedegerRepoForm.controls; }
  StkLdgerReport(StklLedegerRepoForm: any) {
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  reportDetails() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.StklLedegerRepoForm.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.StklLedegerRepoForm.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    var ItemName = this.StklLedegerRepoForm.get('itemName')?.value;
    var LocId = this.StklLedegerRepoForm.get('locId')?.value;
    const fileName = 'Stock Ledger Report Of-' + fromDate + '-To-' + toDate +'.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.StockLedgerReport(fromDate,toDate,LocId,ItemName)
      .subscribe(data => {
        saveAs(new Blob([data],{ type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = '' 
      })
  }
}