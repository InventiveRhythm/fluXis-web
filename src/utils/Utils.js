import { emitEvent } from "./Events";

export default class Utils {
    static setTitle(title) {
        document.title = title + ' | fluXis';
    }

    static ToggleUserOverlay() {
        emitEvent('toggle-user-overlay');
    }
}