import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { authReducers } from './auth-reducer.ts/auth.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
    userStore: authReducers
};
