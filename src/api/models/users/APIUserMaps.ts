import type { APIMapSet } from '@/api/models/maps/APIMapSet';

export default class APIUserMaps {
    public ranked: APIMapSet[] = [];
    public unranked: APIMapSet[] = [];
    public guest_diffs: APIMapSet[] = [];
}