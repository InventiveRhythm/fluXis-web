<script async setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import TimeUtils from '@/utils/TimeUtils';
import API from '@/utils/API';
import Utils from '@/utils/Utils';
import { startLoading, stopLoading } from '@/utils/Loading';

import UserHeader from './components/UserHeader.vue';
import UserStats from './components/UserStats.vue';
import UserClub from './components/UserClub.vue';
import UserSection from './components/UserSection.vue';
import UserSubsection from './components/UserSubsection.vue';
import UserWrapList from './components/UserWrapList.vue';
import UserSidebarSection from './components/sidebar/UserSidebarSection.vue';

import ScoreCard from '@/components/score-v2/ScoreCard.vue';
import MapSetCard from '@/components/map/MapSet.vue';

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

        // no need to continue if user is null
        if (react.user && react.user.username) {
            await API.get(`/user/${react.user.id}/maps`).then(res => {
                if (!res.data) return;

                react['maps'] = res.data;
            })

            await API.get(`/user/${react.user.id}/scores`).then(res => {
                if (!res.data) return;

                react['scores'] = res.data;
            })
        }

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
            <div class="w-full flex flex-col gap-10 text-left mt-5 md:mt-0">
                <UserSection title="Best Scores">
                    <UserWrapList>
                        <ScoreCard v-for="score in react.scores.best_scores.splice(0, 8)" :score="score" />
                    </UserWrapList>
                </UserSection>
                <UserSection title="Recent Scores">
                    <UserWrapList>
                        <ScoreCard v-for="score in react.scores.recent_scores.splice(0, 6)" :score="score" />
                    </UserWrapList>
                </UserSection>
                <UserSection title="Maps">
                    <UserSubsection title="Pure">
                        <p v-if="!react.maps.ranked || react.maps.ranked.length == 0" class="px-3 opacity-60">This user has no pure maps.</p>
                        <UserWrapList v-else>
                            <MapSetCard v-for="map in react.maps.ranked" :mapset="map" />
                        </UserWrapList>
                    </UserSubsection>
                    <UserSubsection title="Impure/Unsubmitted">
                        <p v-if="!react.maps.unranked || react.maps.unranked.length == 0" class="px-3 opacity-60">This user has no impure/unsubmitted maps.</p>
                        <UserWrapList v-else>
                            <MapSetCard v-for="map in react.maps.unranked" :mapset="map" />
                        </UserWrapList>
                    </UserSubsection>
                    <UserSubsection title="Guest Difficulties">
                        <p v-if="!react.maps.guest_diffs || react.maps.guest_diffs.length == 0" class="px-3 opacity-60">This user has no guest difficulties.</p>
                        <UserWrapList v-else>
                            <MapSetCard v-for="map in react.maps.guest_diffs" :mapset="map" />
                        </UserWrapList>
                    </UserSubsection>
                </UserSection>
            </div>
        </div>
    </div>
    <div v-if="!react.loading && !react.user" class="pt-20">
        <h1 class="text-2xl">User not found</h1>
        <h4 class="opacity-80">The user you are looking for does not exist or has been deleted.</h4>
    </div>
</template>