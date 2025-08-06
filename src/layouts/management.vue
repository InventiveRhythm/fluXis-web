<script setup lang="ts">
import API from '~/utils/api';
import Utils from '~/utils/utils';

const sidebarOpen = ref(false);

if (!API.CurrentUser.value || !Utils.IsModerator(API.CurrentUser.value)) {
    navigateTo('/');
}
</script>

<template>
    <div class="grid h-screen w-screen grid-cols-1 grid-rows-[64px_1fr] overflow-hidden">
        <ManagementHeader />
        <div class="h-full max-h-[calc(100vh-64px)] w-full grid-cols-[max-content_auto] md:grid">
            <div
                class="fixed z-10 flex h-full w-full flex-col border-r-2 border-dark-2 bg-dark-1 md:static md:w-56 md:translate-x-0"
                :class="{
                    '-translate-x-full': !sidebarOpen
                }"
            >
                <ManagementSidebarItem link="/management" icon="house" text="Home" />
                <ManagementSidebarSeparator />
                <ManagementSidebarItem link="/management/artists" icon="star" text="Featured Artists" />
                <ManagementSidebarItem link="/management/users" icon="users" text="Users" />
            </div>
            <div class="z-0 h-full max-h-full overflow-y-scroll">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
