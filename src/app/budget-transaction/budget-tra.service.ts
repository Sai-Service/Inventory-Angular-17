import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AppConst } from '../app-const'

@Injectable({
  providedIn: 'root'
})
export class BudgetTraService {
  httpclient: any;
  headers: any;
  receiptNumber:number;
  ServerUrl :string;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
  }

  TolocationIdList(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }

  ToDivisionIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/CodeMst/dept/DIV');
  }

  opunitList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/comp/Active`);
  } 

  DepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/DEPT`);
  } 
  FainancialyearList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/FINYEAR`);
  } 


  ProceedbyFindFN(cityId:any,compId:any,divId:any,fyr:any,loId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetEntry/Loc?cityId=${cityId}&companyId=${compId}&divisionId=${divId}&finYear=${fyr}&locationId=${loId}`);
  }

  public BudgetrecoderSubmit(BudgetRecorder:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/BudgetEntry/addBudget';
    return this.http.post(url, BudgetRecorder, options);
  }
  budgethedidFindFN(budgethedId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetEntry/BudgetNo?budgetheaderId=${budgethedId}`);
  }

  
  updateBudgetLinefn(TransctionitemMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/BudgetEntry/BudgetUpdate`);
    return this.http.put(url, TransctionitemMasterRecord, options);
  }

  AllbudgetitemList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetEntry/BudgetItems`);
  }
}
