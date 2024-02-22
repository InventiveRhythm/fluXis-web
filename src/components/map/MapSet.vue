<script setup>
import { RouterLink } from 'vue-router';
import Config from '@/config.json';

const props = defineProps({
    mapset: Object
});

function lowestKeyMode() { 
    let lowest = -1;

    props.mapset.maps.forEach(element => {
        if (lowest == -1)
            lowest = element.mode;

        if (element.mode < lowest)
            lowest = element.mode;
    });

    return lowest;
}

function highestKeyMode() {
    let highest = 0;

    props.mapset.maps.forEach(element => {
        if (element.mode > highest)
            highest = element.mode;
    });

    return highest;
}

function keyModeString() {
    let lowest = lowestKeyMode();
    let highest = highestKeyMode();

    if (lowest == highest)
        return lowest;

    return lowest + '-' + highest;
}

function getStatusString() {
    switch (props.mapset.status) {
        case 0:
            return 'unsubmitted';
        case 1:
            return 'pending';
        case 2:
            return 'impure';
        case 3:
            return 'pure';
        default:
            return 'unknown';
    }
}
</script>

<template>
    <RouterLink :to="'/set/' + mapset.id" class="mapset-link" v-if="mapset">
        <div class="mapset-info">
            <img :src="Config.apiUrl + '/assets/background/' + mapset.id" class="mapset-background future loadFade">
            <div class="mapset-metadata">
                <img :src="Config.apiUrl + '/assets/cover/' + mapset.id" class="cover">
                <div class="text">
                    <span class="title">{{ mapset.title }}</span>
                    <span class="artist">by {{ mapset.artist }}</span>
                    <span class="mapper">uploaded by {{ mapset.creator.username }}</span>
                    <div class="status-mode">
                        <span class="status" :style="'background-color: var(--tag-status-' + getStatusString() + ')'">{{ getStatusString() }}</span>
                        <span :class="'mode mode-min-' + lowestKeyMode() + ' mode-max-' + highestKeyMode()">{{ keyModeString() }}K</span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss">
    .mapset-link {
        width: 480px;
        height: 100px;
        display: block;

        .mapset-info {
            width: 100%;
            height: 100%;
            position: relative;
            display: grid;
            overflow: hidden;
            border-radius: 20px;
            background-color: var(--bg-triary);

            .mapset-background {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }

            .mapset-metadata {
                display: flex;
                flex-direction: row;
                z-index: 2;
                background-color: rgba($color: #000000, $alpha: .5);

                .cover {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 20px;
                    box-shadow: var(--box-shadow-5);
                }

                .text {
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                    justify-content: center;
                    padding: 10px;
                    text-align: left;
                    color: var(--text-primary);
                    line-height: 1.2;
                    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));

                    > span {
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        text-overflow: ellipsis;
                    }

                    .title {
                        font-size: 20px;
                    }

                    .artist, .mapper {
                        font-size: 12px;
                    }

                    .status-mode {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        font-size: 12px;
                        font-weight: 100;
                        margin-top: 5px;
                        text-shadow: none;
                        color: rgba($color: #000000, $alpha: .75);

                        .status {
                            box-shadow: var(--box-shadow-5);
                            padding: 2px 5px;
                            text-transform: uppercase;
                            border-radius: 20px;
                        }

                        .mode {
                            box-shadow: var(--box-shadow-5);
                            padding: 2px 5px;
                            background: linear-gradient(90deg, var(--tag-keymode-min) 0%, var(--tag-keymode-max) 100%);
                            border-radius: 20px;
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 800px) {
            height: max-content;

            .mapset-info .mapset-metadata {
                flex-direction: column !important;
                
                align-items: center;

                .text {
                    width: 100%;
                    text-align: center;

                    .status-mode {
                        justify-content: center;
                        gap: 10px;
                    }
                }
            }
        }
    }
</style>