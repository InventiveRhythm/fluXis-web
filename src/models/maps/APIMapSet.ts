import type APIUser from '../users/APIUser';
import type { APIMap } from './APIMap';
import type { APIMapSetStatus } from './APIMapSetStatus';

export type APIMapSet = {
    id: number;
    creator: APIUser;
    maps: APIMap[];
    title: string;
    artist: string;
    source: string;
    tags: string[];
    description: string;
    flags: number;
    status: APIMapSetStatus;
    submitted: number;
    updated: number;
    ups: number;
    downs: number;
    show_mod_actions: boolean;
    queue_votes?: boolean[];
};
