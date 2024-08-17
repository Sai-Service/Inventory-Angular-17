import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConst} from '../app-const';

@Injectable({
  providedIn: 'root'
})
export class AdminTransactionService {

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

  onhandQtyFn(itemName:any,locId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/OnHand/LocationItemWise?itemName=${itemName}&fromLocation=${locId}`);
  }

  stkRequestedEmFn(ouId:any,locId:any,deptId:any,role:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/EmpMst/WithAllAdmin?ouId=${ouId}&locId=${locId}&deptId=${deptId}&role=${role}`);
  }

  

  stkFindFn(shipNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Receipt/STTransNo?stockTransNo=${shipNo}`);
  }

  public stockTransSaveFn(TransctionitemMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Receipt/addSTTransfer';
    return this.http.post(url, TransctionitemMasterRecord, options);
  }

  miscellaSaveFn(TransctionitemMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Miscellaneous/addMisc';
    return this.http.post(url, TransctionitemMasterRecord, options);
  }


  userRequitionSaveFn(TransctionitemMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Requisition/addRequisition';
    return this.http.post(url, TransctionitemMasterRecord, options);
  }

  miscFindFn(miscNumber:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Miscellaneous/MisscellNo?miscNumber=${miscNumber}`);
  }


  AllreqItemCatagList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/AdminItem/DistinctItems`);  ////CodeMst/dept/STATIONARY
  }

  
getallcitylist(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}
gstperList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/CodeMst/dept/GSTPer');
}

AllvendornameList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/VendorMst/All');
}

onSelectReqItemNameFn(codeType:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/AdminItem/AllItems?category=${codeType}`); ////CodeTypeMst/REQ/REQ
}

adheaderIdFindFN(headId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/AdminStock/PoNumber?adheaderId=${headId}`);
}

public StckRecordedSubmit(BillRecorder:any) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/AdminStock/addStk';
  return this.http.post(url, BillRecorder, options);
}

PoUpoadDocument1(formData: FormData ,file:any,venId:any,addept:any,div:any,locId:any,buyer:any,adouid:any,tktNo:any,adbilno:any,txct:any,tottax:any,totamt:any ) {
  formData.append('file', file);
  // formData.append('headerId',headerId)
  const REQUEST_URI = this.ServerUrl + `/AdminStock/UploadPO?advendId=${venId}&adDept=${addept}&adDivision=${div}&adLoc=${locId}&adBuyer=${buyer}&adouId=${adouid}&adtktNo=${tktNo}&advendBillno=${adbilno}&adtaxCat=${txct}&totalTax=${tottax}&totalAmt=${totamt}`;
  return this.http.post(REQUEST_URI, formData);
}


updatePurchaseLinefn(UpdateCounterSaleInvRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/AdminStock/POlineSave`);
  return this.http.put(url, UpdateCounterSaleInvRecord, options);
}

approvePodfn(poId:any) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/AdminStock/billClosed?adheaderId=${poId}`);
  return this.http.put(url, poId, options);
}
////////////////////////////////////////////Admin Requsition/////////////////////////


viewStokListFn(ouid:any,locId:any,Stok:any,): Observable<any> {
  // alert(headerId)
  return this.http.get(this.ServerUrl + `/Stock/WithLocStock?ouId=${ouid}&locId=${locId}&stkName=${Stok}`);
}

viewReqisisionListFn(ouid:any,dept:any,tkt:any,stsreq:any): Observable<any> {
  // alert(headerId)
  return this.http.get(this.ServerUrl + `/Requisition/Req?city=${ouid}&adminDept=${dept}&admintktNo=${tkt}&reqstatus=${stsreq}`);
}


RequAdminFindFN(billNo:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/Requisition/ReqHd?reqhdNo=${billNo}`);
}
changeStatus(TransctionitemMasterRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/Requisition/ReqClosed?reqhdNo=${TransctionitemMasterRecord}`;
  return this.http.put(url, TransctionitemMasterRecord, options);
}

UpdateAdminReqBilllineRecorder(UpdateCounterSaleInvRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/Requisition/lineSave`);
  return this.http.put(url, UpdateCounterSaleInvRecord, options);
}

Asigntolocadmin(ouID:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/EmpMst/AdminTktNo?adouId=${ouID}`);
}


UpdateUserReqBilllineRecorder(UpdateCounterSaleInvRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/Requisition/ReqAccept?reqhdNo=${UpdateCounterSaleInvRecord}`);
  return this.http.put(url, UpdateCounterSaleInvRecord, options);
}

onHandQtyOuFn(itemName:any): Observable<any> {
  var ouId= Number(sessionStorage.getItem('ouId'))
  return this.http.get(this.ServerUrl + `/OnHand/OuItemName?itemName=${itemName}&ouId=${ouId}`); ////CodeTypeMst/REQ/REQ
}

viewPendingShipment(stsreq:any,locId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/Receipt/TransType?transactionType=${stsreq}&toLocationId=${locId}`);
}

adheaderIdFindReceiptFN(headId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/AdminStock/PoNumApprove?adheaderId=${headId}&adstatus=APPROVED`);
}


shipmentFindFN(shipNo:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/Receipt/STTransNo?stockTransNo=${shipNo}`);
}

receiptNoFindFn(headId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/Receipt/ReceiptNo?receiptNo=${headId}`);
}

public updateReceiptSaveFn(TransctionitemMasterRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/Receipt/addReceipt';
  return this.http.post(url, TransctionitemMasterRecord, options);
}

viewGRRNrecipetFn(receiptNumber:any){
  const REQUEST_URI = this.ServerUrl + `/ReqReports/GRR?receiptNo=${receiptNumber}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}
onhandQtyFn1(itemName:any,locId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/OnHand/LocationWithPrice?itemName=${itemName}&fromLocation=${locId}`);
}

adminDeptVendorListFn(): Observable<any> {
  return this.http.get(this.ServerUrl + `/supp/getAllSupp`);
}

Linestatusist(): Observable<any> {
  return this.http.get(this.ServerUrl + '/CodeMst/dept/LINESTATUS');
}

directRequiCsvUpl(formData:FormData,file:any,city:any,locId:any,reqUsername:any,admintktNo:any,transactionType:any ) {
  formData.append('file', file);
  // formData.append('headerId',headerId)
  const REQUEST_URI = this.ServerUrl + `/Requisition/DirectIssueUpload?city=${city}&reqRemarks=ok&location=${locId}&reqUsername=${reqUsername}&admintktNo=${admintktNo}&transactionType=${transactionType}`;
  return this.http.post(REQUEST_URI, formData);
}

updateDirectRequition(UpdateCounterSaleInvRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/Requisition/DirectReqlineSave`);
  return this.http.put(url, UpdateCounterSaleInvRecord, options);
}


requitionNoFn(requitionNo:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/Requisition/ReqHd?reqhdNo=${requitionNo}`);
}

directRequitionFn(TransctionitemMasterRecord:any) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/Requisition/DirectReq';
  return this.http.post(url, TransctionitemMasterRecord, options);
}


AlldivsubtypList(): Observable<any> {
  var div = "SUBDIVISION";
 return this.http.get(this.ServerUrl + `/CodeMst/dept/${div}`);  ////CodeMst/dept/STATIONARY
}

checkItemdetails(ticketNo:any,locId:any,divisionSubType:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/Requisition/Dreq?ticketNo=${ticketNo}&attribute1=${locId}&adminstatus=DIRECTISSUE&divisionSubType=${divisionSubType}`);
}

findByEmplName(ouId:any,empName:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/EmpMst/empl/TktNo?ouId=${ouId}&tktNo=${empName}`);
}

// AllreqItemCatagList(): Observable<any> {
//   var dept = sessionStorage.getItem('deptName');
//   return this.http.get(this.ServerUrl + `/AdminItem/DistinctItems`);  ////CodeMst/dept/STATIONARY
// }

///////http://localhost:8080/AdminItem/DistinctItems

AllreqItemCatagList1(): Observable<any> {
  var attribute1= "ADMIN"
  var sts ="Active"
  return this.http.get(this.ServerUrl + `/CodeTypeMst/AllAdmin?attribute4=${attribute1}&status=${sts} `);  ////http://localhost:8080/CodeTypeMst/AllAdmin?attribute4=ADMIN&status=Active    
}


MiscellerList(): Observable<any> {
  var REASON ="MISCREASONS";
 return this.http.get(this.ServerUrl + `/CodeMst/dept/${REASON}`);  ////CodeMst/dept/STATIONARY
}

AllMiscellerTypeList(): Observable<any> {
  var REASON ="MISC";
  var CODTYPE="TransactionType"
 return this.http.get(this.ServerUrl + `/CodeMst/Miscellenous?codeType=${CODTYPE}&attribute5=${REASON}`);  ////CodeMst/dept/STATIONARY
}


AlllocationIdList(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}


// onSelectReqItemNameFn(codeType:any): Observable<any> {
//   return this.http.get(this.ServerUrl + `/AdminItem/AllItems?category=${codeType}`); ////CodeTypeMst/REQ/REQ
// }



ItemCodeGetSearchFn(City:any,gpitemCode:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/ItemMst/itc?city=${City}&itemCode=${gpitemCode}`);
}


GatepassTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl + `/CodeMst/dept/GATEPASSREASON`);
}


gpTovendornameList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/VendorMst/All');
}

public GatepasssgenForm(Assetinstallationgen:any) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/GatePass/addGatePass';
  return this.http.post(url, Assetinstallationgen, options);
}
 

Gatepassprint(gatepassNo:any){
  // debugger;
 // http://localhost:8080/AssetInstall/print?itemCode=MUM-LAP012
  const REQUEST_URI = this.ServerUrl +`/ItemInvReports/GatepassPrint?gatepassNo=${gatepassNo}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}
//http://localhost:8080/GatePass/AllGatepassOuWise?gpouId=104         
allGatePassSearch(ouid:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/GatePass/AllGatepassOuWise?gpouId=${ouid}`);
}

gpCodeFindFN(ouid:any,gpcode:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/GatePass/Gpass?gpouId=${ouid}&gatepassNo=${gpcode}`);
}

getLocationId(ouId:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
}


public Gatepassgenrated(Assetinstallationgen:any) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/GatePass/AdminGatepass';
  return this.http.post(url, Assetinstallationgen, options);
}

AdgatepassidFind(gatepassid:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/GatePass/ID?gatePassId=${gatepassid}`);
}

viewGatePassFn(orderNumber:any) {
  const REQUEST_URI = this.ServerUrl + `/ReqReports/AdminGatePass?gatepassno=${orderNumber}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

RejectreasonList(): Observable<any> {
  var REASON ="REJECTRESON";
 return this.http.get(this.ServerUrl + `/CodeMst/dept/${REASON}`);  ////CodeMst/dept/STATIONARY
}

purchaseorderfn(receiptNumber:any){
  const REQUEST_URI = this.ServerUrl + `/ReqReports/POprint?adheaderId=${receiptNumber}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


}

