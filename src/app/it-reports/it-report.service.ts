import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConst} from '../app-const';

@Injectable({
  providedIn: 'root'
})
export class ItReportService {
  httpclient: any;
  headers: any;
  receiptNumber:number;
  ServerUrl :string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
   }


   AssetinstallationForm(itemcode:any){
    const REQUEST_URI = this.ServerUrl +`/ItemInvReports/print?itemCode=${itemcode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  AssetHistoryForm(itemcode:any){
    const REQUEST_URI = this.ServerUrl +`/ItemInvReports/AssetHistory?itemcode=${itemcode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  AssetinstallationView(itemcode:any){
    const REQUEST_URI = this.ServerUrl +`/ItemInvReports/print?itemCode=${itemcode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
  allAssetInsttList(ouID:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/AssetInstall/AssetInstallList?city=${ouID}`);
  }
  


  itemcodeAknFN(City:any,itemCode:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/ItemMst/itc?city=${City}&itemCode=${itemCode}`);
  }
  
  AllcomapanyName(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CompMst/All');
  }
  
  
  itemcodeAssetinstFind(City:any,itemCode:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/ItemMst/itc?city=${City}&itemCode=${itemCode}`);
  }
  
  public AssetInstgenrate(Assetinstallationgen:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/AssetInstall/addAssetPrint';
    return this.http.post(url, Assetinstallationgen, options);
  }
  



/////////////////////////////////////////////////////////All Inventory Report////////////////////////////////////////

InventoryItemReport(ouId:any,locId:any,Dept:any,Product:any){
 
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/ItemInv?ouId=${ouId}&locId=${locId}&dept=${Dept}&itemTypeId=${Product}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });  
}

getAccItemtypeSearchAllInv(): Observable<any> {
  return this.http.get(this.ServerUrl +  '/CodeMst/dept/PRODUCTTYPE');
}

getAccDepartmentSearchAllInv(): Observable<any> {
  return this.http.get(this.ServerUrl + '/CodeMst/dept/DEPT');
}

getAccLocationSearchAllInv(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}


getAllOuLocationId(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}

AlllocationitemList(): Observable<any> {
  return this.http.get(this.ServerUrl + `/ouMst/Active`);
}
///////////////////////////////////////purchase Master/////////////////////////////////


getLocationSearch1(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
}


getLocationSearch(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}
   

ExpTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl + `/CodeMst/dept/EXPENSETYPE`);
}

AllVendorList(): Observable<any> {
  return this.http.get(this.ServerUrl +`/VendorMst/All`);
}


AssetPurchaseReport(ouId:any,fromDate:any,toDate:any,locId:any,VnId:any,extT:any){
  // http://localhost:8081/SalesReports/ChetakPendingBooking
  const REQUEST_URI = this.ServerUrl +`/PurchaseReports/PurchaseEntry?ouId=${ouId}&fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&vendorId=${VnId}&expType=${extT}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

///////////////////////////////////////////////ACCOUNT REPORT/////////////////////////////////////////////////////

getAccLocationSearch(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}

getBatchNameSearch(locId:any,btcsts:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/faBatch/batchName?locId=${locId}&batchStatus=${btcsts}`);
}

getAccDepartmentSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/CodeMst/dept/DEPT');
}

getAccItemtypeSearch(): Observable<any> {
  return this.http.get(this.ServerUrl +  '/CodeMst/dept/PRODUCTTYPE');
}


AccountInvReport(ouId:any,locId:any,Dept:any,Product:any){
 
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/AccountInv?ouId=${ouId}&locId=${locId}&dept=${Dept}&itemTypeId=${Product}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

TransferItemReport(fromDate:any,toDate:any,ouId:any){
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/TransferDet?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

AssetScrapReport(fromDate:any,toDate:any,ouId:any){
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/ScrapDet?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


GatePassSummuryReport(fromDate:any,toDate:any,ouId:any){
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/GatePassNewReport?fromDate=${fromDate}&toDate=${toDate}&gpouId=${ouId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
    
  });
}



FACsvaccUpoadDocument(formData:any,file:any,createdBY:any,ouId:any) {
  formData.append('file', file);
  // formData.append('headerId',headerId)
  const REQUEST_URI = this.ServerUrl + `/AccountAsset/UploadAsset?createdBy=${createdBY}&ouId=${ouId}`;     ///&ouId=${ouId}
  return this.http.post(REQUEST_URI, formData);
}


FACsvaccassetUpoadDocument(formData:any ,file:any,createdBY:any,ouId:any) {
  formData.append('file', file);
  // formData.append('headerId',headerId)
  const REQUEST_URI = this.ServerUrl + `/AccountAsset/UploadFA?createdBy=${createdBY}&ouId=${ouId}`;  ////&ouId=${ouId}
  return this.http.post(REQUEST_URI, formData);
}

FAssetBatchWiseReport(ouId:any,batchName:any,locId:any,btchsts:any){
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/FaAssetReport?ouId=${ouId}&batchName=${batchName}&erplocId=${locId}&batchStatus=${btchsts}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

////http://localhost:8080/ItemInvReports/FaAssetReport?ouId=108&batchName=&erplocId=&batchStatus=

FAssetCommonReport(login:any){
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/FaAssetNoCommon?createdBy=${login}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}




provExpensesBillingReport(){
  const REQUEST_URI = this.ServerUrl +`/Expense/pendingBillReport`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

//////Documnets

viewDocumentFn(): Observable<any> {
  return this.http.get(this.ServerUrl + `/ITForms/AllPdf`);
}

openDocumentFn(itId:any) {
  const REQUEST_URI = this.ServerUrl + `/ITForms/downloadfile?itId=${itId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


UpoadDocument1(formData: FormData ,file:any,docName:any,) {
  formData.append('file', file);
  const REQUEST_URI = this.ServerUrl + `/ITForms/UploadIdForm?createdBy=${docName}`;
  return this.http.post(REQUEST_URI, formData);
}


PMInvReport(ouId:any,locId:any,Dept:any){
 
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/PMReport?city=${ouId}&location=${locId}&dept=${Dept}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


PMInvExcelReport(ouId:any,locId:any,Dept:any){
 
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/PMReportNew?city=${ouId}&location=${locId}&dept=${Dept}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}
}
