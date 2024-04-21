document.addEventListener('DOMContentLoaded', loadStuff);
document.addEventListener('DOMNodeInserted', loadStuff);
document.addEventListener('DOMNodeRemoved', loadStuff);

function loadStuff() {
    document.querySelectorAll('[animated-load]').forEach(function (el) {
        let elInterv = setInterval(function () {
            if (el.completed || el.complete || el.readyState === 4) {
                el.setAttribute('loaded', '');
                el.removeAttribute('onload');
                clearInterval(elInterv);
            }
        }, 100);
    });
}