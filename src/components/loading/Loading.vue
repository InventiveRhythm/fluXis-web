<script setup lang="ts">
import { RegisterEvent } from '@/utils/Events';
import { ref } from 'vue';

const loading = ref(false);

RegisterEvent('loading', (status: boolean) => loading.value = status);
</script>

<template>
    <div
        class="fixed top-0 left-0 w-screen h-screen z-loading bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md transition-all duration-300 pointer-none"
        :class="{ 'opacity-0 invisible': !loading }">
        <svg class="relative h-12 animate-spin origin-center" viewBox="24 24 48 48">
            <circle
                style="stroke-linecap: round; stroke-dasharray: 150, 200; stroke-dashoffset: -10; animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite"
                cx="48" cy="48" r="20"
                fill="none" stroke="#ffffff" stroke-width="8" />
        </svg>
    </div>
</template>

<style>
@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke: var(--accent-secondary);
    }

    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
        stroke: var(--highlight);
    }

    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
        stroke: var(--accent-secondary);
    }
}
</style>