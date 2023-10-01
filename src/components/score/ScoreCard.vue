<script setup>
import Score from '../../types/Score.ts';
import TimeUtils from '../../utils/TimeUtils';

const props = defineProps({
  score: {
    type: Score,
    required: true,
  }
});
</script>

<template>
    <div class="score-wrapper">
        <div class="score">
            <div class="map-detail">
                <div class="map-title">{{ score.map.title }} <span>by {{ score.map.artist }}</span></div>
                <div class="diff-and-time">
                    <div class="map-difficulty">{{ score.map.difficulty }}</div>
                    <div class="map-time">{{ TimeUtils.formatAgo(score.time) }}</div>
                </div>
            </div>
            <div class="play-detail">
                <div class="mods">
                    {{ score.mods }}
                </div>
                <div class="acc-maxcombo">
                    <span class="acc">{{ score.accuracy.toFixed(2) }}%</span>
                    <span class="maxcombo">{{ score.maxcombo }}x</span>
                </div>
                <div class="score-pr">
                    <span class="score-num">{{ score.score.toLocaleString() }}</span>
                    <div class="pr">
                        <span class="pr-value">{{ score.pr.toFixed(2) }}<span class="pr-label"> pr</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.score-wrapper {
    width: 100%;
    height: 60px;
    padding: 5px;

    .score {
        background-color: rgba(0, 0, 0, .3);
        border-radius: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        .map-detail {
            width: 70%;
            height: 100%;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;

            .map-title {
                font-size: .9rem;
                color: white;

                span {
                    font-size: .7rem;
                    color: #999;
                }
            }

            .diff-and-time {
                display: flex;
                flex-direction: row;
                font-size: .8rem;

                .map-difficulty {
                    color: #ccc;
                    margin-right: 10px;
                }

                .map-time {
                    color: #999;
                }
            }
        }

        .play-detail {
            width: 30%;
            height: 100%;
            padding: 10px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            text-align: right;

            .mods {
                color: #ccc;
                font-size: .8rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .acc-maxcombo {
                color: #ccc;
                width: 80px;
                font-size: .8rem;
                display: flex;
                flex-direction: column;
            }

            .score-pr {
                display: flex;
                flex-direction: column;
                font-size: .8rem;
                color: #ccc;
                width: 80px;

                .pr {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;

                    .pr-value {
                        color: #fff;

                        .pr-label {
                            font-size: .7rem;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
}
</style>