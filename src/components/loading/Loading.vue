<script setup>
import { registerEvent } from '@/utils/Events';
registerEvent('loading', (status) => {
    const loading = document.getElementById('loading');
    if (status) {
        loading.classList.add('loading');
    } else {
        loading.classList.remove('loading');
    }
});
</script>

<template>
    <div class="load-wrapper" id="loading">
        <svg class="circular-loader" viewBox="25 25 50 50">
            <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#ffffff" stroke-width="8" />
        </svg>
    </div>
</template>

<style>
.load-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 400;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    place-items: center;
    justify-content: center;
    align-items: center;
    backdrop-filter: var(--blur);

    opacity: 0;
    visibility: hidden;
    transition: all .4s;
}

.load-wrapper.loading {
    backdrop-filter: var(--blur);
    opacity: 1;
    visibility: visible;
}

.load-wrapper svg {
    position: relative;
    height: 50px;

    animation: rotate 2s linear infinite;
    transform-origin: center center;
}

.load-wrapper svg circle {
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke: var(--accent-primary);
    }

    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
        stroke: var(--accent-quaternary);
    }

    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
        stroke: var(--accent-primary);
    }
}
</style>