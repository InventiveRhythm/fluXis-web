<script setup>
import Config from "@/config.json";
import { useRouter } from 'vue-router'
import { reactive } from 'vue';

import Utils from "@/utils/Utils";

const router = useRouter();

let react = reactive({
    user: $cookies.get('user')
});

function onProfileClick(e) {
    if (e.button == 0) {
        Utils.openUserOverlay();
    }

    if (e.button == 2 && react.user) {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            router.push('/logout');
        }
    }
}
</script>

<template>
    <div class="nav-user" @mousedown="onProfileClick" >
        <div class="user">
            <img v-if="react.user" :src="Config.apiUrl + '/assets/avatar/' + react.user.id"
                class="future loadFade" alt="user avatar">
            <img v-else :src="Config.apiUrl + '/assets/avatar/-1'" class="future loadFade" alt="logged out user avatar" >
        </div>
    </div>
</template>

<style lang="scss">
.nav-user {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: inherit;
    text-align: right;
    width: 90px;
    height: 90px;
    border-radius: 0 0 0 20px;
    background-color: var(--bg-triary);
    transition: background-color 200ms;
    cursor: pointer;
    position: relative;
    z-index: 110;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 10px;
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        object-fit: cover;
    }

    &:hover {
        transition: background-color 50ms;
        background-color: var(--bg-quaternary);
    }
}
</style>