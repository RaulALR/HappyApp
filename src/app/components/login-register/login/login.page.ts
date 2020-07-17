import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/shared/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../redux/app.state';
import { UtilsService } from '../../../core/shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { GetAuth } from 'src/app/redux/auth-reducer.ts/auth.actions';
import { loginForms } from './login.forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage extends BaseComponent {
  public formGroup: FormGroup;

  constructor(
    public store: Store<IAppState>,
    public utils: UtilsService,
    public translateService: TranslateService
  ) {
    super(store, utils, translateService);
    this.formGroup = this.utils.buildForm(loginForms);
  }

  logIn() {
    const params = {
      email: this.formGroup.get('email').value,
      password: this.formGroup.get('password').value
    };
    this.store.dispatch(new GetAuth(params));
  }


}
