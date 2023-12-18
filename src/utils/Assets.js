import Config from "@/config.json";

export default class Assets {
    static avatar(id) {
        return `${Config.assetsUrl}/avatar/${id}`;
    }

    static banner(id) {
        return `${Config.assetsUrl}/banner/${id}`;
    }

    static background(id) {
        return `${Config.assetsUrl}/background/${id}`;
    }

    static cover(id) {
        return `${Config.assetsUrl}/cover/${id}`;
    }

    static clubIcon(id) {
        return `${Config.assetsUrl}/club-icon/${id}`;
    }

    static clubBanner(id) {
        return `${Config.assetsUrl}/club-banner/${id}`;
    }
};