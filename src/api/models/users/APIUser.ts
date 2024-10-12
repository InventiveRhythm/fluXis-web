import type APIClub from '@/api/models/clubs/APIClub';
import type { APIGroup } from '@/api/models/other/APIGroup';

export default class APIUser {
    public id: number = 0;
    public username: string = '';
    public displayname: string = '';
    public avatar: string = '';
    public banner: string = '';
    public aboutme: string = '';
    public pronouns: string = '';
    public paint: any;
    public country: string = '';
    public groups: APIGroup[] = [];
    public club?: APIClub;
    public online: boolean = false;

    public created?: number;
    public lastlogin?: number;
    public socials?: any;
    public stats?: any;
    public following?: boolean;
    public email?: string;
    public flags?: number;

    public static CreateDummy() {
        const u = new APIUser();
        u.id = 0;
        u.username = 'unknown';
        return u;
    }
}