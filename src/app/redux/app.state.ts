import { IAuthData } from './redux-models/IAuth.model';
import { initialAuthState } from './auth-reducer.ts/auth.state';
import { IGroupData } from './redux-models/IGroup.model';
import { initialGroupState } from './group-reducer.ts/group.state';
import { initialPollState } from './poll-reducer.ts/poll.state';
import { IPollData } from './redux-models/IPoll.model';

export interface IAppState {
    userStore: IAuthData;
    groupStore: IGroupData[];
    pollStore: IPollData[];

}

export const intialAppSate: IAppState = {
    userStore: initialAuthState,
    groupStore: initialGroupState,
    pollStore: initialPollState
};
