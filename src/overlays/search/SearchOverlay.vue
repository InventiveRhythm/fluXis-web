<template>
    <div class="hidden" id="search-overlay">
        <div class="dim" onclick="closeSearchOverlay()"></div>
        <div class="wrapper">
            <h1>Search is still work in progress~</h1>
        </div>
    </div>
</template>

<style lang="scss">
#search-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: all;
    opacity: 1;
    transition: all .2s;

    .dim {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .wrapper {
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &.hidden {
        pointer-events: none;
        opacity: 0;
    }
}
</style>