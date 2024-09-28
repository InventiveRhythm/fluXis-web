import Config from "@/config.json";

export default class Assets {
    static Avatar(id) {
        return `${Config.AssetsUrl}/avatar/${id}`;
    }

    static Banner(id) {
        return `${Config.AssetsUrl}/banner/${id}`;
    }

    static Background(id) {
        return `${Config.AssetsUrl}/background/${id}`;
    }

    static Cover(id) {
        return `${Config.AssetsUrl}/cover/${id}`;
    }

    static ClubIcon(id) {
        return `${Config.AssetsUrl}/club-icon/${id}`;
    }

    static ClubBanner(id) {
        return `${Config.AssetsUrl}/club-banner/${id}`;
    }
};