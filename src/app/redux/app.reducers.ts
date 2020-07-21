import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { authReducers } from './auth-reducer.ts/auth.reducer';
import { groupReducers } from './group-reducer.ts/group.reducer';
import { pollReducers } from './poll-reducer.ts/poll.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
    userStore: authReducers,
    groupStore: groupReducers,
    pollStore: pollReducers
};
