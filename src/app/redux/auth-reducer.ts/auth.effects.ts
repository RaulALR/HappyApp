import { Injectable } from '@angular/core';
import { ofType, Effect, createEffect } from '@ngrx/effects';
import { EAuthActions, GetAuth, GetAuthSuccess, GetRegister, GetAuthError } from './auth.actions';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpService } from '../../core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalConstants } from 'src/app/core/shared/constants/global.constants';
import { UtilsService } from 'src/app/core/shared/utils';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {

    protected getAuth$ = createEffect(() => this.actions$.pipe(
        ofType<GetAuth>(EAuthActions.GetAuth),
        switchMap(
            (action) => {
                const params = {
                    email: action.payload && action.payload.email ? action.payload.email : null,
                    password: action.payload && action.payload.password ? action.payload.password : null
                };

                return this.httpService.callBackEnd(GlobalConstants.endpoint.login, 'POST', params).pipe(
                    map(
                        (res) => {
                            this.presentToast('signIn');
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
    ));

    protected getRegister$ = createEffect(() => this.actions$.pipe(
        ofType<GetRegister>(EAuthActions.GetRegister),
        switchMap(
            (action) => {
                const params = {
                    lastName: action.payload && action.payload.lastName ? action.payload.lastName : null,
                    firstName: action.payload && action.payload.firstName ? action.payload.firstName : null,
                    password: action.payload && action.payload.password ? action.payload.password : null,
                    email: action.payload && action.payload.email ? action.payload.email : null,
                    repeatPassword: action.payload && action.payload.repeatPassword ? action.payload.repeatPassword : null
                };

                return this.httpService.callBackEnd(GlobalConstants.endpoint.register, 'POST', params).pipe(
                    map(
                        (res) => {
                            this.presentToast('signUp');
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
    ));

    constructor(
        private httpService: HttpService,
        private actions$: Actions,
        private utils: UtilsService,
        private authService: AuthService,
        private router: Router,
        public toastController: ToastController,
        public translateService: TranslateService
    ) { }

    private getAuthSuccess(res: any) {
        const decodeUser = this.utils.decodeJWT(res.data);
        const user = {
            token: res.data,
            username: decodeUser.username,
            email: decodeUser.email
        };
        this.authService.login(user);
        this.router.navigate(['/tabs']);
        return new GetAuthSuccess(user);
    }

    async presentToast(logType: string) {
        const toast = await this.toastController.create({
            message: logType === 'signIn' ? this.translateService.instant('login.userSignIn') :
                this.translateService.instant('register.userSignUp'),
            duration: 2000
        });
        toast.present();
    }
}
