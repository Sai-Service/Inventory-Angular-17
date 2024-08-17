import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { Location } from "@angular/common";
// import { AdminTransactionService } from '';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {  
  adminForm1: FormGroup;
  loginName:string|null;
 
  today = new Date();
  todaysDataTime = '';
  fullName:string|null;
  ouId:number;
  locName:string|null;
  loginArray:string|null;
 role:string|null;
 deptId:number;
 ouName:string|null;
 deptName:String|null;
 location:string | null;
 public show: boolean = false;
 pendingCount:number=0;
  // isVisibleMaster:boolean=true; 
  // isVisibletansaction:boolean=true;
  // isVisibleemplMaster:boolean=true;
  // isVisibleremainMaster:boolean=true;
  // isVisibleItDepartment:boolean=true;
  // isVisibleAdminDepartment:boolean=true;
  // isVisibleAdminDepartmentUserRole:boolean=true;
  // isVisibleUserDepartment:boolean=false;
  // isVisibleAdminMaster:boolean=false;
  // isVisibleItReports:boolean=false;
  // isVisibleAdminTransaction:boolean=false;
  isVisibleEmployeeMaster:boolean=false;
  isVisibleAllMaster:boolean=false;
  isVisibletansaction:boolean=false;
  isVisibleItReports:boolean=false;
  isVisibleAdminTransaction:boolean=false;
  isVisibleAdminAllMaster:boolean=false;
  isVisibleAdminReports:boolean=false;
  isVisibleAdminUserTransaction:boolean=false;
  isVisibleAdminUserReport:boolean=false;
  isVisibleBudgetTransaction:boolean=false;

  constructor(private fb: FormBuilder, private router: Router,) {
    // constructor(private router: Router ) {
    this.todaysDataTime = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );

    this.adminForm1 = fb.group({
     
      loginName:[],
      locName:[],
      loginArray:[],
      role:[],
      ouId:[],
      ouName:[],
      ouCity:[],
      deptId:[],
      deptName:[],
      location:[]
   

    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

   
  }

  @HostListener('window:unload', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    console.log(event);
  }

  get f() {
    return this.adminForm1.controls;
  }
  admin(adminForm1: any) {}

  ngOnInit(): void {
    this.deptName = sessionStorage.getItem('deptName')
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
   
     this.fullName = sessionStorage.getItem('loginName');
     this.loginName= sessionStorage.getItem('loginName');
     this.locName=sessionStorage.getItem('locId'); 
     this.location=sessionStorage.getItem('locName'); 
     this.loginArray= sessionStorage.getItem('loginName');
     this.role= sessionStorage.getItem('role');
     this.deptName=sessionStorage.getItem('deptName')
     this.deptId=Number(sessionStorage.getItem('deptId'))
      this.ouName= sessionStorage.getItem('ouName');
     this.ouId= Number(sessionStorage.getItem('ouId'));
     $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      if (!$(this).next().hasClass('show')) {
        $(this)
          .parents('.dropdown-menu')
          .first()
          .find('.show')
          .removeClass('show');
      }
      var $subMenu = $(this).next('.dropdown-menu');
      $subMenu.toggleClass('show');

      $(this)
        .parents('li.nav-item.dropdown.show')
        .on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass('show');
        });

      return false;
    });


   
    // if (sessionStorage.getItem('deptName')){
    //   this.isVisibleItDepartment=false;
    //   this.isVisibleAdminDepartment=true;
    //   this.isVisibleAdminDepartmentUserRole=false;
    //   this.isVisibleUserDepartment=false;
    //   this.isVisibleAdminMaster=true;
    // }

    if  (sessionStorage.getItem('deptName')==='IT DEPARTMENT'){
     this.isVisibleEmployeeMaster=false;
     this.isVisibleAllMaster=false;
     this.isVisibletansaction=true;
     this.isVisibleItReports=true;
     this.isVisibleAdminTransaction=false;
     this.isVisibleAdminAllMaster=false;
     this.isVisibleAdminReports=false;
     this.isVisibleAdminUserTransaction=false;
     this.isVisibleAdminUserReport=false;
     this.isVisibleBudgetTransaction=true;
    }
    if  (sessionStorage.getItem('deptName')==='IT DEPARTMENT'){
      if (sessionStorage.getItem('role')==='Admin'){
        this.isVisibleEmployeeMaster=true;
        this.isVisibleAllMaster=false;
        this.isVisibletansaction=true;
        this.isVisibleItReports=true;
        this.isVisibleAdminTransaction=false;
        this.isVisibleAdminAllMaster=false;
        this.isVisibleAdminReports=true;
        this.isVisibleAdminUserTransaction=false;
        this.isVisibleAdminUserReport=false;
        this.isVisibleBudgetTransaction=true;
      }
    }
    if  (sessionStorage.getItem('deptName')==='ADMIN'){
      if ( sessionStorage.getItem('role')==='Admin'){
      this.isVisibleEmployeeMaster=false;
      this.isVisibleAllMaster=false;
      this.isVisibletansaction=false;
      this.isVisibleItReports=false;
      this.isVisibleAdminTransaction=true;
      this.isVisibleAdminAllMaster=true;
      this.isVisibleAdminReports=true;
      this.isVisibleAdminUserTransaction=false;
      this.isVisibleAdminUserReport=false;
      this.isVisibleBudgetTransaction=false;
      }
     
    }
  
    if (sessionStorage.getItem('deptName') !='ADMIN'){
      if (sessionStorage.getItem('deptName') !='IT DEPARTMENT'){
      this.isVisibleAdminUserTransaction=true;
      this.isVisibleAdminUserReport=true;
      }
    }
  
    if(sessionStorage.getItem('role')==='SuperAdmin')
    {
      this.isVisibleAllMaster=true;
      this.isVisibletansaction=true;
    }
    if ( sessionStorage.getItem('loginName') === undefined || sessionStorage.getItem('loginName') === null ||
      sessionStorage.getItem('loginName') === '') {this.router.navigate(['login']);} 
    

      
  }

  close() {
    this.router.navigate(['login']);
  }

  dashboard() {
    this.router.navigate(['/admin']);
  }

  // userCheck(role: string):  {
  //   //alert(sessionStorage.getItem('roleId') +'--'+roleId );
  //   if (sessionStorage.getItem('role') === 'undefined') {
  //     // this.isVisible1 = false;
  //     return true;
  //   } else {
  //     //alert("else");
  //     if (sessionStorage.getItem('role') === role) {
  //       //  alert("role -true");
  //       return false;
  //     }

  //     if (sessionStorage.getItem('role') != role ){
  
  //       return true;
  //     }
  //   }
  // }

}
