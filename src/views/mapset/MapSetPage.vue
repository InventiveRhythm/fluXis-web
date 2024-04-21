<script async setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import { getRatingColor, darkenColor } from '@/utils/ColorUtils';
import Config from '@/config.json';
import API from '@/utils/API';
import Utils from '@/utils/Utils';
import { startLoading, stopLoading } from '@/utils/Loading';

import MapSetHeader from './components/MapSetHeader.vue';
import KeyModeIcon from '../../components/KeyModeIcon.vue';

const route = useRoute();
const id = parseInt(route.params.id);

var react = reactive({
    loading: true,
    set: null,
    maps: [],
    currentMap: 0,
    scores: null
});

await load();

async function load() {
    startLoading();

    try {
        await API.get(`/mapset/${id}`).then(data => {
            if (!data.data) {
                stopLoading();
                react.loading = false;
                return;
            }

            const set = data.data;

            react.set = set;
            react.maps = set.maps.sort((a, b) => a.nps - b.nps);

            Utils.setTitle(set.title + " - " + set.artist);
            switchDifficulty(set.maps[0]);

            react.loading = false;
        });
    } catch (err) {
        console.error(err);
    }
}

async function switchDifficulty(map) {
    if (react.currentMap.id === map.id)
        return;

    startLoading();

    console.log("switching to '" + map.difficulty + "' (" + map.id + ")");
    react.currentMap = map;

    await API.get(`/map/${map.id}/scores`).then(data => {
        if (!data.data) {
            stopLoading();
            return;
        }

        react.scores = data.data.scores;
        console.log(data.data.scores);
        stopLoading();
    }).catch(err => {
        console.error(err);
    });
}

function wip() {
    alert("This feature is a work in progress.");
}

function download() {
    window.open(`${Config.apiUrl}/mapset/${id}/download`, '_blank');
}

function getBarColor(percent, dark = false) {
    var col = getRatingColor(percent * 30);

    if (dark) {
        col = darkenColor(col, .8);
    }

    return col;
}
</script>

<template>
    <div class="mapset-page" v-if="!react.loading && react.set">
        <MapSetHeader :set="react.set" />
        <div class="mapset-buttons">
            <div class="mapset-diff-select">
                <div class="mapset-difficulty" v-for="map in react.set.maps" @click="switchDifficulty(map)" :class="map.id === react.currentMap.id ? 'expand' : ''">
                    <KeyModeIcon :mode="map.mode" />
                    <div class="text">
                        <p>{{ map.difficulty }}</p>
                        <p class="mapper" v-if="react.set.creator.id != map.mapper.id">mapped by {{ map.mapper.username }}</p>
                    </div>
                </div>
            </div>
            <div class="mapset-actions">
                <div class="mapset-action favorite" @click="wip">
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="mapset-action download" @click="download">
                    <i class="fa-solid fa-arrow-down"></i>
                </div>
                <div class="mapset-action more" @click="wip">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        </div>
        <div class="mapset-page-content">
            <div class="mapset-content">
                <div class="mapset-map-leaderboard">
                    leaderboard
                    <p>soon-ish</p>
                    <!-- The actual reason I didnt add it yet is because the API doesn't return users with scores -->
                </div>
            </div>
            <div class="mapset-sidebar">
                <div class="mapset-sidebar-section">
                    <p class="section-title">Creator</p>
                    <div class="mapset-map-creator">

                    </div>
                </div>
                <div class="mapset-sidebar-section">
                    <p class="section-title">Statistics</p>
                    <div class="mapset-map-stats">
                        <div class="statistic">
                            <p class="stat-title">Rating</p>
                            <div class="stat-bar" :style="'background-color: ' + getBarColor(react.currentMap.rating / 30, true)">
                                <div class="bar-fill" :style="'width: ' + ((react.currentMap.rating / 30) * 100) + '%; background-color: ' + getBarColor(react.currentMap.rating / 30)">
                                    <p v-if="(react.currentMap.rating / 30) >= .2">{{ react.currentMap.rating.toFixed(2) }}</p>
                                </div>
                                <p v-if="(react.currentMap.rating / 30) < .2">{{ react.currentMap.rating.toFixed(2) }}</p>
                            </div>
                        </div>
                        <div class="statistic">
                            <p class="stat-title">Notes Per Second</p>
                            <div class="stat-bar" :style="'background-color: ' + getBarColor(react.currentMap.nps / 40, true)">
                                <div class="bar-fill" :style="'width: ' + ((react.currentMap.nps / 40) * 100) + '%; background-color: ' + getBarColor(react.currentMap.nps / 40)">
                                    <p v-if="(react.currentMap.nps / 40) >= .2">{{ react.currentMap.nps.toFixed(2) }}</p>
                                </div>
                                <p v-if="(react.currentMap.nps / 40) < .2">{{ react.currentMap.nps.toFixed(2) }}</p>
                            </div>
                        </div>
                        <!-- <div class="statistic">
                            <p class="stat-title">Accuracy</p>
                            <div class="stat-bar">
                                <div class="bar-fill"></div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.mapset-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .mapset-buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;

        .mapset-diff-select {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;

            .mapset-difficulty {
                display: flex;
                justify-content: left;
                align-items: center;
                width: 48px;
                height: 48px;
                background-color: var(--bg-secondary);
                border-radius: 24px;
                overflow: hidden;
                transition: width .2s;

                .key-mode-icon {
                    min-width: 48px;
                    height: 48px;
                }

                .text {
                    width: auto;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-right: 14px;
                    text-align: left;
                    
                    p {
                        font-size: 14px;
                        color: white;
                    }

                    .mapper {
                        font-size: 10px;
                        opacity: .8;
                    }
                }

                &.expand {
                    width: fit-content;
                    background-color: var(--bg-triary);
                }
            }
        }

        .mapset-actions {
            width: 320px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;

            .mapset-action {
                width: 48px;
                height: 48px;
                background-color: var(--bg-secondary);
                border-radius: 24px;
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    font-size: 24px;
                    color: white;
                }

                &.download {
                    background-color: hsl(130, 10%, 30%);
                }

                &.more {
                    background-color: transparent;
                    border: 4px solid var(--bg-secondary);
                }
            }
        }
    }

    .mapset-page-content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 0 10px;
        gap: 20px;

        .mapset-content {
            flex-grow: 1;
        }

        .mapset-sidebar {
            width: 320px;
            display: flex;
            flex-direction: column;
            gap: 20px;

            .mapset-sidebar-section {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 20px;

                .section-title {
                    text-align: left;
                    font-size: 24px;
                    padding: 0px 10px;
                }

                .mapset-map-stats {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 20px;
                    text-align: left;
                    background-color: var(--bg-secondary);
                    border-radius: 20px;

                    .statistic {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 6px;

                        .stat-title {
                            font-size: 16px;
                        }

                        .stat-bar {
                            width: 100%;
                            height: 20px;
                            background-color: var(--bg-triary);
                            border-radius: 10px;
                            overflow: hidden;
                            transition: .6s;

                            display: flex;
                            align-items: center;
                            justify-content: flex-start;

                            p {
                                font-size: 12px;
                                margin: 0 8px;
                                opacity: .8;
                            }

                            .bar-fill {
                                width: 0;
                                height: 100%;
                                background-color: var(--accent-primary);
                                border-radius: inherit;
                                transition: .6s;

                                display: flex;
                                align-items: center;
                                justify-content: flex-end;

                                p {
                                    color: black;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 800px) {
        .mapset-buttons {
            flex-direction: column-reverse;
            align-items: center;
            gap: 10px;

            .mapset-diff-select {
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            .mapset-actions {
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>