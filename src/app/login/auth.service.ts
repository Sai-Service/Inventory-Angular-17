import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import{ AppConst} from '../app-const'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders;
  ServerUrl : string;
  constructor(private httpclient: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;

  }
  public login(username: string, password: string) {
    const body = {
      'loginName': username,
      'password': password,
    };
    let options = {
      headers: this.headers
    };
    // const url = 'http://localhost:8080/EmpMst/loginpage';
    // const url='http://saihorizontest.com:8080/ITInventory/EmpMst/loginpage';
    // const url='http://192.168.3.29:8080/ITInventory/EmpMst/loginpage';
    // const url= "http://saierp.horizon.org:8080/ErpReplica/loginpage";  
    // const url='http://192.168.100.34:8080/ITInventory/EmpMst/loginpage';
    // const url= "http://115.242.10.86:6101/ITInventory/EmpMst/loginpage"; 
    const url= "http://saidev.horizon.org:6101/InventoryAdmin/EmpMst/loginpage";  

        
    console.log(body);  
    return this.httpclient.post(url, body, options)

  }


  public resetPassword(userName: string, password: string,nPassword : string,cPassword : string) {
    const body = {
      'userName': userName,
      'password': password,
      'nPassword': nPassword,
      'cPassword': cPassword
    };
    let options = {
      headers: this.headers
    };
     const url = 'http://localhost:8081/resetpassword';
    // const url='http://saibajajreport.horizon.org:8052/ErpReplica/resetpassword';
    // const url='http://saidev.horizon.org:8080/ErpReplica/loginpage';
    // const url= "http://saierp.horizon.org:8080/ErpReplica/resetpassword"; 
    console.log(body);
    return this.httpclient.put(url, body, options)

  }

}
