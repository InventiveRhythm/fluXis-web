import type APIUser from '@/api/models/users/APIUser';
import type APIClub from '@/api/models/clubs/APIClub';

export class ClubKickEvent {
    public user: APIUser;
    public club: APIClub;

    constructor(user: APIUser, club: APIClub) {
        this.user = user;
        this.club = club;
    }
}