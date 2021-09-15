import { UtilsService } from './../../../core/shared/utils';
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

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    public toastController: ToastController,
    public translateService: TranslateService,
    public router: Router,
    public store: Store<IAppState>,
    public utils: UtilsService
  ) {
    super(store, utils, translateService);
    this.formGroup = this.utils.buildForm(registerForms);
    console.log(this.formGroup);
  }

  public getFormObject(key: string) {
    let validators;
    registerForms.forEach(item => {
      if (item.name === key) {
        validators = item.validators;
      }
    })
    return validators;
  }

  public getLabelError(key: string) {
    let errors;
    registerForms.forEach(item => {
      if (item.name === key) {
        errors = item.errors;
      }
    })
    return errors;
  }

  public signUp() {
    const params = {
      email: this.formGroup.get('email').value,
      password: this.formGroup.get('password').value,
      repeatPassword: this.formGroup.get('repeatPassword').value,
    };
    this.store.dispatch(new GetRegister(params));
  }

  ngOnInit() { }
}
