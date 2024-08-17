import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AppConst } from '../app-const'


@Injectable({
  providedIn: 'root'
})
export class ItmasterService {
  httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
  }


  budgetitemIdFindFN(itemId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetMst/${itemId}`);
  }


  allbudgetmstSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetMst/BudgetAll`);
  }

  allbudgetmstSearchSuper(extyId: any, itemTyId: any, appId: any, BudgeGId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetMst/WithAllExpType?expenseTypeId=${extyId}&itemTypeId=${itemTyId}&applicableToId=${appId}&budgetgrphdId=${BudgeGId}`);
  }

  AllbdgetitemtypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/BUDGETITEMTYPE`);
  }

  AllExpensetypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/BILLTYPE`);
  }

  ApplicableatoList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/LOCATIONTYPE`);
  }

  budgetgrpheadList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/BUDGETITEMGROUP`);  //////change API
  }

  public BudgetMasterSubmit(bdgtMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/BudgetMst/addBudgetItem';
    return this.http.post(url, bdgtMasterRecord, options);
  }

  UpdateBudgetMaster(bdgtMasterRecord: any, itemId: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/BudgetMst/${itemId}`);
    return this.http.put(url, bdgtMasterRecord, options);
  }


  // Code Master

  // allCodetypSearch(): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/CodeTypeMst/All`);
  // }

  allCodetypSuperSearch(sts: any, cmnid: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeSubTypeMst/WithAllCodeSub?status=${sts}&codesubType=${cmnid}`);
  }


  codetypemasterIdFind(cmntypeId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeTypeMst/cdtp/${cmntypeId}`);
  }

  AllcodetypeList(): Observable<any> {
    var dept=sessionStorage.getItem('deptName')
    return this.http.get(this.ServerUrl + `/CodeTypeMst/cdtype/${dept}`);
  }

  cmnTypeIdFind(cmntypeId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/${cmntypeId}`);
  }

  statusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/STATUS');
  }

  public CodeMasterSubmit(CodeMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CodeMst/addCode';
    return this.http.post(url, CodeMasterRecord, options);
  }
  UpdatecodeMasterById(CodeMasterRecord: any, cmntypeId: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/CodeMst/${cmntypeId}`);
    return this.http.put(url, CodeMasterRecord, options);
  }

  allCodemstSearch(CMsts: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/CodeSrch?codeType=${CMsts}`);
  }


  // code sub Type 

  codesubIdFindFN(codesubId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeSubTypeMst/${codesubId}`);
  }

  allcodesubtypeMaster(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeSubTypeMst/AllCodeSubType`);
  }


  allcodesubtypeMasterSuper(sts: any, cmnid: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeSubTypeMst/WithAllCodeSub?status=${sts}&codesubType=${cmnid}`);
  }



  AllcodesubtypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/SOFTWARETYPE`);
  }

  public CodesubtypemMasterSubmit(CodesubtypemMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CodeSubTypeMst/addCodeSubType';
    return this.http.post(url, CodesubtypemMasterRecord, options);
  }
  UpdateCodesubtypemMasterById(CodesubtypemMasterRecord: any, id: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/CodeSubTypeMst/${id}`);
    return this.http.put(url, CodesubtypemMasterRecord, options);
  }


  public CodetypeMasterSubmit(CodetypeMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CodeTypeMst/addCodeType ';
    return this.http.post(url, CodetypeMasterRecord, options);
  }
  UpdatecodetypeMasterById(CodetypeMasterRecord: any, id: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/CodeTypeMst/${id}`);
    return this.http.put(url, CodetypeMasterRecord, options);
  }


  allcmpActiveSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/comp/Active`)
  }

  public CompanyMasterSubmit(CmpMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CompMst/CompanyMaster';
    return this.http.post(url, CmpMasterRecord, options);
  }
  UpdatecmpMasterById(CmpMasterRecord: any, compId: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/CompMst/${compId}`);
    return this.http.put(url, CmpMasterRecord, options);
  }

  compIdFindFN(compId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/${compId}`);
  }

  allcompName(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst`);
  }

  CompanycityList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/CITY`);
  }

  getLocationId(ouId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }
  getALLLocationId(): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loctn/Active`);
  }

  DivisionIDList(ouId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }

  DesignationList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/DESG`);
  }

  teamRoleListFN(deptName: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/TeamRole/${deptName}`);
  }


  titleList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/TITLE');
  }



  teamRoleListFnd(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/ROLE');
  }
  ticketNoFindFN(ouid: any, tkno: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/EmpMst/empl/TktNo?ouId=${ouid}&tktNo=${tkno}`);
  }

  DepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DEPT');
  }
  EmpCompanyList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/comp/Active`);
  }


  public EmployeeMasterSubmit(EmpMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/EmpMst/addemp';
    return this.http.post(url, EmpMasterRecord, options);
  }
  UpdateEmpMasterByTktNo(EmpMasterRecord: any, tktNo: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/EmpMst/${tktNo}`);
    return this.http.put(url, EmpMasterRecord, options);
  }

  allEmpSuperAdminsearch(ouid: any, locid: any, dptid: any, compid: any, divid: any, desid: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/EmpMst/WithAllEmp?ouId=${ouid}&locId=${locid}&deptId=${dptid}&compId=${compid}&divisionId=${divid}&desgId=${desid}`);
  }

  allEmpActiveSearch(ouid: any, sts: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/EmpMst/empou?ouId=${ouid}&status=${sts}`);
  }

  allinsubtypAllSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/InvSubMst/prodAll`);
  }
  typeIdFindFN(typeId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/InvSubMst/inv/${typeId}`);
  }
  AllproducttypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/PRODUCTTYPE');
  }

  public InventorysubypeMasterSubmit(InventorysubypeMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/InvSubMst/addInvSub';
    return this.http.post(url, InventorysubypeMasterRecord, options);
  }
  UpdateinventorysubtypeMasterById(InventorysubypeMasterRecord: any, id: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/InvSubMst/${id}`);
    return this.http.put(url, InventorysubypeMasterRecord, options);
  }

  alllocActiveSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loctn/Active`);
  }

  alllocActiveSuperSearch(sts: any, ouid: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/WithAllLoc?status=${sts}&ouId=${ouid}`);
  }

  locIdFindFN(locId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/${locId}`);
  }

  loactionouNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/ouMst/Active`);
  }

  loactionoucityList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/CITY`);
  }
  public LocationMasterSubmit(locMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/locationMst/LocationMaster';
    return this.http.post(url, locMasterRecord, options);
  }
  UpdatelocMasterById(locMasterRecord: any, locId: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/locationMst/${locId}`);
    return this.http.put(url, locMasterRecord, options);
  }

  allouActiveSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/ouMst/Active`);
  }
  ouIdFindFN(ouId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/ouMst/ou/${ouId}`);
  }

  allcompanyList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/comp/Active`);
  }

  ouDivisionIDList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DIV');
  }

  public OuMasterSubmit(ouMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ouMst/addou ';
    return this.http.post(url, ouMasterRecord, options);
  }
  UpdateOuMasterById(OuMasterRecord: any, ouId: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/ouMst/${ouId}`);
    return this.http.put(url, OuMasterRecord, options);
  }

  OuCityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/CITY');
  }

  allvendorMaster(): Observable<any> {
    return this.http.get(this.ServerUrl + `/VendorMst/All`);
  }
  vendorIdFindFN(vendorId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/VendorMst/${vendorId}`);
  }




  AllPaymenttermList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/PAYMENTTERM`);
  }

  public VendorMasterSubmit(VendorMasterRecord: any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/VendorMst/addVendor ';
    return this.http.post(url, VendorMasterRecord, options);
  }
  UpdatevendorMasterById(VendorMasterRecord: any, id: any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/VendorMst/${id}`);
    return this.http.put(url, VendorMasterRecord, options);
  }

  vendoritemIdFindFN(itemId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/VendorItemMst/${itemId}`);
  } 
  
  allvendoritemMaster(): Observable<any> {
    return this.http.get(this.ServerUrl + `/VendorItemMst/All`);
   }
  
  
   allvendoritemMasterSupersearch(sts:any,budtypId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/VendorItemMst/WithAllVendItem?status=${sts}&budgetTypeId=${budtypId}`);
   }
   
  AllbudgettypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetMst/BudgetAll`);  //////change API
  }

  public VendoritemMasterSubmit(VendoritemMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/VendorItemMst/addVendorItem ';
    return this.http.post(url, VendoritemMasterRecord, options);
  }
  UpdateVendoritemMasterById(VendoritemMasterRecord:any,id:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/VendorItemMst/${id}`);
    return this.http.put(url, VendoritemMasterRecord, options);
  }



  allCodetypSearch(dept:any,sts:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeTypeMst/AllAdmin?attribute4=${dept}&status=${sts}`);
  }

}
