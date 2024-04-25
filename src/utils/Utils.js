import { emitEvent } from "./Events";
import { reactive } from "vue";

export default class Utils {
    static globalReact = reactive({
        user: $cookies.get('user') || null,
    });

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