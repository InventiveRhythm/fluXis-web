import type APIUser from "../users/APIUser";

export type APIModdingAction = {
    id: string;
    user: APIUser;
    type: APIModdingActionType;
    content?: string;
    time: number;
};

export enum APIModdingActionType {
    Note = 0,
    Reply = 1,
    Approve = 2,
    Deny = 3,
    Submitted = 4,
    Update = 5
}
