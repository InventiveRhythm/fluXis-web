var events = {};

function registerEvent(e, callback) {
    if (!events[e]) {
        events[e] = [];
    }

    events[e].push(callback);
}

function emitEvent(e, data) {
    if (!events[e]) {
        return;
    }

    events[e].forEach(callback => {
        callback(data);
    });
}

export { registerEvent, emitEvent };