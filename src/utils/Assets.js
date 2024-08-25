import Config from "@/config.json";

export default class Assets {
    static Avatar(id) {
        return `${Config.assetsUrl}/avatar/${id}`;
    }

    static Banner(id) {
        return `${Config.assetsUrl}/banner/${id}`;
    }

    static Background(id) {
        return `${Config.assetsUrl}/background/${id}`;
    }

    static Cover(id) {
        return `${Config.assetsUrl}/cover/${id}`;
    }

    static ClubIcon(id) {
        return `${Config.assetsUrl}/club-icon/${id}`;
    }

    static ClubBanner(id) {
        return `${Config.assetsUrl}/club-banner/${id}`;
    }
};