import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { GetAuthError } from 'src/app/redux/auth-reducer.ts/auth.actions';

@Injectable()
export class UtilsService {
  constructor(
    private domSanitizer: DomSanitizer,
    public formBuilder: FormBuilder
  ) { }
  public decodeJWT(token) {
    return jwt_decode(token);
  }

  public getMatErrorMessage(control: FormControl, literals: any) {
    let msg = null;
    literals.forEach((item) => {
      if (control.hasError(item.error)) {
        msg = item.msg;
      }
    });
    return msg;
  }

  public showErrorToast(err) {
    console.log(err);
    return new GetAuthError(err);
  }

  public buildForm(formData) {
    const group = {};
    formData.forEach((element) => {
      let validators = [];
      if (element.validators) {
        validators = element.validators.map((item) => {
          return Validators[item];
        });
      }
      group[element.name] = ['', validators];
    });
    return this.formBuilder.group(group);
  }

  public resetForm(group) {
    Object.keys(group.controls).forEach((item) => {
      group.get(item).setValue('');
    });
  }
}
