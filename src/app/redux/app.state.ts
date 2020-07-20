import { IAuthData } from './redux-models/IAuth.model';
import { initialAuthState } from './auth-reducer.ts/auth.state';
import { IGroupData } from './redux-models/IGroup.model';
import { initialGroupState } from './group-reducer.ts/group.state';

export interface IAppState {
    userStore: IAuthData;
    groupStore: IGroupData[];

}

export const intialAppSate: IAppState = {
    userStore: initialAuthState,
    groupStore: initialGroupState
};
