import { emitEvent } from "./Events";

export default class Utils {
    static setTitle(title) {
        document.title = title + ' | fluXis';
    }

    static openUserOverlay() {
        emitEvent('user-overlay', true);
    }

    static closeUserOverlay() {
        emitEvent('user-overlay', false);
    }
}