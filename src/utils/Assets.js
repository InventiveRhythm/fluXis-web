import Config from "@/config.json";

export default class Assets {
    static Avatar(user) {
        return `${Config.AssetsUrl}/avatar/${user.avatar}`;
    }

    static Banner(user) {
        return `${Config.AssetsUrl}/banner/${user.banner}`;
    }

    static Background(id) {
        return `${Config.AssetsUrl}/background/${id}`;
    }

    static Cover(id) {
        return `${Config.AssetsUrl}/cover/${id}`;
    }

    static ClubIcon(club) {
        return `${Config.AssetsUrl}/club-icon/${club.icon}`;
    }

    static ClubBanner(club) {
        return `${Config.AssetsUrl}/club-banner/${club.banner}`;
    }
};