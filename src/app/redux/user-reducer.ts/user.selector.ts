import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IUserData } from '../redux-models/IUser.model';

const selectUser = (state: IAppState) => state.usersStore;
export const selectUsersList = createSelector(
    selectUser,
    (state: IUserData[]) => state
);
