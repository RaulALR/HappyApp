import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../core/shared/base.component';
import { IAppState } from '../../../redux/app.state';
import { GetRegister } from '../../../redux/auth-reducer.ts/auth.actions';
import { registerForms } from './register.forms';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/core/shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    public toastController: ToastController,
    public translateService: TranslateService,
    public router: Router,
    public store: Store<IAppState>,
    public utils: UtilsService,
  ) {
    super(store, utils, translateService);
    this.formGroup = this.utils.buildForm(registerForms);
    console.log(this.formGroup);
  }

  public signUp() {
    const params = {
      email: this.formGroup.get('email').value,
      firstName: this.formGroup.get('firstName').value,
      lastName: this.formGroup.get('lastName').value,
      password: this.formGroup.get('password').value,
      repeatPassword: this.formGroup.get('repeatPassword').value
    };
    this.store.dispatch(new GetRegister(params));
  }

  ngOnInit() {
  }
}
