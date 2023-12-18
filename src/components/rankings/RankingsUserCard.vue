<script setup>
import Config from '@/config.json';
import { RouterLink } from 'vue-router';

const props = defineProps({
    user: Object
});

function formatAccuracy(accuracy) {
    return accuracy.toFixed(2) + "%";
}

function getCountryName(country) {
    if (!country) return "Unknown";

    const names = new Intl.DisplayNames(['en'], { type: 'region' });
    return names.of(country);
}

function createClubGradient(club) {
    if (!club) return;
    const colors = club.colors;

    let gradient = "linear-gradient(90deg";

    colors.forEach(el => {
        let color = el.color;
        let position = el.position;

        gradient += `, ${color} ${position * 100}%`;
    });

    gradient += ")";
    return gradient;
}
</script>

<template>
    <RouterLink :to="'/u/' + user.id" class="ranking-user-card-link">
        <div class="ranking-user-card">
            <img :src="Config.apiUrl + '/assets/banner/' + user.id + '.png'" class="banner future loadFade">
            <div class="dim"></div>
            <div class="data">
                <div class="rank">
                    <span>
                        #{{ user.rank }}
                    </span>
                </div>
                <img :src="Config.apiUrl + '/assets/avatar/' + user.id + '.png'" class="avatar future loadFade">
                <div class="info">
                    <div class="names">
                        <span class="club" v-if="user.club">
                            <span class="color" :style="'background-image: ' + createClubGradient(user.club)">
                                {{ user.club.tag }}
                            </span>
                        </span>

                        <span v-if="user.displayname">
                            {{ user.displayname }}
                        </span>
                        <span v-else>
                            {{ user.username }}
                        </span>
                        <span class="username" v-if="user.displayname">
                            {{ user.username }}
                        </span>
                    </div>
                    <div class="country">
                        <span :class="'fi fi-' + user.country + ' flag'"></span>
                        <span>{{ getCountryName(user.country) }}</span>
                    </div>
                </div>
                <div class="spacer"></div>
                <div class="stats">
                    <span class="main-stat">
                        {{ user.ovr }} OVR
                    </span>
                    <div class="additional">
                        <span>
                            {{ user.ptr }} PR
                        </span>
                        <span>
                            {{ formatAccuracy(user.ova) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss">
.ranking-user-card-link {
    width: 100%;

}

.ranking-user-card {
    width: 100%;
    height: 100px;
    display: grid;
    align-self: stretch;

    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);

    .banner {
        width: 100%;
        height: 100%;
        object-fit: cover;
        grid-row: 1;
        grid-column: 1;
        z-index: 1;
    }

    .dim {
        width: 100%;
        height: 100%;
        grid-row: 1;
        grid-column: 1;
        z-index: 2;

        background: linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 25%, rgba(0, 0, 0, 0.40) 100%);
    }

    .data {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        grid-row: 1;
        grid-column: 1;
        z-index: 3;

        .rank {
            display: flex;
            width: 100px;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            color: #FFF;
            text-shadow: var(--text-shadow);
            font-size: 28px;
        }

        .avatar {
            width: 100px;
            height: 100px;
            flex-shrink: 0;

            border-radius: 20px;
        }

        .info {
            display: flex;
            padding: 0px 15px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            .names {
                display: flex;
                align-items: center;
                gap: 5px;

                color: #FFF;
                text-shadow: var(--text-shadow);
                font-size: 28px;

                .club {
                    color: white;
                
                    &::before {
                        content: '[';
                    }
                
                    .color {
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        color: transparent;
                    }
                
                    &::after {
                        content: ']';
                    }
                }

                .username {
                    opacity: .8;
                    font-size: 20px;
                }
            }

            .country {
                display: flex;
                align-items: center;
                gap: 6px;
            }
        }

        .spacer {
            flex: 1 0 0;
            align-self: stretch;

            color: #FFF;
            font-size: 16px;

            .flag {
                width: 35px;
                height: 26.25px;
            }
        }

        .stats {
            display: flex;
            padding: 10px 20px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            .main-stat {
                color: #FFF;
                text-shadow: var(--text-shadow);
                font-size: 28px;
            }

            .additional {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 10px;
                opacity: .8;
                font-size: 16px;
            }
        }
    }
}
</style>