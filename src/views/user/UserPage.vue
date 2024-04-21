<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import Config from '@/config.json';
import TimeUtils from '../../utils/TimeUtils';
import Utils from '@/utils/Utils';

import ScoreCard from '../../components/score/ScoreCard.vue';
import UserPageMaps from './sections/UserPageMaps.vue';

const route = useRoute();
let id = -1;

if (route.params.handle) {
    var username = route.params.handle[0];

    await fetch(`${Config.apiUrl}/user/@${username}`).then(res => res.json()).then(data => {
        if (!data.data) return;
        id = data.data.id;
    }).catch(err => {
        console.error(err);
    });
} else {
    id = parseInt(route.params.id);
}

let react = reactive({
    loading: true,
    user: null,
    scoresLoaded: false,
    scores: null
});

if (id != -1) {
    Utils.setTitle("Loading...");

    await fetch(`${Config.apiUrl}/user/${id}`).then(res => res.json()).then(data => {
        if (!data.data) return;

        react['user'] = data.data;
        react.user.lastloginString = TimeUtils.formatAgo(react.user.lastlogin);

        Utils.setTitle(react.user.username + " - user info");
        loadScores();
    }).catch(err => {
        console.error(err);
    }).finally(() => {
        react.loading = false;
    })
} else {
    react.loading = false;
}


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

function getCountryName() {
    const names = new Intl.DisplayNames(['en'], { type: 'region' });
    return names.of(react.user.country);
}

function getRoleIcon() {
    switch (react.user.role) {
        case 1: // featured artist
            return "fas fa-star";
        case 2: // purifier
            return "fas fa-diamond";
        case 3: // moderator
            return "fas fa-shield-halved";
        case 4: // admin
            return "fas fa-user-shield";
        case 5: // fluxel
            return "fas fa-user-astronaut";
        default:
            return "";
    }
}

function createClubGradient() {
    if (!react.user.club) return;
    const colors = react.user.club.colors;

    let gradient = "linear-gradient(90deg";

    colors.forEach(el => {
        let color = el.color; 
        let position = el.position;

        gradient += `, ${color} ${position * 100}%`;
    });

    gradient += ")";
    return gradient;
}

function loadScores() {
    fetch(`${Config.apiUrl}/user/${id}/scores`).then(res => res.json()).then(data => {
        console.log(data.data);
        if (!data.data) return;
        react['scores'] = data.data;
    }).catch(err => {
        console.error(err);
    }).finally(() => {
        react.scoresLoaded = true;
    })
}
</script>

<template>
    <div class="background">
        <img :src="Config.apiUrl + '/assets/banner/' + id" class="future loadFade" alt="user background">
        <div class="blur"></div>
    </div>

    <div class="user-content" v-if=react.user>
        <div class="header">
            <div class="info-box">
                <img :src="Config.apiUrl + '/assets/banner/' + id" class="banner future loadFade" alt="user banner">
                <div class="darken"></div>
                <div class="info">
                    <div class="user">
                        <img :src="Config.apiUrl + '/assets/avatar/' + id" class="avatar future loadFade"
                            alt="user avatar">
                        <div class="text">
                            <div class="names" :style="'color: var(--tag-role-' + getRoleTag(react.user.role) + ')'">
                                <i v-if="react.user.role != 0" :class="getRoleIcon()"></i>

                                <h1 class="club" v-if="react.user.club">
                                    <span class="color" :style="'background-image: ' + createClubGradient()">
                                        {{ react.user.club.tag }}
                                    </span>
                                </h1>

                                <h1 v-if="react.user.displayname" class="name">{{ react.user.displayname }}</h1>
                                <h1 v-else class="name">{{ react.user.username }}</h1>

                                <h3 v-if="react.user.displayname" class="actual-name">{{ react.user.username }}</h3>
                            </div>
                            <h4 v-if="react.user.is_online">
                                <span class="online"></span>
                                Online
                            </h4>
                            <h4 v-else-if="react.user.lastlogin && react.user.lastlogin !== 0">
                                Last online {{ react.user.lastloginString }}
                            </h4>
                            <div class="country" v-if="react.user.country">
                                <span :class="'fi fi-' + react.user.country + ' flag'"></span>
                                <h4>{{ getCountryName() }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="socials">
                <a v-if=react.user.social.twitter :href="'https://twitter.com/' + react.user.social.twitter"
                    target="_blank">
                    <div class="twitter social hoverable">
                        <div class="social-id" style="color: #00aaff;">
                            <i class="fab fa-twitter"></i>
                            <h4>Twitter</h4>
                        </div>
                        <p>{{ react.user.social.twitter }}</p>
                    </div>
                </a>
                <a v-if=react.user.social.youtube :href="'https://youtube.com/@' + react.user.social.youtube"
                    target="_blank">
                    <div class="youtube social hoverable">
                        <div class="social-id" style="color: #ff4d4d;">
                            <i class="fab fa-youtube"></i>
                            <h4>YouTube</h4>
                        </div>
                        <p>{{ react.user.social.youtube }}</p>
                    </div>
                </a>
                <a v-if=react.user.social.twitch :href="'https://twitch.tv/' + react.user.social.twitch"
                    target="_blank">
                    <div class="twitch social hoverable">
                        <div class="social-id" style="color: #9966ff;">
                            <i class="fab fa-twitch"></i>
                            <h4>Twitch</h4>
                        </div>
                        <p>{{ react.user.social.twitch }}</p>
                    </div>
                </a>
                <div v-if=react.user.social.discord class="discord social">
                    <div class="social-id" style="color: #6e85f7;">
                        <i class="fab fa-discord"></i>
                        <h4>Discord</h4>
                    </div>
                    <p>{{ react.user.social.discord }}</p>
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
                        <p v-if="react.user.rank">#{{ react.user.rank }}</p>
                        <p v-else>#---</p>
                    </div>
                    <div>
                        <h4>Country Rank</h4>
                        <p v-if="react.user.country_rank">#{{ react.user.country_rank }}</p>
                        <p v-else>#---</p>
                    </div>
                </div>

                <div class="stats-row">
                    <div>
                        <h4>Overall Rating</h4>
                        <p v-if="react.user.ovr">{{ react.user.ovr }}</p>
                        <p v-else>--.--</p>
                    </div>
                    <div>
                        <h4>Potential Rating</h4>
                        <p v-if="react.user.ptr">{{ react.user.ptr }}</p>
                        <p v-else>--.--</p>
                    </div>
                    <div>
                        <h4>Accuracy</h4>
                        <p v-if="react.user.ova">{{ formatAccuracy(react.user.ova) }}</p>
                        <p v-else>--.--%</p>
                    </div>
                </div>

                <div class="stats-row">
                    <!-- <div>
                        <h4>Play Count</h4>
                        <p class="subtext">---</p>
                    </div> -->
                    <div>
                        <h4>Ranked Score</h4>
                        <p v-if="react.user.ranked_score">{{ formatScore(react.user.ranked_score) }}</p>
                        <p v-else>---,---</p>
                    </div>
                    <div>
                        <h4>Max Combo</h4>
                        <p v-if="react.user.max_combo">{{ react.user.max_combo }}x</p>
                        <p v-else>---x</p>
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

            <div class="profile-section" v-if="react.scoresLoaded">
                <h1 id="scores">Best Scores</h1>
                <div v-if="react.scores.best_scores && react.scores.best_scores.length > 0" class="score-list">
                    <ScoreCard v-for="score in react.scores.best_scores" :score=score></ScoreCard>
                </div>
                <p class="subtext" v-else>User hasn't set any scores yet...</p>
            </div>

            <UserPageMaps :id=id></UserPageMaps>

            <div class="profile-section">
                <h1 id="achievements">Achievements</h1>
                <p class="subtext">There are no achievements yet...</p>
            </div>
        </div>
    </div>
    <div v-else-if="!react.loading">
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

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            text-shadow: var(--text-shadow);

            .socials {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                min-height: 60px;
                padding: 10px 0;

                .social {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 0 10px;
                    padding: 5px 10px;
                    border-radius: 5px;
                    min-width: 100px;
                    transition: background-color .2s;

                    .social-id {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        font-size: .8rem;

                        i {
                            margin-right: 5px;
                        }
                    }

                    &.hoverable:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                        transition-duration: 50ms;
                    }
                }
            }
        }
    }

    .info-box {
        height: 440px;
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

        .country {
            display: flex;
            align-items: center;
            margin-top: 5px;

            .flag {
                width: 30px;
                aspect-ratio: 4/3;
                margin-right: 5px;
                box-shadow: var(--box-shadow-5);
            }
        }
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

        i {
            font-size: 1.4rem;
            margin-right: 5px;
        }

        .club {
            color: var(--text-color);

            &::before {
                content: '[';
            }

            .color {
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }

            &::after {
                content: ']';
                margin-right: 5px;
            }
        }

        .actual-name {
            margin-left: 10px;
            margin-top: 5px;
            color: var(--text-color-secondary);
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
        >h3 {
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

        h4 {
            color: var(--text-color-secondary);
            font-size: .8rem;
        }

        >div {
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