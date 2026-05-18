<script setup lang="ts">
import API from './utils/api';

// API.Setup(import.meta.dev);
API.Setup(false); // <- use this if you don't have a local server (REMEMBER TO REVERT!)

if (API.TokenCookie.value) await API.RefreshInfo();
else API.Logout();
</script>

<template>
    <NuxtLoadingIndicator color="#8585e0" />
    <!-- <NuxtRouteAnnouncer /> -->

    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>

    <div class="pointer-events-none fixed left-0 top-0 z-50 h-screen w-screen" id="panels"></div>
</template>

<style>
html {
    @apply scroll-m-16 scroll-smooth;
}

body {
    @apply bg-dark-1 font-base text-dark-text selection:bg-highlight selection:text-dark-1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 300ms;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
