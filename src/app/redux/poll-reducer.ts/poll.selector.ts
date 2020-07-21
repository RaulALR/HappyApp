import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IPollData } from '../redux-models/IPoll.model';

const selectPoll = (state: IAppState) => state.pollStore;
export const selectPollList = createSelector(
    selectPoll,
    (state: IPollData[]) => state
);
