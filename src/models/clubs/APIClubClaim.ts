import APIMap from '../maps/APIMap';
import type { APIScore } from '../scores/APIScore';

export type APIClubClaim = {
    score: APIScore;
    map: APIMap;
};
