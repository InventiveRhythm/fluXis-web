<script setup>
import Assets from '@/utils/Assets';

import { RouterLink } from 'vue-router';
import UserHeaderRole from './header/UserHeaderRole.vue';

const props = defineProps({
    user: Object
});

function createClubGradient() {
    if (!props.user.club) return;
    const colors = props.user.club.colors;

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
    <div class="user-header">
        <img :src="Assets.banner(user.id)" class="banner" animated-load>
        <div class="dim"></div>
        <div class="wrapper">
            <div class="data">
                <div class="info">
                    <img :src="Assets.avatar(user.id)" class="avatar" animated-load>
                    <div class="text">
                        <div class="top">
                            <UserHeaderRole :role="user.role" />
                            <div class="status" v-if="user.role != 5">
                                <span>Last online</span>
                                {{ user.lastloginString }}
                            </div>
                        </div>
                        <div class="names">
                            <p class="club" v-if="user.club">
                                <span class="color" :style="'background-image: ' + createClubGradient()">
                                    {{ user.club.tag }}
                                </span>
                            </p>

                            <p class="name-big" v-if="!user.displayname">{{ user.username }}</p>

                            <p class="name-big" v-if="user.displayname">{{ user.displayname }}</p>
                            <p class="name-small" v-if="user.displayname">{{ user.username }}</p>
                        </div>
                    </div>
                </div>
                <div class="header-bottom">
                    <div class="left">
                        <RouterLink to="/rankings/overall">
                            <div class="button">
                                <i class="fas fa-globe-americas"></i>
                                #{{ user.rank }}
                            </div>
                        </RouterLink>
                        <RouterLink :to="'/rankings/country/' + user.country">
                            <div class="button" v-if="user.country">
                                <span :class="'fi fi-' + user.country + ' flag'"></span>
                                #{{ user.country_rank }}
                            </div>
                        </RouterLink>
                    </div>
                    <div class="right">
                        <div class="button share-button" onclick="alert('Not implemented yet.')">
                            <i class="fas fa-share-nodes"></i>
                        </div>
                        <div class="button" onclick="alert('Not implemented yet.')">
                            <i class="fas fa-plus"></i>
                            Follow
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.user-header {
    width: 100%;
    height: 440px;
    border-radius: 20px;
    overflow: hidden;

    display: grid;
    place-items: center;

    > * {
        position: relative;
        grid-area: 1 / 1;
        width: 100%;
        height: 100%;
    }

    .banner {
        object-fit: cover;
    }

    .dim {
        background-color: var(--bg-secondary);
        opacity: .5;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .data {
            width: 1200px;
            padding: 0 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;

            .info {
                height: 120px;
                display: flex;
                align-items: center;
                align-self: stretch;
                gap: 10px;

                .avatar {
                    width: 120px;
                    height: 120px;

                    border-radius: 20px;
                    box-shadow:var(--box-shadow);
                }

                .text {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));

                    .top {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .status {
                            font-size: 16px;

                            span {
                                opacity: .8;
                            }
                        }
                    }

                    .names {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        gap: 10px;

                        .club {
                            color: white;
                            font-size: 32px;

                            &::before {
                                content: '[';
                            }

                            .color {
                                background-clip: text;
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }

                            &::after {
                                content: ']';
                            }
                        }

                        .name-big {
                            font-size: 48px;
                        }

                        .name-small {
                            font-size: 24px;
                            opacity: .8;
                        }
                    }
                }
            }

            .header-bottom {
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                filter: drop-shadow(0 2px 5px rgba(0, 0, 0, .25));

                > div {
                    height: 100%;
                    display: flex;
                    gap: 10px;
                }

                .button {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 20px;
                    border-radius: 25px;
                    background: var(--bg-secondary);
                    font-size: 16px;
                    cursor: pointer;

                    i, span {
                        width: 20px;
                    }
                }

                .share-button {
                    padding: 10px 15px;
                }
            }
        }
    }
}
</style>