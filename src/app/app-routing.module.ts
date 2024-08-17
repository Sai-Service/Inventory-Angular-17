import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule) },
  {path :'login',loadChildren:()=> import('./login/login.module').then(m=> m.LoginModule)},
  { path : '' ,redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FormsModule,ReactiveFormsModule,]
})
export class AppRoutingModule { }
