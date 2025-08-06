import type { APIScore } from '../scores/APIScore';
import type APIMap from './APIMap';

export type APIMapScores = {
    map: APIMap;
    scores: APIScore[];
};
