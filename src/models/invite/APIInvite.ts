import type APIClub from '../clubs/APIClub';

export default class APIInvite {
    public code: string = '';
    public club: APIClub = APIClub.CreateDummy();
    public user: number = 0;
}
