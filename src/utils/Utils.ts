import { stringifyQuery } from 'vue-router';
import type APIUser from '~/models/users/APIUser';

export default class Utils {
    static GetIconForGroup(group: string): string {
        switch (group) {
            case 'contributors':
                return 'fas fa-medal';
            case 'fa':
                return 'fas fa-star';
            case 'purifier':
                return 'fas fa-diamond';
            case 'moderators':
                return 'fas fa-shield';
            case 'dev':
                return 'fas fa-screwdriver-wrench';
            case 'bot':
                return 'fas fa-user-astronaut';
            default:
                return 'fas fa-user';
        }
    }

    static IsModerator(user?: APIUser): boolean {
        if (!user || !user.groups) return false;

        if (this.IsDeveloper(user)) return true;

        return user.groups.some((g) => g.id == 'moderators');
    }

    static IsPurifier(user?: APIUser): boolean {
        if (!user || !user.groups) return false;
        if (this.IsDeveloper(user)) return true;

        return user.groups.some((g) => g.id == 'purifier');
    }

    static IsDeveloper(user?: APIUser): boolean {
        if (!user || !user.groups) return false;

        return user.groups.some((g) => g.id == 'dev');
    }

    static async CopyAndShare(url: string, name: string, notify = true) {
        if (!navigator.share) {
            navigator.clipboard.writeText(url);

            if (notify) alert('Link copied to clipboard.');

            return;
        }

        const data = {
            title: name,
            url: url
        };

        navigator.share(data);
    }

    static GetCountryName(code: string): string {
        if (!code) return 'Unknown';

        const names = new Intl.DisplayNames(['en'], { type: 'region' });
        return names.of(code.toUpperCase()) || 'Unknown';
    }

    static SetMetadata(title: string, description: string, image?: string) {
        useSeoMeta({
            title: title,
            ogTitle: title,
            ogDescription: description,
            ogSiteName: 'fluXis',
            themeColor: '#8585e0',
            ogImage: image
        });
    }
}
