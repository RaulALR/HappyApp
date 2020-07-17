import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
