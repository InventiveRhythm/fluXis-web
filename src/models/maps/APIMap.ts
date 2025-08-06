import APIUser from '../users/APIUser';
import type { APIMapEffectType } from './APIMapEffectType';

export type APIMap = {
    id: number;
    mapset: number;
    mapper: APIUser;
    hash: string;
    difficulty: string;
    title: string;
    artist: string;
    source: string;
    tags: string;
    mode: number;
    status: number;
    bpm: number;
    length: number;
    notes: number;
    'long-notes': number;
    maxcombo: number;
    nps: number;
    rating: number;
    accuracy: number;
    health: number;
    effects: APIMapEffectType;
    has_voted_rate: boolean;
};
