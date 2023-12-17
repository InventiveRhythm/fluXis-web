<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import Config from '@/config.json';
import TimeUtils from '../../utils/TimeUtils';

import UserHeader from './components/UserHeader.vue';
import UserStats from './components/UserStats.vue';

const route = useRoute();
let id = parseInt(route.params.id);

let react = reactive({
    loading: true,
    user: null
});

await fetch(`${Config.apiUrl}/user/${id}`).then(res => res.json()).then(data => {
    if (!data.data) return;

    react.user = data.data;
    react.user['lastloginString'] = TimeUtils.formatAgo(data.data.lastlogin);

    setTitle(react.user.username + " - user info");
}).catch(err => {
    console.error(err);
}).finally(() => {
    react.loading = false;
})
</script>

<template>
    <div class="user-content" v-if=!react.loading>
        <UserHeader :user="react.user" />
        <UserStats :user="react.user" />
    </div>
</template>

<style lang="scss">
.user-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
}
</style>