import { Injectable } from '@angular/core';
import { ofType, createEffect } from '@ngrx/effects';
import { EPollActions, GetPoll, GetPollSuccess, GetPolls, CreatePoll, UpdatePoll, DeletePoll } from './poll.actions';
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
export class PollEffects {

    protected getPolls$ = createEffect(() => this.actions$.pipe(
        ofType<GetPolls>(EPollActions.GetPolls),
        switchMap(
            (action) => {
                const params = {
                    user: action.payload && action.payload.user ? action.payload.user : null
                };
                return this.httpService.callBackEnd(GlobalConstants.endpoint.poll, 'GET', params).pipe(
                    map(
                        (res) => {
                            return new GetPollSuccess(res.data);
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

    protected getPoll$ = createEffect(() => this.actions$.pipe(
        ofType<GetPoll>(EPollActions.GetPoll),
        switchMap(
            (action) => {
                return this.httpService.callBackEnd(`${GlobalConstants.endpoint.poll}/${action.payload._id}`, 'GET').pipe(
                    map(
                        (res) => {
                            const navigationExtras: NavigationExtras = { state: { data: { _id: action.payload._id } } };
                            if (res.data.owner === JSON.parse(sessionStorage.user).email) {
                                this.router.navigate(['/tabs/create-poll'], navigationExtras);
                            } else {
                                this.router.navigate(['/tabs/do-poll'], navigationExtras);
                            }
                            return new GetPollSuccess([res.data]);
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

    protected createPoll$ = createEffect(() => this.actions$.pipe(
        ofType<CreatePoll>(EPollActions.CreatePoll),
        switchMap(
            (action) => {
                const params = {
                    pollName: action.payload && action.payload.pollName ? action.payload.pollName : null,
                    groupPoll: action.payload && action.payload.groupPoll ? action.payload.groupPoll : null,
                    questions: action.payload && action.payload.questions ? action.payload.questions : null,
                    owner: action.payload && action.payload.owner ? action.payload.owner : null
                };
                return this.httpService.callBackEnd(GlobalConstants.endpoint.poll, 'POST', params).pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/view-polls']);
                            this.presentToast('pollCreated');
                            return new GetPollSuccess(res);
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

    protected updatePoll$ = createEffect(() => this.actions$.pipe(
        ofType<UpdatePoll>(EPollActions.UpdatePoll),
        switchMap(
            (action) => {
                const params = {
                    _id: action.payload && action.payload._id ? action.payload._id : null,
                    pollName: action.payload && action.payload.pollName ? action.payload.pollName : null,
                    groupPoll: action.payload && action.payload.groupPoll ? action.payload.groupPoll : null,
                    questions: action.payload && action.payload.questions ? action.payload.questions : null,
                    owner: action.payload && action.payload.owner ? action.payload.owner : null
                };

                return this.httpService.callBackEnd(GlobalConstants.endpoint.poll, 'PUT', params).pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/view-polls']);
                            this.presentToast('pollUpdated');
                            return new GetPollSuccess(res);
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

    protected deletePoll$ = createEffect(() => this.actions$.pipe(
        ofType<DeletePoll>(EPollActions.DeletePoll),
        switchMap(
            (action) => {
                return this.httpService.callBackEnd(GlobalConstants.endpoint.poll, 'DELETE', { _id: action.payload._id }).pipe(
                    map(
                        (res) => {
                            this.router.navigate(['/tabs/view-polls']);
                            this.presentToast('pollDeleted');
                            return new GetPollSuccess(res);
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
            message: this.translateService.instant(`createPoll.${logType}`),
            duration: 2000
        });
        toast.present();
    }
}
