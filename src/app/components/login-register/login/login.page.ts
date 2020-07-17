import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/shared/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../redux/app.state';
import { UtilsService } from '../../../core/shared/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage extends BaseComponent {

  constructor(
    public store: Store<IAppState>,
    public utils: UtilsService,
    public translateService: TranslateService
  ) {
    super(store, utils, translateService);
  }

  logIn(event) {
    const params = {
      // username: this.formGroup.get('username').value,
      // password: this.formGroup.get('password').value
    };
    // this.store.dispatch(new GetAuth(params));
  }


}
