<script async setup>
import { RouterView, useRoute } from 'vue-router';
import { reactive } from 'vue';

import RoundedButton from '@/components/RoundedButton.vue';
import TabControl from '../../components/tabs/TabControl.vue';
import TabControlItem from '../../components/tabs/TabControlItem.vue';

import API from '@/utils/API';
import { emitEvent } from '@/utils/Events';
import { state } from '@/utils/State';
import { startLoading, stopLoading } from '@/utils/Loading';
import TimeUtils from '@/utils/TimeUtils';
import Utils from '@/utils/Utils';

import UserHeader from './components/UserHeader.vue';
import UserStats from './components/UserStats.vue';
import UserClub from './components/UserClub.vue';
import UserSidebarSection from './components/sidebar/UserSidebarSection.vue';

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
        await API.PerformGet(`/user/${id}`).then(res => {
            if (res.status != 200) return;

            react.user = res.data;
            react.user['lastloginString'] = TimeUtils.formatAgo(res.data.lastlogin);
        })
    } catch (err) {
        console.error(err);
    }

    if (react.user && react.user.username)
        Utils.SetTitle(react.user.username + " - user info");

    react.loading = false;
    stopLoading();
}

function OpenEdit() {
    emitEvent('user-edit-overlay', react.user);
}

function ShouldShowEdit() {
    if (!state.user || state.user.id == react.user.id)
        return false;

    if (Utils.IsModerator(state.user))
        return true;
    
    return false;
}
</script>

<template>
    <div class="w-full flex flex-col items-center xl:gap-5" v-if="!react.loading && react.user">
        <UserHeader :user="react.user" />
        <UserStats class="mb-3 xl:mb-0" :statistics="react.user.stats" />
        <div class="w-full flex justify-center items-start p-3 gap-5">
            <div class="w-80 min-w-80 flex flex-col justify-center gap-5" hide-mobile>
                <RoundedButton v-if="ShouldShowEdit()" @click="OpenEdit"
                    class="px-6 py-2 text-white text-opacity-75 text-center bg-dark-2 hover:bg-dark-3">
                    <i class="fa fa-pencil mr-1"></i>
                    Edit
                </RoundedButton>
                <UserSidebarSection title="About Me" class="!gap-0" v-if="react.user.aboutme">
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