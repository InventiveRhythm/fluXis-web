<script setup>
import Assets from '@/utils/Assets';
import TimeUtils from '@/utils/TimeUtils';

import StatusChip from './StatusChip.vue';

const props = defineProps({
    set: Object
});
</script>

<template>
    <div class="mapset-header">
        <img :src="Assets.background(set.id)" class="background" animated-load>
        <div class="dim"></div>
        <div class="wrapper">
            <div class="data">
                <div class="info">
                    <img :src="Assets.cover(set.id)" class="cover" animated-load>
                    <div class="text">
                        <div class="top">
                            <StatusChip :status="set.status" />
                            <div class="status-date">
                                <span>Uploaded on</span>
                                {{ TimeUtils.formatDate(set.submitted) }}
                            </div>
                        </div>
                        <p class="title">{{ set.title }}</p>
                        <p class="artist">{{ set.artist }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.mapset-header {
    width: 100%;
    height: 280px;
    border-radius: 20px;
    overflow: hidden;
    transition: .2s;

    display: grid;
    place-items: center;

    > * {
        position: relative;
        grid-area: 1 / 1;
        width: 100%;
        height: inherit;
    }

    .background {
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
            width: 100%;
            max-width: 1200px;
            padding: 0 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            
            .info {
                width: 100%;
                height: 160px;
                display: flex;
                align-items: center;
                align-self: stretch;
                gap: 10px;

                .cover {
                    width: 160px;
                    height: 160px;
                    border-radius: 20px;
                    object-fit: cover;
                    box-shadow: var(--box-shadow);
                    transition: .2s;
                }

                .text {
                    flex-grow: 1;
                    max-width: calc(100% - 170px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));
                    text-align: left;

                    .top {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .title {
                        width: 100%;
                        font-size: 40px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: .2s;
                    }

                    .artist {
                        width: 100%;
                        font-size: 24px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: .2s;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1000px) {
        height: 480px;

        .wrapper .data {
            flex-direction: column;

            .info {
                height: auto;
                flex-direction: column;

                .text {
                    max-width: 100%;
                    text-align: center;

                    .top {
                        justify-content: center;
                        align-self: flex-end;

                        .status-date {
                            display: none;
                        }
                    }

                    .title {
                        font-size: 32px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 500px) {
        height: 320px;

        .wrapper .data {

            .info {
                .cover {
                    width: 120px;
                    height: 120px;
                }

                .text {
                    .title {
                        font-size: 24px;
                    }
                    
                    .artist {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>