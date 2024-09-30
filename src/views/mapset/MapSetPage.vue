<script async setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import Config from '@/config.json';
import API from '@/utils/API';
import Utils from '@/utils/Utils';
import { startLoading, stopLoading } from '@/utils/Loading';

/* top */
import MapSetHeader from './components/MapSetHeader.vue';
import MapSetButton from './components/MapSetButton.vue';
import KeyModeIcon from '../../components/KeyModeIcon.vue';

import LeaderboardEntry from './components/leaderboard/LeaderboardEntry.vue';

/* side */
import MapSetSidebarSection from './components/sidebar/MapSetSidebarSection.vue';
import MapSetCreator from './components/sidebar/MapSetCreator.vue';
import MapSetVotes from './components/sidebar/MapSetVotes.vue';
import MapSetStatistics from './components/sidebar/MapSetStatistics.vue';

const route = useRoute();
const id = parseInt(route.params.id);

var react = reactive({
    loading: true,
    set: null,
    maps: [],
    currentMap: null,
    scores: null
});

await load();

async function load() {
    startLoading();

    try {
        await API.PerformGet(`/mapset/${id}`).then(data => {
            stopLoading();

            if (!data.data) {
                react.loading = false;
                return;
            }

            const set = data.data;

            react.set = set;
            react.maps = set.maps.sort((a, b) => a.nps - b.nps);

            Utils.SetTitle(set.title + " - " + set.artist);
            switchDifficulty(set.maps[0]);

            react.loading = false;
        });
    } catch (err) {
        console.error(err);
    }
}

async function switchDifficulty(map) {
    if (react.currentMap != null && react.currentMap.id === map.id)
        return;

    startLoading();

    console.log("switching to '" + map.difficulty + "' (" + map.id + ")");
    react.currentMap = map;

    await API.PerformGet(`/map/${map.id}/scores`).then(data => {
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
    window.open(`${Config.APIUrl}/mapset/${id}/download`, '_blank');
}
</script>

<template>
    <div class="w-full flex flex-col items-center gap-5" v-if="!react.loading && react.set">
        <MapSetHeader :set="react.set" />
        <div class="w-full flex flex-row items-center justify-between px-3">
            <div class="flex flex-row items-center gap-3 flex-wrap">
                <div class="flex items-center justify-start size-12 bg-dark-2 rounded-full overflow-hidden transition-all duration-200"
                    v-for="map in react.set.maps" @click="switchDifficulty(map)"
                    :class="{ 'w-fit bg-dark-3': map.id === react.currentMap.id }">
                    <KeyModeIcon class="size-12" :mode="map.mode" />
                    <div class="w-auto h-full flex flex-col justify-center pr-4 text-left">
                        <p class="text-sm">{{ map.difficulty }}</p>
                        <p class="text-2xs opacity-80" v-if="react.set.creator.id != map.mapper.id">mapped by {{
                            map.mapper.username }}</p>
                    </div>
                </div>
            </div>
            <div class="w-80 flex flex-row items-center justify-end gap-3">
                <MapSetButton icon="star" @click="wip" />
                <MapSetButton icon="arrow-down" @click="download" />
                <MapSetButton icon="ellipsis-vertical" @click="wip" />
            </div>
        </div>
        <div class="w-full flex justify-center items-start px-3 gap-5">
            <div class="flex flex-col flex-1 gap-2">
                <LeaderboardEntry :score="score" :idx="react.scores.indexOf(score)" v-for="score in react.scores" />
            </div>
            <div class="w-80 flex flex-col gap-5">
                <MapSetSidebarSection title="Creator">
                    <MapSetCreator :mapper="react.currentMap.mapper" />
                </MapSetSidebarSection>
                <MapSetSidebarSection title="Voting">
                    <MapSetVotes :map="react.currentMap" />
                </MapSetSidebarSection>
                <MapSetSidebarSection title="Statistics">
                    <MapSetStatistics :map="react.currentMap" />
                </MapSetSidebarSection>
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