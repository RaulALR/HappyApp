export interface IGetPolls {
    user: string;
}

export interface IGetPoll {
    _id: string;
    showResults?: boolean;
}

export interface IPollData {
    pollName: string;
    groupPoll: string;
    questions: string[];
    owner: string;
    answer?: IAnswerData;
}

export interface IUpdatePollData {
    _id: string;
    pollName: string;
    groupPoll: string;
    questions: string[];
    owner: string;
    answers?: IAnswerData;
}

export interface IAnswerData {
    user: string;
    answersData: string[];
}
