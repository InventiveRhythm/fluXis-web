import type APIUser from '@/api/models/users/APIUser';

export default class Utils {
    static SetTitle(title: string) {
        document.title = title + ' | fluXis';
    }

    static GetCountryName(code: string): string {
        if (!code) return 'Unknown';

        const names = new Intl.DisplayNames(['en'], { type: 'region' });
        return names.of(code.toUpperCase()) || 'Unknown';
    }

    static GetB64FromInput(input: HTMLInputElement, allowedTypes: string[], callback: Function) {
        if (!input.files)
            return;

        const file = input.files[0];

        if (!file) return;

        if (!allowedTypes.includes(file.type)) {
            var types = allowedTypes.map(t => t.split('/')[1]);
            alert(`Invalid type! Only ${types.join('/')} is supported.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            var res = reader.result;
            callback(res);
        };
    }

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
        if (!user || !user.groups)
            return false;

        if (this.IsDeveloper(user))
            return true;

        return user.groups.some(g => g.id == 'moderators');
    }

    static IsDeveloper(user?: APIUser): boolean {
        if (!user || !user.groups)
            return false;

        return user.groups.some(g => g.id == 'dev');
    }
}
