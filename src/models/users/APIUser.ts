import type APIClub from '../clubs/APIClub';
import type { APIGroup } from '../other/APIGroup';

export default class APIUser {
    public id: number = 0;
    public username: string = '';
    public displayname: string = '';
    public avatar: string = '';
    public avatar_animated: boolean = false;
    public banner: string = '';
    public banner_animated: boolean = false;
    public aboutme: string = '';
    public pronouns: string = '';
    public paint: any;
    public country: string = '';
    public groups: APIGroup[] = [];
    public club?: APIClub;
    public online: boolean = false;

    public created?: number;
    public lastlogin?: number;
    public socials?: {
        twitter: string;
        twitch: string;
        youtube: string;
        discord: string;
    };
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
