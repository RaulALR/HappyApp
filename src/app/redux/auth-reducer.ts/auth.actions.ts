import { Action } from '@ngrx/store';
import { IError } from 'src/app/core/models/error.model';
import { IAuthData, IAuthParams } from '../redux-models/IAuth.model';
import { IRegisterParams } from '../redux-models/IRegister.models';

export enum EAuthActions {
    GetAuth = '[Auth] Get Auth',
    GetAuthSuccess = '[Auth] Get Auth Success',
    GetAuthError = '[Auth] Get Auth Error',
    GetRegister = '[Auth] Get Register'
}

export class GetAuth implements Action {
    public readonly type = EAuthActions.GetAuth;
    constructor(public payload: IAuthParams) { }
}

export class GetAuthSuccess implements Action {
    public readonly type = EAuthActions.GetAuthSuccess;
    constructor(public payload: IAuthData) { }
}

export class GetAuthError implements Action {
    public readonly type = EAuthActions.GetAuthError;
    constructor(public payload: IError) { }
}

export class GetRegister implements Action {
    public readonly type = EAuthActions.GetRegister;
    constructor(public payload: IRegisterParams) { }
}

export type AuthActions = GetAuth | GetAuthSuccess | GetAuthError | GetRegister;
