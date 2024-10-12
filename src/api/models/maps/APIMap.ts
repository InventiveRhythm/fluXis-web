import APIUser from '@/api/models/users/APIUser';
import type { APIMapEffectType } from '@/api/models/maps/APIMapEffectType';

export default class APIMap {
    public id: number = 0;
    public mapset: number = 0;
    public mapper: APIUser = APIUser.CreateDummy();
    public hash: string = '';
    public difficulty: string = '';
    public title: string = '';
    public artist: string = '';
    public source: string = '';
    public tags: string = '';
    public mode: number = 0;
    public status: number = 0;
    public bpm: number = 0;
    public length: number = 0;
    public notes: number = 0;
    public 'long-notes': number = 0;
    public maxcombo: number = 0;
    public nps: number = 0;
    public rating: number = 0;
    public effects: APIMapEffectType = 0 as APIMapEffectType;
    public ups: number = 0;
    public downs: number = 0;

    public static CreateDummy() {
        const u = new APIMap();
        u.title = 'unknown song';
        u.artist = 'unknown artist';
        return u;
    }
}