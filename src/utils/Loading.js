import { emitEvent } from "./Events";

function startLoading() {
    emitEvent("loading", true);
}

function stopLoading() {
    emitEvent("loading", false);
}

export { startLoading, stopLoading };