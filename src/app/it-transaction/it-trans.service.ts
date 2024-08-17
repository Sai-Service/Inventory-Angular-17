import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConst} from '../app-const';

@Injectable({
  providedIn: 'root'
})
export class ItTransService {
  httpclient: any;
  headers: any;
  receiptNumber:number;
  ServerUrl :string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
   }

   AssetitemcodeFindFN(itemCode:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/ItemMst/asset/${itemCode}`);
  }
  
  AssetdiscardFindFN(itemCode:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Discard/${itemCode}`);
  }
  
  
  
  allassetdiscardeSearch(Dcity:any,Dsts:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Discard/AllDiscardOuWise?city=${Dcity}&status=${Dsts}`);
  }    


  TranstypList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/TRANSTYPE');
  }
  
  ReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/REASON');
  }
  
  DvendorList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/VendorMst/All');
  }
  
  
  AssetDgstperList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/GSTPer');
  }
  
  public AssetdiscrdSubmit(AsserDiscard:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Discard/addAssetDis';
    return this.http.post(url, AsserDiscard, options);
  }
  AllligelentityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CompMst/All');
  }

  AllllocationitemList(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }

  AlldivisionitemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DIV');
  }
  
 
  DivisionIDList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/DIV`);
  }
  
  AlldepartmentitemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DEPT');
  }
  
  AlldesignationitemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DESG');
  }

  AllBilltypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/BILLTYPE');
  }

  getLocationId(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }
  
  
  getallcitylist(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }
  
  AlldepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DEPT');
  }
  
  allbillrecorderList(ouID:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BillHeader/allouBills?cityId=${ouID}`);
  }

  AllpaymentmodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/PAYMENTMODE');
  }
  DoctypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/DOCUMENTTYPE');
  }
  
  gstperList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/GSTPer');
  }
  headeridFindFN(Cityid:any,headerId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BillHeader/head?cityId=${Cityid}&headerId=${headerId}`);
  }
  AllvendornameList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/VendorMst/All');
  }

  billNoFindFN(billNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BillHeader/bill?billNo=${billNo}`);
  }
  UpdateBilllineRecorder(UpdateCounterSaleInvRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/BillHeader/lineSave`);
    return this.http.put(url, UpdateCounterSaleInvRecord, options);
  }

  openDocumentFn(headerId:any,docType:any) {
    const REQUEST_URI = this.ServerUrl + `/DocUpload/downloadfile?attribute1=${headerId}&docType=${docType}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
  viewDocumentFn(headerId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/DocUpload/AllDocuments?attribute1=${headerId}`);
  }

  UpoadDocument1(formData: FormData ,file:any,docType:any,docName:any,loginName:any,headerId:any) {
    formData.append('file', file);
    const REQUEST_URI = this.ServerUrl + `/DocUpload/imgUpload?docType=${docType}&loginName=${loginName}&attribute1=${headerId}`;
    return this.http.post(REQUEST_URI, formData);
  }
  UpdateBillRecorder(UpdateCounterSaleInvRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/BillHeader/billHeaderUpdate`);
    return this.http.put(url, UpdateCounterSaleInvRecord, options);
  }
  public BillrecoderSubmit(BillRecorder:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/BillHeader/addBill';
    return this.http.post(url, BillRecorder, options);
  }

  public BillrecoderCopySubmit(BillRecorderCopy:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/BillHeader/addBillDuplicate';
    return this.http.post(url, BillRecorderCopy, options);
  }

  onSelectItemNameFn(expenseTypeId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/BudgetMst/billType?expenseTypeId=${expenseTypeId}`);
  }

  //////////////////////////////////////////ITEM MASTER/////////////////////////////


  itemcodeFindFN(City:any,itemCode:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/ItemMst/itc?city=${City}&itemCode=${itemCode}`);
  }

  onSelectItemTypeFn(prodType:any): Observable<any> {
    // if(prodType === 200){
    return this.http.get(this.ServerUrl + `/InvSubMst/${prodType}`);}

    usertktnoFindFN(City:any,usertktNo:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/tkt?city=${City}&usertktNo=${usertktNo}`);
    }
    
    serialenoFindFN(City:any,productserialNo:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/pdsn?city=${City}&productserialNo=${productserialNo}`);
    }
    
    FAnOFindFN(City:any,FAno:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/FaNo?city=${City}&faNo=${FAno}`);
    }
    
    UserNameFindFN(City:any,userName:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/UserName?city=${City}&userName=${userName}`);
    }
    
    invoiceFindFN(City:any,InvoiceNo:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/invNo?city=${City}&purchaseInvNo=${InvoiceNo}`);
    }
    
    AllproducttypeList(): Observable<any> {
        return this.http.get(this.ServerUrl + '/CodeMst/dept/PRODUCTTYPE');
      }
    
    
    
      AllcityitemList(): Observable<any> {
        return this.http.get(this.ServerUrl + '/ouMst/Active');
      }
     
    
      
    
     
      
     
      AllemailtypeitemList(typ:any): Observable<any> {
        return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${typ}`);
      }
    
      AllemailpackageiList(pkg:any): Observable<any> {
        return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${pkg}`);
      }
     
    
      AllregionitemList(): Observable<any> {
        return this.http.get(this.ServerUrl + '/CodeMst/dept/REGION');
      }
    
    
    AllmakeitemList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/CodeMst/dept/BRAND');
    }
    
    AllconfigcpuitemList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/CodeMst/dept/CPU');
    }
    
    AllconfigramitemList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/CodeMst/dept/RAM');
    }
     
    AllconfighdditemList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/CodeMst/dept/HDD');
    }
    
    
    
    
    
    AllopratingsysitemList(ops:any): Observable<any> {
      return this.http.get(this.ServerUrl +`/CodeSubTypeMst/codesubType?codeDesc=${ops}`);
    }
    
    AlloslicmodeitemList(osl:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${osl}`);
    }
     
    AllswpkglicmodeitemList(ospkg:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${ospkg}`);
    }
    
    
    AllswlicmodeitemList(oslic:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${oslic}`);
    }
    
    
    AllavantivsysitemList(antiv:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${antiv}`);
    }
    
    
    AlldongalattachitemList(dnl:any): Observable<any> {
      // alert(dnl)
      return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${dnl}`);
    }
    
    //ACCESS MODE
    AllinternetstusitemList(ints:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeSubTypeMst/codesubType?codeDesc=${ints}`);
    }
    ipaddresslist(): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeMst/dept/IPADDRESS`);
    } 
    
    gpTovendornameList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/VendorMst/All');
    }
    allitemMasterSearch(ouID:any,sts:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/AllItemOuWise?city=${ouID}&status=${sts}`);
    }    
    
    
    public TransctionitemMasterSubmit(TransctionitemMasterRecord:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/ItemMst/addItemMst';
      return this.http.post(url, TransctionitemMasterRecord, options);
    }
    UpdateTransactionitemMasterById(TransctionitemMasterRecord:any,itemCode:any) {
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/ItemMst/${itemCode}`);
      return this.http.put(url, TransctionitemMasterRecord, options);
    }
    
    public itemMasterLikeSearchFn(content:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/ItemMst/LikeSearch';  ////ItemMst/AllOULikeSearch
      return this.http.post(url,content, options);      //content,
    }
    
    public itemMasterLikeSupperSearchFn(content:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/ItemMst/AllOULikeSearch';
      return this.http.post(url,content, options);      //content,
    }
  
    AcknowledgementForm(ouId:any,itemcode:any){
      // http://localhost:8081/SalesReports/ChetakPendingBooking
      const REQUEST_URI = this.ServerUrl +`/ItemInvReports/Acknowledge?ouId=${ouId}&itemCode=${itemcode}`;
      return this.http.get(REQUEST_URI, {
        // params: REQUEST_PARAMS,
        responseType: 'arraybuffer',
        headers: this.headers,
      });
    }

    purchaseNoSearcheFn(Cityid:any,purchaseInvNo:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/BillHeader/purchaseInvNo?cityId=${Cityid}&billNo=${purchaseInvNo}`);
    }

    TicketNoSearchFn(ouid:any,tktNo:any): Observable<any> {
      return this.http.get(this.ServerUrl + `//EmpMst/empl/TktNo?ouId=${ouid}&tktNo=${tktNo}`);
    }

    purchaseRefNoSearchFn(cityId:any,purchaserefNo:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/BillHeader/purchaseId?cityId=${cityId}&headerId=${purchaserefNo}`);
    }

    allitemMasterLocationSearch(city:any,location:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/cityLocation?city=${city}&location=${location}`);
    }

    ItemCodeGetSearchFn(City:any,gpitemCode:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/itc?city=${City}&itemCode=${gpitemCode}`);
    }

    AllsuppBillvendornameList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/VendorMst/All');
    }

    public SupplierBillLikeSupperSearchFn(content:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/BillHeader/OUBillLikeSearch';
      return this.http.post(url,content, options);    
    }
    
    public SupplierBillLikeSearchFn(content:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/BillHeader/BillLikeSearch';
      return this.http.post(url,content, options);     
    }

    BillSerchDateSearch(date:any,cityid:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/BillHeader/BillcurDate?curDate=${date}&cityId=${cityid}`);
    }
    
    
    
    GatepassTypeList(): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeMst/dept/GATEPASSTYPE`);
    }
    
    
    
    
    public GatepasssgenForm(Assetinstallationgen:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/GatePass/addGatePass';
      return this.http.post(url, Assetinstallationgen, options);
    }
     
    
    Gatepassprint(gatepassNo:any){
     // http://localhost:8080/AssetInstall/print?itemCode=MUM-LAP012
      const REQUEST_URI = this.ServerUrl +`/ItemInvReports/GatepassPrint?gatepassNo=${gatepassNo}`;
      return this.http.get(REQUEST_URI, {
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
    
    //////////////////////////////////////////ASSET TRANSFER FORM////////////////////////////////////////

    transitemcodeFindFN(ouId:any,itemCode:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/ItemMst/transfer?city=${ouId}&itemCode=${itemCode}`);
    }
    
    transassetFindFN(itemCode:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/Transfer/trans/${itemCode}`);
    }
    
    AssettransIdFindFN(transferId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/Transfer/transfer/${transferId}`);
    }
    
    
    AllnewCompanyList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/CompMst/All');
    }
    
    allassettransferList(newlocId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `Transfer/transstatus?newlocId=${newlocId}`);
    }
    
    getAllOuLocationId(ouId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
    }
    
    AlllocationitemList(): Observable<any> {
      return this.http.get(this.ServerUrl + `/ouMst/Active`);
    }
    
    getReceivedList(locId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/Transfer/transstatus?newlocId=${locId}`);  ///Transfer/transstatus?newlocId=${locId}
    }
    
    getTransferList(locId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/Transfer/oldtrstatus?oldlocId=${locId}`);
    }
    
    getByTransferId(transId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/Transfer/transfer/${transId}`);
    }
    
    getLocAndDeptTicketNo(locId:any,DeptId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/EmpMst/emplocdept?locId=${locId}&deptId=${DeptId}`);
    }
    
    transdepartmentitemList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/CodeMst/dept/DEPT');
    }
    
    
    
    getticketDetails(tiketNo:any): Observable<any> {
      // alert('----'+tiketNo+'----')
      return this.http.get(this.ServerUrl + `/EmpMst/empl/${tiketNo}`);
    }
    
    receivedbymembers(): Observable<any> {
      return this.http.get(this.ServerUrl + `/CodeMst/dept/ITDEPT`);
    }
    
    allrecievedAssetlocList(locId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/Transfer/ReceivedLocationWise?newlocId=${locId}`);
    }
    
    getRecivedLocationId(locId:any): Observable<any> {
      return this.http.get(this.ServerUrl + `/locationMst/${locId}`);
    }
    
    
    UpdateAssetrecivedMasterById(TransctionitemMasterRecord:any,transferId:any) {
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/Transfer/${transferId}`);
      return this.http.put(url, TransctionitemMasterRecord, options);
    }
    
    
    
    public AssettransferSubmit(TransctionitemMasterRecord:any) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/Transfer/ItemTransfer';
      return this.http.post(url, TransctionitemMasterRecord, options);
    }
    UpdateAssettransferMasterById(TransctionitemMasterRecord:any,transferId:any) {
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/ItemTransfer/${transferId}`);
      return this.http.put(url, TransctionitemMasterRecord, options);
    }
    
}

