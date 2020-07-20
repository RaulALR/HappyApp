import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IGroupData } from '../redux-models/IGroup.model';

const selectGroup = (state: IAppState) => state.groupStore;
export const selectGroupList = createSelector(
    selectGroup,
    (state: IGroupData[]) => state
);
