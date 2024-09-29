import { emitEvent } from "./Events";

export default class Overlays {
    static OpenClubCreate() {
        emitEvent('club-overlay', true)
    }

    static CloseClubCreate() {
        emitEvent('club-overlay', false)
    }

    static OpenMenu(x, y, items, right = false) {
        emitEvent("open-context", {
            x: x,
            y: y,
            items: items,
            right: right
        })
    }

    static OpenContext(e, items, right = false) {
        emitEvent("open-context", {
            x: e.clientX,
            y: e.clientY,
            items: items,
            right: right
        })
    }
}