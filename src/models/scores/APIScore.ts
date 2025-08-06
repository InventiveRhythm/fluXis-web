import type { APIMap } from '../maps/APIMap';
import type APIUser from '../users/APIUser';

export type APIScore = {
    id: number;
    user: APIUser;
    time: number;
    mode: number;
    mods: string;
    pr: number;
    score: number;
    accuracy: number;
    grade: string;
    maxcombo: number;
    flawless: number;
    perfect: number;
    great: number;
    alright: number;
    okay: number;
    miss: number;
    scrollspeed: number;
    map: APIMap;
};
