import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AppConst } from '../app-const'

@Injectable({
  providedIn: 'root'
})
export class AdminReportsService {
  httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
  }
 
  getLocationSearch1(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
  }

  getLocationSearch(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }

  AdminMisscellReport(ouId:any,locId:any){
    const REQUEST_URI = this.ServerUrl +`/ReqReports/Misscellenous?ouId=${ouId}&locationId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
  AdminPurchaseReport(fromDate:any,toDate:any,ouId:any,locId:any){

    const REQUEST_URI = this.ServerUrl +`/ReqReports/PO?FromDate=${fromDate}&ToDate=${toDate}&OuID=${ouId}&LocID=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  

  AdminRequsitionReport(ouId:any,fromDate:any,toDate:any){
    const REQUEST_URI = this.ServerUrl +`/ReqReports/Req?city=${ouId}&fromDt=${fromDate}&toDt=${toDate}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  AdminStkTransReport(fromDate:any,toDate:any,ouId:any,locId:any){
    const REQUEST_URI = this.ServerUrl +`/ReqReports/STRCPTXlsx?FromDate=${fromDate}&ToDate=${toDate}&OuID=${ouId}&LocID=${locId}`;
    return this.http.get(REQUEST_URI, {
       responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  AdminStockReport(fromDate:any,toDate:any,ouId:any,locId:any){
    const REQUEST_URI = this.ServerUrl +`/ReqReports/STRCPMadeXLS?fromDt=${fromDate}&toDt=${toDate}&ouId=${ouId}&Loc=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  AdminStockAvaiReport(ouId:any,locId:any){
    const REQUEST_URI = this.ServerUrl +`/ReqReports/AvailableStock?ouid=${ouId}&frmLoc=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  AdminGatepssReport(locName:any,fromDate:any,toDate:any){
    const REQUEST_URI = this.ServerUrl +`/ReqReports/GatepassXls?locName=${locName}&fromdt=${fromDate}&todt=${toDate} `;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
  viewStkreciptviewFn(stockTransNo:any){  const REQUEST_URI = this.ServerUrl + `/ReqReports/StockReceipt?stockTransNo=${stockTransNo}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });}


  // AdminStockReport(fromDate:any,toDate:any,ouId:any,locId:any){
  //   // http://localhost:8081/SalesReports/ChetakPendingBooking
  //   const REQUEST_URI = this.ServerUrl +`/ReqReports/STRCPMadeXLS?fromDt=${fromDate}&toDt=${toDate}&ouId=${ouId}&Loc=${locId}`;
  //   return this.http.get(REQUEST_URI, {
  //     // params: REQUEST_PARAMS,
  //     responseType: 'arraybuffer',
  //     headers: this.headers,
  //   });
  // }


  viewStkTransMadeFn(stockTransNo:any) {
    const REQUEST_URI = this.ServerUrl + `/ReqReports/StockMade?stockTransNo=${stockTransNo}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
}
