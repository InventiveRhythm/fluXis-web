import { emitEvent } from './Events';

export default class Utils {
    static setTitle(title) {
        document.title = title + ' | fluXis';
    }

    static ToggleUserOverlay() {
        emitEvent('toggle-user-overlay');
    }

    static GetCountryName(code) {
        if (!code) return 'Unknown';

        const names = new Intl.DisplayNames(['en'], { type: 'region' });
        return names.of(code.toUpperCase()) || 'Unknown';
    }

    static GetB64FromInput(input, allowedTypes, callback) {
        const file = input.files[0];

        if (!file) return;

        if (!allowedTypes.includes(file.type)) {
            var types = allowedTypes.map(t => t.split('/')[1])
            alert(`Invalid type! Only ${types.join('/')} is supported.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var res = reader.result;
            callback(res);
        };
    }

    static GetIconForGroup(group) {
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
}
