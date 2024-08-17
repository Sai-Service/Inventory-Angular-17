import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AppConst } from '../app-const'


@Injectable({
  providedIn: 'root'
})
export class AdminMasterService {
  httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
  }
 

  findByItemDetails(itemId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/AdminItem/${itemId}`);
  }

  statusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/STATUS');
  }

  ALLhasncodelist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/hsnSacMst/codeType/HSN');
  }

  Alluomlist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/UOM');
  }


  MtmetypeList(msmetyp:any,attribute:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeTypeMst/AllReasons?cmnType=${msmetyp}&attribute4=${attribute}`);
  }
  
  DoctransactiontypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/TransactionType');
  }

  onSelectmsmesubtypFn(msmetyp:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/${msmetyp}`);
  }

  paymentTermFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/PayTerms');
  }

  Satedisplayist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/State');
  }


  AdminvendorIdFindFN(vendorId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/AdminVendor/${vendorId}`);
  } 

  vendorNameFn(vendorName:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/AdminVendor/Vendorlikesrch?vendorName=${vendorName}`);
  } 

  public itemMasterSave(itemMasterData:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/AdminItem/addItem';
    return this.http.post(url, itemMasterData, options);
  }

  getLocationId(ouId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/loc/${ouId}`);
  }

  

  itemMasterUpdate(itemId:any,updateItemMaster:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/AdminItem/${itemId}`);
    return this.http.put(url, updateItemMaster, options);
  }

  

  public saveVendorDetailsFn(itemMasterData:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/AdminVendor/addVendor';
    return this.http.post(url, itemMasterData, options);
  }

  
  updateVendorDetailsFn(vendorId:any,updateItemMaster:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/AdminVendor/${vendorId}`); 
    return this.http.put(url, updateItemMaster, options);
  }

  public saveDocMaster(itemMasterData:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/DocSrl/addDocSrl';
    return this.http.post(url, itemMasterData, options);
  }
  
  itemDocUpdate(docSrlID:any,updateItemMaster:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/DocSrl/${docSrlID}`);
    return this.http.put(url, updateItemMaster, options);
  }


  AdminDocNoFindFN(docSrlID:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/DocSrl/${docSrlID}`);
  } 

  allDocmstSearch(ouid:any,locid:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/DocSrl/DocSrl?ouId=${ouid}&locId=${locid}`);
  } 

  allItemmstSearch(itemcat:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/AdminItem/AllItems?category=${itemcat}`);
  } 

  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/City');
  }
//////////////////////////////////////////VENDOR MASTER/////////////////////////////


  getsearchBySuppCode(suppNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/bycode/${suppNo}`);
  }

  taxCategorySiteList1(ouId:any, state:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgNameSuppSitewise?ouId=${ouId}&custState=${state}`);
  }

  getTaxCat(ouId:any): Observable<any> {
    // return this.http.get(this.ServerUrl + `/JaiTaxCatg/${ouId}`);
    return this.http.get(this.ServerUrl + `/taxCtgHeader/${ouId}`);
 
  }

  supplierName(supName:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/suppName?name=${supName}`);
  }

  getTdsType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/SuppTdsType`);
  }
  SupliMasterSubmitForSite(SupliMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/supp/withSite';
    const url = this.ServerUrl + '/supp/site';
    return this.http.post(url, SupliMasterRecord, options);
  }
  UpdateSupliMasterById(SupliMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/supp');
    return this.http.put(url, SupliMasterRecord, options);
  }
  UpdateSiteSupliMasterById(SupliMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    // const url = (this.ServerUrl + `/supp/${suppId}`);
    const url = (this.ServerUrl + '/supp/site');
    return this.http.put(url, SupliMasterRecord, options);
  }
  public SupliMasterSubmit(SupliMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/supp';
    return this.http.post(url, SupliMasterRecord, options);
  }

  getInterBranch(InterBranch1:any, lType:any): Observable<any> {

    const REQUEST_PARAMS = new HttpParams().set('lookupType', lType).set('lookupValue', InterBranch1)
    const REQUEST_URI = this.ServerUrl + '/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  segmentNameList(segmentName:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/glCodeCmbn/codeComb/${segmentName}`);
  }

  
  
  tdsSectionList(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/cmnLookup/type/JAI_TDS_SECTION');
    return this.http.get(this.ServerUrl + '/CodeMst/dept/JAI_TDS_SECTION');
  }

  locationCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location');
  }

  InterBrancList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Interbranch');
  }

  NaturalAccountList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/Payable');
  }
  costCenterList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre');
  }

  CostCenterList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre');
  }

  BranchList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Branch');
  }
  OUIdListDiv(mDivId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/opUnit/divisionWise/${mDivId}`);
  }

  StateList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CodeMst/dept/State');
  }
  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/YesNo');
  }

  supplierType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/CodeMst/dept/SUPPLIERTYPE`);
  }

  getsupplierMastSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp');
  }


  /////////////////////////////////////item Mater ///////////////////////////////////////////////


  UpdateItemMasterById(itemMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/itemMst/withInfo1`);
    return this.http.put(url, itemMasterRecord, options);
  }

  public VehItemSubmit(VehItemRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/itemMst/withInfo1';
    return this.http.post(url, VehItemRecord, options);
  }

  insSiteList(customerId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/${customerId}`);

  }

  ewInsSiteList(customerId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/${customerId}`);
  }

  getItemCodePach(segment:any): Observable<any> {
    // return this.http.get(this.ServerUrl +`/itemMst/${segment}`);
    return this.http.get(this.ServerUrl + `/itemMst/bySegment/${segment}`);
  }

  hsnSacCodeData(type:any): Observable<any> {
    // return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
    return this.http.get(this.ServerUrl + `/hsnSacMst/codeType/${type}`);
  }
  variantCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }
  colorCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MulColour');
  }

  mainModelListByDivisionId(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/Catgtype?cmnType=Model&divisionId=' + sessionStorage.getItem('divisionId'));
  }

  categoryIdList1(category:any, divisionId:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/typeDivision?itemType=${category}&divisionId=${divisionId}`);
  }


SSitemTypeListFn(): Observable<any> {
  return this.http.get(this.ServerUrl + '/itemCategory/type');
}

uomList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/cmnLookup/type/UOM');
}


itemTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/cmnLookup/ItemType');
}


insNameList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/Customer/ClassCode/INSURER');
}

holdReasonList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/cmnLookup/HoldReason');
}

hsnSacCodeDet(mHsnCode:any): Observable<any> {
  // alert("ms >> "+mHsnCode);
  return this.http.get(this.ServerUrl + `/hsnSacMst/${mHsnCode}`);
}
taxCategoryListHSN(mPer:any, mType:any): Observable<any> {
  // alert("MTYPE= "+mType + "  MPER= " + mPer);
  return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateGstPer?taxCatType=${mType}&gstPer=${mPer}`);
}



VariantSearchFn(mainModel:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`);  ////CodeMst/dept/STATIONARY
}

ColourSearchFn(variant:any): Observable<any> {

  return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`);  ////CodeMst/dept/STATIONARY

}




AllreqItemCatagList(): Observable<any> {
  var dept = sessionStorage.getItem('deptName');
  return this.http.get(this.ServerUrl + `/AdminItem/DistinctItems`);  ////CodeMst/dept/STATIONARY
}

AllreqItemCatagList1(): Observable<any> {
  var attribute1= "ADMIN"
  var sts ="Active"
  return this.http.get(this.ServerUrl + `/CodeTypeMst/AllAdmin?attribute4=${attribute1}&status=${sts} `);  ////http://localhost:8080/CodeTypeMst/AllAdmin?attribute4=ADMIN&status=Active    
}


onSelectReqItemNameFn(codeType:any): Observable<any> {
  return this.http.get(this.ServerUrl + `/AdminItem/AllItems?category=${codeType}`); ////CodeTypeMst/REQ/REQ
}


}
