const events: any = {};

function RegisterEvent(e: string, callback: Function) {
    if (!events[e]) {
        events[e] = [];
    }

    events[e].push(callback);
}

function EmitEvent(e: string, data: any = {}) {
    if (!events[e]) {
        return;
    }

    events[e].forEach((callback: Function) => {
        callback(data);
    });
}

export { RegisterEvent, EmitEvent };