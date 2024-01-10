<script setup>
import Config from '@/config.json';
import TimeUtils from '../../utils/TimeUtils';

import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { startLoading, stopLoading } from '../../utils/Loading';

const route = useRoute();
const id = route.params.id;

let react = reactive({
    loading: true,
    set: null,
});

startLoading();
setTitle("Loading...");

fetch(`${Config.apiUrl}/mapset/${id}`).then(res => res.json()).then(data => {
    if (!data.data) {
        stopLoading();
        react.loading = false;
        return;
    }

    react.set = data.data;
    setTitle(react.set.title + " - " + react.set.artist);
    stopLoading();
    react.loading = false;
}).catch(err => {
    console.error(err);
    stopLoading();
    react.loading = false;
});
</script>

<template>
    <div class="background">
        <img :src="Config.apiUrl + '/assets/background/' + id" class="future loadFade">
        <div class="blur"></div>
    </div>

    <div class="mapset-content" v-if=react.set>
        <div class="info-box">
            <img :src="Config.apiUrl + '/assets/background/' + id" class="set-background future loadFade">
            <div class="darken"></div>
            <div class="info">
                <div class="metadata">
                    <img :src="Config.apiUrl + '/assets/cover/' + id" class="metadata-cover future loadFade">
                    <div class="metadata-text">
                        <h1>{{ react.set.title }}</h1>
                        <h2>{{ react.set.artist }}</h2>
                        <div class="creator">
                            <img :src="Config.apiUrl + '/assets/avatar/' + react.set.creator.id" alt="" class="creator-avatar">
                            <div class="creator-text">
                                <h3><span>mapped by</span> {{ react.set.creator.username }}</h3>
                                <h3><span>submitted</span> {{ TimeUtils.formatDate(react.set.submitted) }}</h3>
                                <h3 v-if="react.set.purified"><span>purified</span> {{ TimeUtils.formatDate(react.set.purified) }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

.mapset-content {
    background-color: rgba(0, 0, 0, 0.25);
    backdrop-filter: var(--blur-10);
    border-radius: 20px;
    overflow: hidden;
    width: 100%;

    .info-box {
        height: 440px;
        display: grid;
        width: 100%;
        border-radius: 20px;
        overflow: hidden;

        .set-background {
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

        .darken {
            background: rgba(0, 0, 0, 0.4);
            width: 100%;
            height: inherit;
            grid-column: 1;
            grid-row: 1;
            z-index: 1;
        }

        .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: inherit;
            grid-column: 1;
            grid-row: 1;
            z-index: 2;
            text-shadow: var(--text-shadow-2);

            .metadata {
                display: flex;
                align-items: center;
                justify-content: left;
                text-align: left;
                height: 100%;
                width: 100%;
                margin-left: 40px;

                .metadata-cover {
                    width: 150px;
                    height: 150px;
                    border-radius: 20px;
                    object-fit: cover;
                    margin-right: 20px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
                }

                .metadata-text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: min-content;
                    width: 100%;

                    h1 {
                        font-size: 30px;
                        font-weight: 500;
                        color: var(--text-color);
                        line-height: 1;
                    }

                    h2 {
                        font-size: 20px;
                        font-weight: 400;
                    }

                    .creator {
                        height: 60px;
                        display: flex;
                        margin-top: 12px;
                        text-shadow: var(--text-shadow);

                        .creator-avatar {
                            width: 60px;
                            height: 60px;
                            border-radius: 10px;
                            object-fit: cover;
                            margin-right: 10px;
                            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
                        }

                        .creator-text {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;

                            h3 {
                                font-size: 12px;
                                font-weight: 500;
                                color: var(--text-color);
                                margin: 0;
                                padding: 0;

                                span {
                                    font-weight: 400;
                                    opacity: .8;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>