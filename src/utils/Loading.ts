import { EmitEvent } from "./Events";

function StartLoading() {
    EmitEvent("loading", true);
}

function StopLoading() {
    EmitEvent("loading", false);
}

export { StartLoading, StopLoading };