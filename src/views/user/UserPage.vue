<script async setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { reactive } from 'vue';

import TimeUtils from '@/utils/TimeUtils';
import API from '@/utils/API';
import Utils from '@/utils/Utils';
import { startLoading, stopLoading } from '@/utils/Loading';

import UserHeader from './components/UserHeader.vue';
import UserStats from './components/UserStats.vue';
import UserClub from './components/UserClub.vue';
import UserSidebarSection from './components/sidebar/UserSidebarSection.vue';
import TabControl from '../../components/tabs/TabControl.vue';
import TabControlItem from '../../components/tabs/TabControlItem.vue';

const route = useRoute();
let id = parseInt(route.params.id);

let react = reactive({
    loading: true,
    user: null,
    maps: null,
    scores: null
});

await loadStuff();

async function loadStuff() {
    startLoading();

    try {
        await API.get(`/user/${id}`).then(res => {
            if (res.status != 200) return;

            react.user = res.data;
            react.user['lastloginString'] = TimeUtils.formatAgo(res.data.lastlogin);
        })
    } catch (err) {
        console.error(err);
    }

    if (react.user && react.user.username)
        Utils.setTitle(react.user.username + " - user info");

    react.loading = false;
    stopLoading();
}
</script>

<template>
    <div class="w-full flex flex-col items-center md:gap-5" v-if="!react.loading && react.user">
        <UserHeader :user="react.user" />
        <UserStats :statistics="react.user.stats" />
        <div class="w-full flex justify-center items-start p-3 gap-5">
            <div class="w-80 min-w-80 flex flex-col justify-center gap-5" hide-mobile>
                <UserSidebarSection title="About Me" class="!gap-0">
                    <p class="text-left px-2 opacity-80">{{ react.user.aboutme }}</p>
                </UserSidebarSection>
                <UserSidebarSection title="Club" v-if="react.user.club">
                    <UserClub :club="react.user.club" />
                </UserSidebarSection>
                <UserSidebarSection title="Followers">
                    <div class="no-followers">
                        <i class="fas fa-user-friends"></i>
                        <p>No followers</p>
                    </div>
                </UserSidebarSection>
            </div>
            <div class="w-full flex flex-col gap-4 text-left mt-5 md:mt-0">
                <TabControl>
                    <TabControlItem :url="`/u/${id}/scores`" :alternate="`/u/${id}`" icon="fa-solid fa-arrow-trend-up" text="Scores" />
                    <TabControlItem :url="`/u/${id}/maps`" icon="fa-solid fa-map" text="Maps" />
                </TabControl>
                <RouterView />
            </div>
        </div>
    </div>
    <div v-if="!react.loading && !react.user" class="pt-20">
        <h1 class="text-2xl">User not found</h1>
        <h4 class="opacity-80">The user you are looking for does not exist or has been deleted.</h4>
    </div>
</template>