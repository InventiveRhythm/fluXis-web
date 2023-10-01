<script setup>
import Config from '@/config.json';
import TimeUtils from '../../utils/TimeUtils';
import Score from '../../types/Score.ts';
import User from '../../types/User.ts';

import IconTwitter from '@/assets/images/socials/twitter.png';
import IconYoutube from '@/assets/images/socials/youtube.png';
import IconTwitch from '@/assets/images/socials/twitch.png';
import IconDiscord from '@/assets/images/socials/discord.png';

import MapSet from '../../components/map/MapSet.vue';
import ScoreCard from '../../components/score/ScoreCard.vue';

import { useRoute } from 'vue-router';
import { reactive } from 'vue';

const route = useRoute();
const id = route.params.id;

let react = reactive({
    loading: true,
    user: null,
});

startLoading();
setTitle("Loading...");

fetch(`${Config.apiUrl}/user/${id}`).then(res => res.json()).then(data => {
    if (!data.data) {
        stopLoading();
        react.loading = false;
        return;
    }

    react['user'] = data.data;
    // react.user = new User(data.data);
    
    setTitle(react.user.username + " - user info");
    stopLoading();
    react.loading = false;
    react.user.lastloginString = TimeUtils.formatAgo(react.user.lastlogin);
}).catch(err => {
    console.error(err);
    stopLoading();
    react.loading = false;
});

function getRoleTag(roleid) {
    switch (roleid) {
        case 1:
            return "featured-artist";
        case 2:
            return "purifier";
        case 3:
            return "moderator";
        case 4:
            return "admin";
        case 5:
            return "fluxel";
        default:
            return "";
    }
}

function formatScore(score) {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatAccuracy(accuracy) {
    return accuracy.toFixed(2) + "%";
}
</script>

<template>
    <div class="background">
        <img :src="Config.apiUrl + '/assets/banner/' + id" class="future loadFade" alt="user background">
        <div class="blur"></div>
    </div>

    <div class="user-content" v-if=react.user>
        <div class="info-box">
            <img :src="Config.apiUrl + '/assets/banner/' + id" class="banner future loadFade" alt="user banner">
            <div class="darken"></div>
            <div class="info">
                <div class="user">
                    <img :src="Config.apiUrl + '/assets/avatar/' + id" class="avatar future loadFade" alt="user avatar">
                    <div class="text">
                        <div class="names">
                            <span :class="'fi fi-' + react.user.country + ' flag'" v-if="react.user.country"></span>
                            <h1 v-if="react.user.displayname" class="name" :style="'color: var(--tag-role-' + getRoleTag(react.user.role) + ')'">{{ react.user.displayname }}</h1>
                            <h1 v-else class="name" :style="'color: var(--tag-role-' + getRoleTag(react.user.role) + ')'">{{ react.user.username }}</h1>
                            <h3 v-if="react.user.displayname"  class="actual-name">{{ react.user.username }}</h3>
                        </div>
                        <h4 v-if="react.user.is_online"><span class="online"></span>Online</h4>
                        <h4 v-else-if="react.user.lastlogin && react.user.lastlogin !== 0">Last online {{ react.user.lastloginString }}</h4>
                        <div class="socials">
                            <a v-if=react.user.social.twitter :href="'https://twitter.com/' + react.user.social.twitter"
                                target="_blank">
                                <div class="twitter" style="background-color: #1da1f288;">
                                    <img :src=IconTwitter class="social">
                                    <p>{{ react.user.social.twitter }}</p>
                                </div>
                            </a>
                            <a v-if=react.user.social.youtube
                                :href="'https://youtube.com/@' + react.user.social.youtube" target="_blank">
                                <div class="youtube" style="background-color: #ff000088;">
                                    <img :src=IconYoutube class="social">
                                    <p>{{ react.user.social.youtube }}</p>
                                </div>
                            </a>
                            <a v-if=react.user.social.twitch :href="'https://twitch.tv/' + react.user.social.twitch"
                                target="_blank">
                                <div class="twitch" style="background-color: #6441a588;">
                                    <img :src=IconTwitch class="social">
                                    <p>{{ react.user.social.twitch }}</p>
                                </div>
                            </a>
                            <div v-if=react.user.social.discord class="discord" style="background-color: #7289da88;">
                                <img :src=IconDiscord class="social">
                                <p>{{ react.user.social.discord }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 100%;" v-if="react.user.role != 5">
            <!-- <div class="mininav">
                <a href="#about">
                    About
                    <div class="line"></div>
                </a>
                <a href="#recent">
                    Recent
                    <div class="line"></div>
                </a>
                <a href="#scores">
                    Scores
                    <div class="line"></div>
                </a>
                <a href="#maps">
                    Maps
                    <div class="line"></div>
                </a>
                <a href="#achievements">
                    Achievements
                    <div class="line"></div>
                </a>
            </div> -->

            <div class="profile-section">
                <div class="stats-row">
                    <div>
                        <h4>Global Rank</h4>
                        <p class="subtext" v-if="react.user.rank">#{{ react.user.rank }}</p>
                        <p class="subtext" v-else>#---</p>
                    </div>
                    <div>
                        <h4>Country Rank</h4>
                        <p class="subtext" v-if="react.user.country_rank">#{{ react.user.country_rank }}</p>
                        <p class="subtext" v-else>#---</p>
                    </div>
                </div>

                <div class="stats-row">
                    <div>
                        <h4>Overall Rating</h4>
                        <p class="subtext" v-if="react.user.ovr">{{ react.user.ovr }}</p>
                        <p class="subtext" v-else>--.--</p>
                    </div>
                    <div>
                        <h4>Potential Rating</h4>
                        <p class="subtext" v-if="react.user.ptr">{{ react.user.ptr }}</p>
                        <p class="subtext" v-else>--.--</p>
                    </div>
                    <div>
                        <h4>Accuracy</h4>
                        <p class="subtext" v-if="react.user.ova">{{ formatAccuracy(react.user.ova) }}</p>
                        <p class="subtext" v-else>--.--%</p>
                    </div>
                </div>

                <div class="stats-row">
                    <!-- <div>
                        <h4>Play Count</h4>
                        <p class="subtext">---</p>
                    </div> -->
                    <div>
                        <h4>Ranked Score</h4>
                        <p class="subtext" v-if="react.user.ranked_score">{{ formatScore(react.user.ranked_score) }}</p>
                        <p class="subtext" v-else>---,---</p>
                    </div>
                    <div>
                        <h4>Max Combo</h4>
                        <p class="subtext" v-if="react.user.max_combo">{{ react.user.max_combo }}x</p>
                        <p class="subtext" v-else>---x</p>
                    </div>
                </div>
            </div>

            <div class="profile-section aboutme">
                <h1 id="about">About Me</h1>
                <p v-if="react.user.aboutme">{{ react.user.aboutme }}</p>
                <p class="subtext" v-else>No description set.</p>
            </div>

            <div class="profile-section">
                <h1 id="recent">Recent</h1>
                <p class="subtext">Nothing important here yet...</p>
            </div>

            <div class="profile-section">
                <h1 id="scores">Best Scores</h1>
                <div v-if="react.user.best_scores && react.user.best_scores.length > 0" class="score-list">
                    <ScoreCard v-for="score in react.user.best_scores" :score=score></ScoreCard>
                </div>
                <p class="subtext" v-else>User hasn't set any scores yet...</p>
            </div>

            <div class="profile-section maps">
                <h1 id="maps">Maps</h1>

                <h3>Pure Maps</h3>
                <div v-if="react.user.ranked_maps && react.user.ranked_maps.length > 0" class="mapset-list">
                    <MapSet v-for="set in react.user.ranked_maps" :mapset=set></MapSet>
                </div>
                <p v-else class="subtext">This user doesn't have any pure maps...</p>

                <h3>Impure/Unsubmitted Maps</h3>
                <div v-if="react.user.unranked_maps && react.user.unranked_maps.length > 0" class="mapset-list">
                    <MapSet v-for="set in react.user.unranked_maps" :mapset=set></MapSet>
                </div>
                <p v-else class="subtext">This user doesn't have any impure/unsubmitted maps...</p>

                <h3>Guest Difficulties</h3>
                <div v-if="react.user.guest_diffs && react.user.guest_diffs.length > 0" class="mapset-list">
                    <MapSet v-for="set in react.user.guest_diffs" :mapset=set></MapSet>
                </div>
                <p v-else class="subtext">This user doesn't have any guest difficulties...</p>
            </div>

            <div class="profile-section">
                <h1 id="achievements">Achievements</h1>
                <p class="subtext">There are no achievements yet...</p>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>User not found.</h1>
        <h5>
            We couldn't find the user you were looking for.
            <br>
            Maybe they don't exist?
        </h5>
        <br>
        <RouterLink to="/" class="hoverable">
            <i class="fas fa-home" style="margin-right: 5px;"></i>
            Go back home
        </RouterLink>
    </div>
</template>

<style lang="scss">
    .background {
        position: fixed !important;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -3;
        display: grid;
        
        img {
            width: 100%;
            height: 100%;
            grid-row: 1;
            grid-column: 1;
            object-fit: cover;
            z-index: -3;
        }

        .blur {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: var(--blur);
            grid-row: 1;
            grid-column: 1;
            z-index: -2;
        }
    }

    .user-content {
        background-color: rgba(0, 0, 0, 0.25);
        backdrop-filter: var(--blur-10);
        border-radius: 20px;
        overflow: hidden;
        width: 100%;
    }

    .info-box {
        height: 400px;
        overflow: hidden;
        display: grid;
        width: 100%;
        border-radius: 20px;
        text-shadow: var(--text-shadow);
    }

    .info-box .banner {
        width: 100%;
        height: inherit;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: 1;
        grid-row: 1;
        object-fit: cover;
    }

    .info-box .darken {
        background: rgba(0, 0, 0, 0.4);

        width: 100%;
        height: inherit;
        grid-column: 1;
        grid-row: 1;
        z-index: 1;
    }

    .info-box .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: inherit;
        grid-column: 1;
        grid-row: 1;
        z-index: 2;
    }

    .info-box .user {
        display: flex;
        align-items: center;
        justify-content: left;
        margin-left: 40px;
        text-align: left;
    }

    .info-box .user .avatar {
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 10px;
        object-fit: cover;
        box-shadow: var(--box-shadow);
    }

    .info-box .user .names {
        display: flex;
        align-items: center;

        .actual-name {
            margin-left: 10px;
            margin-top: 5px;
            color: var(--text-color-secondary);
        }

        .flag {
            width: 36px;
            margin-right: 5px;
            box-shadow: var(--box-shadow-5);
        }
    }

    .info-box .user h4 {
        display: flex;
        align-items: center;

        .online {
            background-color: #55ff55;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            display: block;
            margin-right: 5px;
        }
    }

    .info-box .user .socials {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 5px;
    }

    .info-box .user .socials div {
        margin-right: 10px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        padding: 5px;
    }

    .info-box .user .socials div img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }

    .mininav {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        flex-wrap: wrap;
        position: sticky;
        top: 120px;
    }

    .mininav a {
        padding: 5px;
        margin: 0 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .mininav .line {
        height: 2px;
        background-color: var(--text-color);
        transition: width .2s;
        width: 0;
        border-radius: 2px;
    }

    .mininav a:hover .line {
        width: 100%;
    }

    .profile-section {
        margin: 10px;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: var(--border);

        h1 {
            font-size: 1.4rem;
        }
    }

    .maps {
        > h3 {
            margin-top: 10px;
        }

        .mapset-list {
            margin-top: 5px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
    }

    .subtext {
        color: var(--text-color-secondary);
    }

    .stats-row {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        flex-wrap: wrap;

        > div {
            width: 200px;
            margin: 0 10px;
        }
    }

    @media screen and (max-width: 900px) {
        .info {
            flex-direction: column;
            justify-content: center !important;
        }

        .info .user {
            flex-direction: column;
            margin: 0;
        }

        .info .user .avatar {
            margin: 0 0 5px 0;
        }

        .info .user .text {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .info .user .text .socials {
            align-items: center;
            justify-content: center;
            margin-top: 5px;
        }

        .info .user .text .socials div {
            margin: 5px;
        }
    }
</style>