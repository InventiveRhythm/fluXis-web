import type APIUser from '@/api/models/users/APIUser';
import type { APIMap } from '@/api/models/maps/APIMap';

export type APIScore = {
    id: number
    user: APIUser
    time: number
    mode: number
    mods: string
    pr: number
    score: number
    accuracy: number
    grade: string
    maxcombo: number
    flawless: number
    perfect: number
    great: number
    alright: number
    okay: number
    miss: number
    scrollspeed: number
    map: APIMap
}