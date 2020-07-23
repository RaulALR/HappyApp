import { Action } from '@ngrx/store';
import { IError } from 'src/app/core/models/error.model';
import { IGetUsers, IUserData } from '../redux-models/IUser.model';

export enum EUserActions {
    GetUsers = '[User] Get Users',
    GetUserSuccess = '[User] Get User Success',
    GetUserError = '[User] Get User Error'
}

export class GetUsers implements Action {
    public readonly type = EUserActions.GetUsers;
    constructor(public payload: IGetUsers) { }
}

export class GetUserSuccess implements Action {
    public readonly type = EUserActions.GetUserSuccess;
    constructor(public payload: IUserData[]) { }
}

export class GetUserError implements Action {
    public readonly type = EUserActions.GetUserError;
    constructor(public payload: IError) { }
}


export type UserActions = GetUsers | GetUserSuccess | GetUserError;
