import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterPage } from './login-register.page';

const routes: Routes = [
  {
    path: 'login-register',
    component: LoginRegisterPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterPageRoutingModule { }
