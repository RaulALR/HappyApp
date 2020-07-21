import { initialPollState } from './poll.state';
import { EPollActions, PollActions } from './poll.actions';

export const pollReducers = (state = initialPollState, action: PollActions) => {
    switch (action.type) {
        case EPollActions.GetPolls: {
            return {
                ...state,
                user: action.payload.user
            };
        }
        case EPollActions.GetPollSuccess: {
            return action.payload;
        }
        case EPollActions.GetPollError: {
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
