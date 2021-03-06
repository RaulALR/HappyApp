import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRegisterPageRoutingModule } from './login-register-main-routing.module';

import { LoginRegisterMainPage } from './login-register-main.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginRegisterPageRoutingModule,
    TranslateModule
  ],
  declarations: [LoginRegisterMainPage]
})
export class LoginRegisterMainPageModule {}
