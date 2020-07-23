
import { IPollData } from '../redux-models/IPoll.model';

export const initialPollState: IPollData[] = [{
    pollName: null,
    groupPoll: null,
    questions: null,
    owner: null
}];
