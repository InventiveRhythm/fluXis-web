<script setup>
import Config from '@/config.json';
import { formatAccuracy, formatDecimal } from '@/utils/formatting';

const props = defineProps({
    score: Object
});
</script>

<template>
    <div class="score-card">
        <img :src="Config.assetsUrl + '/background/' + score.map.mapset" class="background" animated-load />
        <div class="dim"></div>
        <div class="card-content">
            <div class="map-info">
                <img :src="Config.assetsUrl + '/cover/' + score.map.mapset" class="cover" animated-load />
                <div class="metadata">
                    <div class="song">
                        <p class="title">{{ score.map.title }}</p>
                        <p class="artist">{{ score.map.artist }}</p>
                    </div>
                    <div class="diff">
                        <div class="diff-chip"><p>{{ formatDecimal(score.map.rating) }}</p></div>
                        <p class="difficulty">{{ score.map.difficulty }}</p>
                    </div>
                </div>
            </div>
            <div class="score-info">
                <div class="score-info-left">
                    <div class="accuracy" :style="'background-color: var(--rank-' + score.grade.toLowerCase() + ');'">
                        <div class="rank">
                            <p v-for="letter in score.grade.split('')">
                                {{ letter }}
                            </p>
                        </div>
                        <div class="line"></div>
                        <div class="percentage">
                            {{ formatAccuracy(score.accuracy) }}
                        </div>
                    </div>
                </div>
                <div class="score-info-right">
                    <p class="pr">{{ formatDecimal(score.pr) }} pr</p>
                    <p class="combo">{{ score.maxcombo }}x</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.score-card {
    width: 480px;
    height: 110px;
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--bg-secondary);

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

    .card-content {
        display: flex;
        padding: 15px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
        line-height: 1.1;

        .map-info {
            width: 100%;
            display: flex;
            height: 35px;
            align-items: center;
            gap: 5px;

            .cover {
                width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 10px;
                filter: drop-shadow(0 2px 5px rgba(0, 0, 0, .25));
            }

            .metadata {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;

                .song {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));

                    > p {
                        max-width: 50%;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        text-overflow: ellipsis;
                    }

                    .title {
                        font-size: 16px;
                    }

                    .artist {
                        font-size: 12px;
                        opacity: .8;
                    }
                }

                .diff {
                    display: flex;
                    align-items: center;
                    gap: 5px;

                    .diff-chip {
                        display: flex;
                        width: 46px;
                        height: 14px;
                        justify-content: center;
                        align-items: center;
                        font-size: 10px;
                        background-color: white;
                        border-radius: calc(14px / 2);
                        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, .25));

                        p {
                            opacity: .75;
                            color: black;
                        }
                    }

                    .difficulty {
                        font-size: 12px;
                        opacity: .8;
                        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));
                    }
                }
            }
        }

        .score-info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 1;

            > div {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .score-info-left {
                .accuracy {
                    display: flex;
                    width: 100px;
                    height: 25px;
                    gap: 2px;
                    justify-content: center;
                    align-items: center;
                    color: black;
                    border-radius: calc(25px / 2);

                    .rank {
                        width: 30px;
                        height: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;

                        p:nth-child(2) {
                            opacity: .6;
                            margin-left: -9px
                        }
                    }

                    .line {
                        width: 2px;
                        height: 15px;
                        border-radius: 2px;
                        background: rgba(0, 0, 0, 0.75);
                    }

                    .percentage {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 50px;
                        height: 25px;
                        font-size: 10px;
                    }
                }
            }

            .score-info-right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;

                .pr {
                    font-size: 14px;
                }

                .combo {
                    font-size: 10px;
                    opacity: .8;
                }
            }
        }
    }
}
</style>