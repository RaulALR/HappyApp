import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterMainPage } from './login-register-main.page';

const routes: Routes = [
  {
    path: 'login-register-main',
    component: LoginRegisterMainPage,
    children: [
      {
        path: 'login-register',
        loadChildren: () => import('./login-register/login-register.module').then(m => m.LoginRegisterPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
      },
      // {
      //   path: 'forgot-user',
      //   loadChildren: () => import('./principal-menu/create-poll/create-poll.module').then(m => m.CreatePollModule)
      // },
      {
        path: '',
        redirectTo: '/login-register-main/login-register',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login-register-main/login-register',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterPageRoutingModule { }
