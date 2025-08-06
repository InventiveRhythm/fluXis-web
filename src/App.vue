<script setup lang="ts">
import API from './utils/api';

API.Setup(false);

if (API.TokenCookie.value) await API.RefreshInfo();
else API.Logout();
</script>

<template>
    <NuxtLoadingIndicator color="#8585e0" />
    <NuxtRouteAnnouncer />

    <div class="grid *:col-1 *:row-1">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>

    <div class="pointer-events-none fixed left-0 top-0 z-50 h-screen w-screen" id="panels"></div>
</template>

<style>
body {
    @apply bg-dark-1 font-base text-dark-text selection:bg-highlight selection:text-dark-1;
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.3s,
        transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: 0ms;
    transform-origin: top center;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-to {
    transition-delay: 100ms;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    /* transform: scale(0.98); */
}

.layout-enter-active,
.layout-leave-active {
    transition: opacity 0.3s;
}

.layout-enter-from,
.layout-leave-to {
    opacity: 0;
}
</style>
