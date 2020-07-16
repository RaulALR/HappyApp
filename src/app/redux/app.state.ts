import { IAuthData } from './redux-models/IAuth.model';
import { initialAuthState } from './auth-reducer.ts/auth.state';

export interface IAppState {
    userStore: IAuthData;

}

export const intialAppSate: IAppState = {
    userStore: initialAuthState,
};
