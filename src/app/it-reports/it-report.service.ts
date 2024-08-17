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


}
