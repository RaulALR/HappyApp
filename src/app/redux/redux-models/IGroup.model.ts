export interface IGetGroups {
    owner: string;
}

export interface IGetGroup {
    _id: string;
}

export interface IGroupData {
    groupName: string;
    owner: string;
    repondents: string[];
}

export interface IUpdateGroupData {
    _id: string;
    groupName: string;
    owner: string;
    repondents: string[];
}
