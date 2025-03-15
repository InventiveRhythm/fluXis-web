<script setup>
import { RouterView } from 'vue-router';

import SidebarButton from './sidebar/SidebarButton.vue';
import SidebarSeparator from './sidebar/SidebarSeparator.vue';

import { state } from '@/utils/State';
import Utils from '@/utils/Utils';

let allowed = true;
let reason = '';

if (!state.user) {
    allowed = false;
    reason = 'Please log in to view this...';
} else if (!Utils.IsModerator(state.user)) {
    allowed = false;
    reason = 'You are not allowed to access this.';
}
</script>

<template>
    <template v-if="allowed">
        <div class="w-full flex justify-center items-start p-3 gap-5">
            <div class="w-56 flex flex-col gap-2">
                <SidebarButton link="/management" text="Home" icon="house" />
                <SidebarSeparator />
                <SidebarButton link="/management/artists" text="Featured Artists" icon="star" />
                <SidebarButton link="/management/users" text="Users" icon="users" />
            </div>
            <div class="flex-1 text-left">
                <RouterView />
            </div>
        </div>
    </template>
    <p v-else>
        {{ reason }}
    </p>
</template>