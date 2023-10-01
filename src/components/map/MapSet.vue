<script setup>
    import {
        RouterLink
    } from 'vue-router';
import Config from '@/config.json';

    defineProps({
        mapset: {
            title: String,
            artist: String,
            creator: {
                username: String
            },
            status: Number,
            id: Number,
            maps: Array
        }
    });

    function getMapsetStatus(status) {
        switch (status) {
            case 0:
                return 'unsubmitted';
            case 1:
                return 'pending';
            case 2:
                return 'impure';
            case 3:
                return 'pure';
        }
    }

function lowestKeyMode(mapset) { 
    let lowest = -1;

    mapset.maps.forEach(element => {
        if (lowest == -1)
            lowest = element.mode;

        if (element.mode < lowest)
            lowest = element.mode;
    });

    return lowest;
}

function highestKeyMode(mapset) {
    let highest = 0;

    mapset.maps.forEach(element => {
        if (element.mode > highest)
            highest = element.mode;
    });

    return highest;
}

function keyModeString(mapset) {
    let lowest = lowestKeyMode(mapset);
    let highest = highestKeyMode(mapset);

    if (lowest == highest)
        return lowest;

    return lowest + '-' + highest;
}
</script>

<template>
    <RouterLink :to="'/mapset/' + mapset.id" class="mapset-link">
        <div class="mapset-info">
            <img :src="Config.apiUrl + '/assets/background/' + mapset.id"
                class="mapset-background future loadFade">
            <div class="mapset-metadata">
                <h3 class="mapset-title">{{ mapset.title }}</h3>
                <h5 class="mapset-artist">by {{ mapset.artist }}</h5>
                <h5 class="mapset-creator">mapped by {{ mapset.creator.username }}</h5>
                <div class="status-keymode">
                    <h5 :class="'mapset-status status-' + getMapsetStatus(mapset.status)">{{ getMapsetStatus(mapset.status).toUpperCase() }}</h5>
                    <h5 :class="'mapset-keymode mode-min-' + lowestKeyMode(mapset) + ' mode-max-' + highestKeyMode(mapset)">{{ keyModeString(mapset) }}K</h5>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss">
    .mapset-link {
        flex: 1 1 500px;
        height: 100px;
        display: block;
        margin: 10px;

        .mapset-info {
            width: 100%;
            height: 100%;
            position: relative;
            display: grid;
            overflow: hidden;
            border-radius: var(--border);
            background-color: rgba(0, 0, 0, 0.5);
            transition-property: transform, box-shadow;
            transition-duration: 0.4s;
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 1;

            &:hover {
                // transform: scale(1.03);
                box-shadow: 0 0 10px #000;
                z-index: 2;

                .mapset-metadata {
                background-color: rgba(0, 0, 0, .3);
                }
            }

            .mapset-background {
                width: 100%;
                height: 100%;
                background-color: #000;
                z-index: 1;
                object-fit: cover;
                grid-row: 1;
                grid-column: 1;
            }

            .mapset-metadata {
                z-index: 2;
                padding: 10px;
                grid-row: 1;
                grid-column: 1;
                background-color: rgba(0, 0, 0, .4);
                backdrop-filter: var(--blur-2);
                text-align: left;
                text-shadow: 0 0 5px #000;
                transition: background-color .2s;

                .mapset-title {
                    font-size: 1rem;
                }

                .mapset-artist {
                    font-size: 0.8rem;
                }

                .mapset-creator {
                    font-size: 0.7rem;
                }

                .status-keymode {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    h5 {
                        color: var(--text-color);
                        border-radius: 5px;
                        padding: 1px 5px;
                        font-size: 0.6rem;
                        width: max-content;
                        margin-top: 3px;
                        box-shadow: 0 0 5px #000;
                        text-shadow: none;
                    }

                    .mapset-status {
                        &.status-pending {
                            background-color: var(--tag-status-pending);
                        }

                        &.status-pure {
                            background-color: var(--tag-status-pure);
                        }

                        &.status-impure {
                            background-color: var(--tag-status-impure);
                        }

                        &.status-unsubmitted {
                            background-color: var(--tag-status-unsubmitted);
                        }
                    }

                    .mapset-keymode {
                        background: linear-gradient(90deg, var(--tag-keymode-min) 0%, var(--tag-keymode-max) 100%);
                        color: var(--text-color-dark);
                    }
                }
            }
        }

        @media screen and (max-width: 500px) {
            width: 100%;

            .mapset-info {
                .mapset-metadata {
                    padding: 5px 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;

                    .status-keymode {
                        .mapset-keymode {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
</style>