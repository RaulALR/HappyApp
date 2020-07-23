import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from '../../core/shared/constants/global.constants';
import { UtilsService } from '../../core/shared/utils';
import { HttpService } from '../../core/services/http.service';
import { EUserActions, GetUsers, GetUserSuccess } from './user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserEffects {

    protected getUsers$ = createEffect(() => this.actions$.pipe(
        ofType<GetUsers>(EUserActions.GetUsers),
        switchMap(
            (action) => {
                const params = {
                    search: action.payload && action.payload.search ? action.payload.search : null
                };
                return this.httpService.callBackEnd(GlobalConstants.endpoint.users, 'GET', params).pipe(
                    map(
                        (res) => {
                            return new GetUserSuccess(res.data);
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
    ) { }
}
