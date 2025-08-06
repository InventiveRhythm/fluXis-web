import type APIUser from '../users/APIUser';

export type APIGroup = {
    id: string;
    name: string;
    tag: string;
    color: string;
    members?: APIUser[];
};
