function setTitle(title) {
    document.title = title + ' | fluXis';
}

function openUserOverlay() {
    document.getElementById('user-overlay').classList.remove('hidden');
}

function closeUserOverlay() {
    document.getElementById('user-overlay').classList.add('hidden');
}

function openSearchOverlay() {
    document.getElementById('search-overlay').classList.remove('hidden');
}

function closeSearchOverlay() {
    document.getElementById('search-overlay').classList.add('hidden');
}