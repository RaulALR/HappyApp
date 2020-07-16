import { Injectable } from '@angular/core';
import { ofType, Effect } from '@ngrx/effects';
import { EAuthActions, GetAuth, GetAuthSuccess, GetRegister } from './auth.actions';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpService } from '../../core/services/http.service';
import { Utils } from 'src/app/core/services/utils';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {

    @Effect()
    protected getAuth$ = this.actions$.pipe(
        ofType<GetAuth>(EAuthActions.GetAuth),
        switchMap(
            (action) => {
                const params = {
                    username: action.payload && action.payload.username ? action.payload.username : null,
                    password: action.payload && action.payload.password ? action.payload.password : null
                };

                return this.httpService.callBackEnd('environment.endpoints.login.auth', 'POST', params).pipe(
                    map(
                        (res) => {
                            return this.getAuthSuccess(res);
                        },
                        (error) => {
                            return this.utils.showErrorToast(error);
                        }),
                    catchError(error => of(this.utils.showErrorToast(error)))
                );
            }
        ),
        map(res => res)
    );

    @Effect()
    protected getRegister$ = this.actions$.pipe(
        ofType<GetRegister>(EAuthActions.GetRegister),
        switchMap(
            (action) => {
                const params = {
                    username: action.payload && action.payload.username ? action.payload.username : null,
                    password: action.payload && action.payload.password ? action.payload.password : null,
                    email: action.payload && action.payload.email ? action.payload.email : null,
                    repeatPassword: action.payload && action.payload.repeatPassword ? action.payload.repeatPassword : null
                };

                return this.httpService.callBackEnd('environment.endpoints.login.register', 'POST', params).pipe(
                    map(
                        (res) => {
                            return this.getAuthSuccess(res);
                        },
                        (error) => {
                            return this.utils.showErrorToast(error);
                        }),
                    catchError(error => of(this.utils.showErrorToast(error)))
                );
            }
        ),
        map(res => res)
    );

    constructor(
        private httpService: HttpService,
        private actions$: Actions,
        private utils: Utils,
        private authService: AuthService,
        private router: Router
    ) { }

    private getAuthSuccess(res: any) {
        const decodeUser = this.utils.decodeJWT(res.data);
        const user = {
            token: res.data,
            username: decodeUser.username,
            email: decodeUser.email
        };
        this.authService.login(user);
        this.router.navigate(['/home']);
        return new GetAuthSuccess(user);
    }
}
