import { initialUserState } from './user.state';
import { EUserActions, UserActions } from './user.actions';

export const userReducers = (state = initialUserState, action: UserActions) => {
    switch (action.type) {
        case EUserActions.GetUsers: {
            return {
                ...state,
                user: action.payload.search
            };
        }
        case EUserActions.GetUserSuccess: {
            return action.payload;
        }
        case EUserActions.GetUserError: {
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
