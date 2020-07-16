import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IAuthData } from '../redux-models/IAuth.model';

const selectUser = (state: IAppState) => state.userStore;
export const selectAuthList = createSelector(
    selectUser,
    (state: IAuthData) => state
);
