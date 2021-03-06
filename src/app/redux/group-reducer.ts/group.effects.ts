import { Injectable } from '@angular/core';
import { ofType, createEffect } from '@ngrx/effects';
import { EGroupActions, GetGroup, GetGroupSuccess, GetRegister, GetGroupError, GetGroups, CreateGroup, UpdateGroup, DeleteGroup } from './group.actions';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpService } from '../../core/services/http.service';
import { Router, NavigationExtras } from '@angular/router';
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
                            const navigationExtras: NavigationExtras = { state: { data: { _id: action.payload._id } } };
                            this.router.navigate(['/tabs/create-group'], navigationExtras);
                            return new GetGroupSuccess([res.data]);
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

    protected updateGroup$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateGroup>(EGroupActions.UpdateGroup),
        switchMap(
            (action) => {
                const params = {
                    _id: action.payload && action.payload._id ? action.payload._id : null,
                    groupName: action.payload && action.payload.groupName ? action.payload.groupName : null,
                    owner: action.payload && action.payload.owner ? action.payload.owner : null,
                    repondents: action.payload && action.payload.repondents ? action.payload.repondents : null
                };

                return this.httpService.callBackEnd(GlobalConstants.endpoint.group, 'PUT', params).pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/view-groups']);
                            this.presentToast('groupUpdated');
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

    protected deleteGroup$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteGroup>(EGroupActions.DeleteGroup),
        switchMap(
            (action) => {
                return this.httpService.callBackEnd(GlobalConstants.endpoint.group, 'DELETE', { _id: action.payload._id }).pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/view-groups']);
                            this.presentToast('groupDeleted');
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
            message: this.translateService.instant(`group.${logType}`),
            duration: 2000
        });
        toast.present();
    }
}
