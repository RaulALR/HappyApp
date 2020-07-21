export interface IGetPolls {
    user: string;
}

export interface IGetPoll {
    _id: string;
}

export interface IPollData {
    pollName: string;
    groupPoll: string;
    questions: string;
}

export interface IUpdatePollData {
    _id: string;
    pollName: string;
    groupPoll: string;
    questions: string;
}
