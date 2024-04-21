const config = loadConfig();
loadSettings();

function loadConfig() {
    let json = localStorage.getItem('config');

    if (json) {
        json = JSON.parse(json);
    } else {
        json = {
            blur: true
        };
    }

    return json;
}

function saveConfig() {
    localStorage.setItem('config', JSON.stringify(config));
}

function loadSettings() {
    if (!config) return;

    if (!config.blur) disableBlur();
}

function enableBlur() {
    app.classList.add('blur-enabled');
}

function disableBlur() {
    app.classList.remove('blur-enabled');
}