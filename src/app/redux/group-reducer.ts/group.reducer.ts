import { initialGroupState } from './group.state';
import { EGroupActions, GroupActions } from './group.actions';

export const groupReducers = (state = initialGroupState, action: GroupActions) => {
    switch (action.type) {
        case EGroupActions.GetGroups: {
            return {
                ...state,
                owner: action.payload.owner
            };
        }
        case EGroupActions.GetGroupSuccess: {
            return action.payload;
        }
        case EGroupActions.GetGroupError: {
            return {
                ...state,
                error: action.payload.message,
                status: action.payload.id
            };
        }
        default:
            return state;
    }
};
