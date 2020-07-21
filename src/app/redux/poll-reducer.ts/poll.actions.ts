import { Action } from '@ngrx/store';
import { IError } from 'src/app/core/models/error.model';
import { IPollData, IGetPoll, IGetPolls, IUpdatePollData, } from '../redux-models/IPoll.model';
import { IRegisterParams } from '../redux-models/IRegister.models';

export enum EPollActions {
    GetPolls = '[Poll] Get Polls',
    GetPoll = '[Poll] Get Poll',
    CreatePoll = '[Poll] Create Poll',
    UpdatePoll = '[Poll] Update Poll',
    DeletePoll = '[Poll] Delete Poll',
    GetPollSuccess = '[Poll] Get Poll Success',
    GetPollError = '[Poll] Get Poll Error',
    GetRegister = '[Poll] Get Register'
}

export class GetPoll implements Action {
    public readonly type = EPollActions.GetPoll;
    constructor(public payload: IGetPoll) { }
}

export class GetPolls implements Action {
    public readonly type = EPollActions.GetPolls;
    constructor(public payload: IGetPolls) { }
}

export class CreatePoll implements Action {
    public readonly type = EPollActions.CreatePoll;
    constructor(public payload: IPollData) { }
}

export class UpdatePoll implements Action {
    public readonly type = EPollActions.UpdatePoll;
    constructor(public payload: IUpdatePollData) { }
}

export class DeletePoll implements Action {
    public readonly type = EPollActions.DeletePoll;
    constructor(public payload: IGetPoll) { }
}

export class GetPollSuccess implements Action {
    public readonly type = EPollActions.GetPollSuccess;
    constructor(public payload: IPollData[]) { }
}

export class GetPollError implements Action {
    public readonly type = EPollActions.GetPollError;
    constructor(public payload: IError) { }
}

export class GetRegister implements Action {
    public readonly type = EPollActions.GetRegister;
    constructor(public payload: IRegisterParams) { }
}

export type PollActions = GetPolls | GetPoll | CreatePoll | GetPollSuccess | GetPollError | GetRegister | UpdatePoll | DeletePoll;
