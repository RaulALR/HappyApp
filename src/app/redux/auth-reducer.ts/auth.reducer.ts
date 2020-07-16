import { initialAuthState } from './auth.state';
import { AuthActions, EAuthActions } from './auth.actions';

export const authReducers = (state = initialAuthState, action: AuthActions) => {
    switch (action.type) {
        case EAuthActions.GetAuth: {
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
            };
        }
        case EAuthActions.GetAuthSuccess: {
            return {
                ...state,
                token: action.payload.token
            };
        }
        case EAuthActions.GetAuthError: {
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
