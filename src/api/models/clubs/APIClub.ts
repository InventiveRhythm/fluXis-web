import type APIUser from '../users/APIUser';

export default class APIClub {
    public id: number = 0;
    public name: string = '';
    public tag: string = '';
    public icon: string = '';
    public banner: string = '';
    public count: number = 0;
    public colors: any = '';

    public owner?: APIUser;
    public 'join-type'?: number;
    public members?: APIUser[];
    public stats?: any;

    public static CreateDummy() {
        const u = new APIClub();
        u.id = 0;
        u.name = 'unknown';
        return u;
    }
}