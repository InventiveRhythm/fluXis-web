import APIMap from '@/api/models/maps/APIMap';
import type { APIScore } from '../scores/APIScore';

export default class APIClubClaim {
    public score: APIScore = null!;
    public map: APIMap = APIMap.CreateDummy();
}