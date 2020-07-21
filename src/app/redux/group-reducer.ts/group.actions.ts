import { Action } from '@ngrx/store';
import { IError } from 'src/app/core/models/error.model';
import { IGroupData, IGetGroup, IGetGroups, IUpdateGroupData, } from '../redux-models/IGroup.model';
import { IRegisterParams } from '../redux-models/IRegister.models';

export enum EGroupActions {
    GetGroups = '[Group] Get Groups',
    GetGroup = '[Group] Get Group',
    CreateGroup = '[Group] Create Group',
    UpdateGroup = '[Group] Update Group',
    DeleteGroup = '[Group] Delete Group',
    GetGroupSuccess = '[Group] Get Group Success',
    GetGroupError = '[Group] Get Group Error',
    GetRegister = '[Group] Get Register'
}

export class GetGroup implements Action {
    public readonly type = EGroupActions.GetGroup;
    constructor(public payload: IGetGroup) { }
}

export class GetGroups implements Action {
    public readonly type = EGroupActions.GetGroups;
    constructor(public payload: IGetGroups) { }
}

export class CreateGroup implements Action {
    public readonly type = EGroupActions.CreateGroup;
    constructor(public payload: IGroupData) { }
}

export class UpdateGroup implements Action {
    public readonly type = EGroupActions.UpdateGroup;
    constructor(public payload: IUpdateGroupData) { }
}

export class DeleteGroup implements Action {
    public readonly type = EGroupActions.DeleteGroup;
    constructor(public payload: IGetGroup) { }
}

export class GetGroupSuccess implements Action {
    public readonly type = EGroupActions.GetGroupSuccess;
    constructor(public payload: IGroupData[]) { }
}

export class GetGroupError implements Action {
    public readonly type = EGroupActions.GetGroupError;
    constructor(public payload: IError) { }
}

export class GetRegister implements Action {
    public readonly type = EGroupActions.GetRegister;
    constructor(public payload: IRegisterParams) { }
}

export type GroupActions = GetGroups | GetGroup | CreateGroup | GetGroupSuccess | GetGroupError | GetRegister | UpdateGroup | DeleteGroup;
