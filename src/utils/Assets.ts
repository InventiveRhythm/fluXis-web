import Config from '@/config.json';
import type APIClub from '@/api/models/clubs/APIClub';
import type APIUser from '@/api/models/users/APIUser';

export default class Assets {
    static Avatar(user: APIUser) {
        return `${Config.AssetsUrl}/avatar/${user.avatar}`;
    }

    static Banner(user: APIUser) {
        return `${Config.AssetsUrl}/banner/${user.banner}`;
    }

    static Background(id: number) {
        return `${Config.AssetsUrl}/background/${id}`;
    }

    static Cover(id: number) {
        return `${Config.AssetsUrl}/cover/${id}`;
    }

    static ClubIcon(club: APIClub) {
        return `${Config.AssetsUrl}/club-icon/${club.icon}`;
    }

    static ClubBanner(club: APIClub) {
        return `${Config.AssetsUrl}/club-banner/${club.banner}`;
    }
};