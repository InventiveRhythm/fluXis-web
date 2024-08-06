<script setup>
import Config from "@/config.json";
import { useRouter } from 'vue-router'

import Utils from "@/utils/Utils";
import { state } from "@/utils/State";

const router = useRouter();

function onProfileClick(e) {
    if (e.button == 0) {
        Utils.ToggleUserOverlay();
    }

    if (e.button == 2 && state.user) {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            router.push('/logout');
        }
    }
}
</script>

<template>
    <div class="size-24 flex items-center justify-center rounded-bl-3xl bg-dark-3 hover:bg-dark-4 transition-colors" @mousedown="onProfileClick" >
        <img class="size-16 rounded-lg" v-if="state.user" :src="Config.apiUrl + '/assets/avatar/' + state.user.id" alt="user avatar" animated-load>
        <img class="size-16 rounded-lg" v-else :src="Config.apiUrl + '/assets/avatar/-1'" alt="logged out user avatar" animated-load>
    </div>
</template>