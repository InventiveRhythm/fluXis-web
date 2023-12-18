<script async setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import TimeUtils from '@/utils/TimeUtils';
import API from '@/utils/API';
import { startLoading, stopLoading } from '@/utils/Loading';

import UserHeader from './components/UserHeader.vue';
import UserStats from './components/UserStats.vue';
import UserClub from './components/UserClub.vue';

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
        await API.get(`/user/${id}`).then(data => {
            if (!data.data) return;

            react.user = data.data;
            react.user['lastloginString'] = TimeUtils.formatAgo(data.data.lastlogin);
        })

        // no need to continue if user is null
        if (!react.user || !react.user.username) return;

        await API.get(`/user/${react.user.id}/maps`).then(data => {
            if (!data.data) return;

            react['maps'] = data.data;
        })

        await API.get(`/user/${react.user.id}/scores`).then(data => {
            if (!data.data) return;

            react['scores'] = data.data;
        })
    } catch (err) {
        console.error(err);
    }

    if (react.user && react.user.username)
        setTitle(react.user.username + " - user info");

    react.loading = false;
    stopLoading();
}
</script>

<template>
    <div class="user-page" v-if="!react.loading && react.user">
        <UserHeader :user="react.user" />
        <UserStats :user="react.user" />
        <div class="user-page-content">
            <div class="user-sidebar" hide-mobile>
                <div class="sidebar-section" v-if="react.user.club">
                    <p class="section-title">Club</p>
                    <UserClub :club="react.user.club" />
                </div>
                <div class="sidebar-section">
                    <p class="section-title">Followers</p>
                    <div class="no-followers">
                        <i class="fas fa-user-friends"></i>
                        <p>No followers</p>
                    </div>
                </div>
            </div>
            <div class="user-content">
                <div class="content-section">
                    <p class="section-title">Best Scores</p>
                    <div class="wrapping-list">
                        <ScoreCard v-for="score in react.scores.best_scores.splice(0, 8)" :score="score" />
                    </div>
                </div>
                <div class="content-section">
                    <p class="section-title">Recent Scores</p>
                    <div class="wrapping-list">
                        <ScoreCard v-for="score in react.scores.recent_scores.splice(0, 6)" :score="score" />
                    </div>
                </div>
                <div class="content-section">
                    <p class="section-title">Maps</p>
                    <div class="subsection">
                        <p class="subsection-title">Pure</p>
                        <p v-if="!react.maps.ranked || react.maps.ranked.length == 0" class="empty-title">This user has no pure maps.</p>
                        <div class="wrapping-list" v-else>
                            <MapSetCard v-for="map in react.maps.ranked" :mapset="map" />
                        </div>
                    </div>
                    <div class="subsection">
                        <p class="subsection-title">Impure/Unsubmitted</p>
                        <p v-if="!react.maps.unranked || react.maps.unranked.length == 0" class="empty-title">This user has no impure/unsubmitted maps.</p>
                        <div class="wrapping-list" v-else>
                            <MapSetCard v-for="map in react.maps.unranked" :mapset="map" />
                        </div>
                    </div>
                    <div class="subsection">
                        <p class="subsection-title">Guest Difficulties</p>
                        <p v-if="!react.maps.guest_diffs || react.maps.guest_diffs.length == 0" class="empty-title">This user has no guest difficulties.</p>
                        <div class="wrapping-list" v-else>
                            <MapSetCard v-for="map in react.maps.guest_diffs" :mapset="map" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!react.loading && !react.user">
        <h1>User not found</h1>
        <h4>The user you are looking for does not exist or has been deleted.</h4>
    </div>
</template>

<style lang="scss">
.user-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;

    .user-page-content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 10px;
        gap: 20px;

        .user-sidebar {
            position: sticky;
            min-width: 300px;
            max-width: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;

            .sidebar-section {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 10px;

                .section-title {
                    text-align: left;
                    font-size: 24px;
                    padding: 0px 10px;
                }
            }
        }

        .user-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 40px;
            text-align: left;

            .content-section {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 20px;

                .section-title {
                    text-align: left;
                    font-size: 24px;
                    padding: 0px 10px;
                }

                .subsection {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    .subsection-title {
                        text-align: left;
                        font-size: 20px;
                        padding: 0px 10px;
                    }

                    .empty-title {
                        font-size: 16px;
                        margin-top: -10px;
                        padding: 0px 10px;
                        opacity: .6;
                    }

                    &:has(.empty-title) {
                        gap: 0px;
                    }
                }

                .wrapping-list {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 20px;
                }
            }
        }
    }
}
</style>