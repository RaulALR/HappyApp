import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { GetAuthError } from 'src/app/redux/auth-reducer.ts/auth.actions';

@Injectable()
export class Utils {

    constructor(
        private domSanitizer: DomSanitizer
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
}
