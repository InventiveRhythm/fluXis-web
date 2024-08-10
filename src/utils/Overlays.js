import { emitEvent } from "./Events";

export default class Overlays {
    static OpenClubCreate() {
        emitEvent('club-overlay', true)
    }

    static CloseClubCreate() {
        emitEvent('club-overlay', false)
    }
}