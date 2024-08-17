import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdminTransactionService } from '../../admin-transaction/admin-transaction.service';


export interface IItem {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username:string;
  password:string;
  loginArray: any[];
  divisionId: any[];
  users: any[];
  lstcomments1: any[];
  divisionCode: string;
  ticketNo: string;
  divisionName:string;
  compName:string;
  locName:string;
  role:string;
  ouId:number;
  status:string;
  ouCity:string;
  ouName:string;
  deptName:string;
  compCode:string;
  empId:number;
  pendingCount:number=(0);
 
  currentDateList: any = [];
  viewAllReqisision:any=[];

  constructor(private router: Router, private loginService: AuthService,private service:AdminTransactionService) { }

  ngOnInit(): void {

  }

  forgetPassword(){
    this.router.navigate(['/forgetPasswordWindow']);   
   
  }


  login() {

    if (this.username == undefined || this.username == "") {
      alert('Please enter valid Username !');
      return;
    }

    if (this.password == undefined || this.password == "") {
      alert('Please enter valid Password !');
      return;
    }
    this.loginService.login(this.username, this.password).subscribe((res: any) => {
      console.log('Res', res);
          if (res.code === 200) {  
       this.router.navigate(['/admin']);
       sessionStorage.setItem('loginName', res.obj.loginName);
       sessionStorage.setItem('deptId', res.obj.deptId);
       sessionStorage.setItem('locId', res.obj.locId);
       sessionStorage.setItem('ouId', res.obj.ouId);
       sessionStorage.setItem('divisionName', res.obj.divisionName);
       sessionStorage.setItem('compName', res.obj.compName);
       sessionStorage.setItem('compCode', res.obj.compCode);
       sessionStorage.setItem('locName', res.obj.locName);
       sessionStorage.setItem('divisionId', res.obj.divisionId);
       sessionStorage.setItem('ouName', res.obj.ouName);
       sessionStorage.setItem('empName', res.obj.empName)
       sessionStorage.setItem('role', res.obj.role);
       sessionStorage.setItem('status', res.obj.status);
       sessionStorage.setItem('ouCity', res.obj.ouCity);
       sessionStorage.setItem('city', res.obj.ouId);
       sessionStorage.setItem('deptName', res.obj.deptName);
       sessionStorage.setItem('tktNo', res.obj.tktNo);
       sessionStorage.setItem('empId', res.obj.empId);


       var deptId = Number(sessionStorage.getItem('deptId'));
       var ouId = Number(sessionStorage.getItem('ouId'));
         var tktNo =(sessionStorage.getItem('tktNo')) ;
         var stsreq='OPEN';
         this.service.viewReqisisionListFn(ouId,deptId,tktNo,stsreq)
         .subscribe((res: any) => {
           if (res.code === 200) {
           if(sessionStorage.getItem('role')==='Admin' || this.pendingCount > 0  ){
               this.viewAllReqisision=res.obj;
               this.pendingCount = res.obj.filter((item:any) => item.reqstatus === 'OPEN').length;
               alert(this.pendingCount+'-'+"User Requsition Pending On Your Location Please Check Pending Requisitions List Form.");
               console.log(this.pendingCount);
           }
           else{}
           }
           else{}
       })
       
      } 
      else if (res.code === 400) {
        alert('Incorrect Username or Password');
      } else {
        alert('Login Error - Application is not responsding properly!');
      }
    });

  }




}

