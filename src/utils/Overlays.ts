import { ref } from "vue";

import { EmitEvent } from "./Events";

export default class Overlays {
    static UserOverlay = ref(false);

    static ToggleUserOverlay() {
        this.UserOverlay.value = !this.UserOverlay.value;
    }

    static OpenClubCreate() {
        EmitEvent('club-overlay', true)
    }

    static OpenMenu(x: number, y: number, items: any[], right = false) {
        EmitEvent("open-context", {
            x: x,
            y: y,
            items: items,
            right: right
        })
    }

    static OpenContext(e: MouseEvent, items: any[], right = false) {
        EmitEvent("open-context", {
            x: e.clientX,
            y: e.clientY,
            items: items,
            right: right
        })
    }
}