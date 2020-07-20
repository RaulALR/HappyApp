import { Injectable } from '@angular/core';
import { ofType, createEffect } from '@ngrx/effects';
import { EGroupActions, GetGroup, GetGroupSuccess, GetRegister, GetGroupError, GetGroups, CreateGroup } from './group.actions';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpService } from '../../core/services/http.service';
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
export class GroupEffects {

    protected getGroups$ = createEffect(() => this.actions$.pipe(
        ofType<GetGroups>(EGroupActions.GetGroups),
        switchMap(
            (action) => {
                const params = {
                    owner: action.payload && action.payload.owner ? action.payload.owner : null
                };
                return this.httpService.callBackEnd(GlobalConstants.endpoint.group, 'GET', params).pipe(
                    map(
                        (res) => {
                            return new GetGroupSuccess(res.data);
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

    protected getGroup$ = createEffect(() => this.actions$.pipe(
        ofType<GetGroup>(EGroupActions.GetGroup),
        switchMap(
            (action) => {
                return this.httpService.callBackEnd(`${GlobalConstants.endpoint.group}/${action.payload._id}`, 'GET').pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/create-poll']);
                            return new GetGroupSuccess(res.data);
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

    protected createGroup$ = createEffect(() => this.actions$.pipe(
        ofType<CreateGroup>(EGroupActions.CreateGroup),
        switchMap(
            (action) => {
                const params = {
                    groupName: action.payload && action.payload.groupName ? action.payload.groupName : null,
                    owner: action.payload && action.payload.owner ? action.payload.owner : null,
                    repondents: action.payload && action.payload.repondents ? action.payload.repondents : null
                };

                return this.httpService.callBackEnd(GlobalConstants.endpoint.group, 'POST', params).pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/view-groups']);
                            this.presentToast('groupCreated');
                            return new GetGroupSuccess(res);
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
        ofType<GetRegister>(EGroupActions.GetRegister),
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
                            return new GetGroupSuccess(res);
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
        private router: Router,
        public toastController: ToastController,
        public translateService: TranslateService
    ) { }

    async presentToast(logType: string) {
        const toast = await this.toastController.create({
            message: logType === 'groupCreated' ? this.translateService.instant('group.groupCreated') :
                this.translateService.instant('register.userSignUp'),
            duration: 2000
        });
        toast.present();
    }
}
