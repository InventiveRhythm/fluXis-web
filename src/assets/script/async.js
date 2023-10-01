document.addEventListener('DOMContentLoaded', loadStuff);
document.addEventListener('DOMNodeInserted', loadStuff);
document.addEventListener('DOMNodeRemoved', loadStuff);

function loadStuff() {
    document.querySelectorAll('.future').forEach(function (el) {
        let elInterv = setInterval(function () {
            if (el.completed || el.complete || el.readyState === 4) {
                el.classList.add('loaded');
                el.classList.remove('future');
                el.removeAttribute('onload');
                clearInterval(elInterv);
            }
        }, 100);
    });
}