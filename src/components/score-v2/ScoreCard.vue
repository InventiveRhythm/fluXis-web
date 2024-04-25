<script setup>
import Config from '@/config.json';
import { formatAccuracy, formatDecimal } from '@/utils/formatting';

const props = defineProps({
    score: Object
});
</script>

<template>
    <div class="overlap-grid h-28 w-full rounded-2xl">
        <img class="object-cover" :src="Config.assetsUrl + '/background/' + score.map.mapset" animated-load />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-col items-start justify-center gap-2 p-4">
            <div class="flex h-9 w-full items-center gap-2">
                <img class="size-9 rounded-lg object-cover shadow-normal" :src="Config.assetsUrl + '/cover/' + score.map.mapset" animated-load />
                <div class="flex w-full flex-col items-start justify-center">
                    <div class="flex w-full items-center gap-2 drop-shadow-text">
                        <p class="max-w-1/2 line-clamp-1">{{ score.map.title }}</p>
                        <p class="max-w-1/2 line-clamp-1 text-xs opacity-80">{{ score.map.artist }}</p>
                    </div>
                    <div class="flex items-center gap-2 -mt-1">
                        <div class="flex h-3.5 w-12 items-center justify-center rounded-full bg-white text-2xs text-black"><p>{{ formatDecimal(score.map.rating) }}</p></div>
                        <p class="max-w full line-clamp-1 text-xs opacity-80">{{ score.map.difficulty }}</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="flex h-6 w-24 items-center justify-center gap-1 rounded-full text-black" :style="'background-color: var(--rank-' + score.grade.toLowerCase() + ');'">
                        <div class="flex h-6 w-6 items-center justify-center">
                            <p class="even:-ml-2 even:opacity-60" v-for="letter in score.grade.split('')">
                                {{ letter }}
                            </p>
                        </div>
                        <div class="w-[2px] h-4 rounded-full bg-black opacity-75"></div>
                        <div class="flex justify-center items-center w-12 h-6 text-2xs">
                            {{ formatAccuracy(score.accuracy) }}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-end justify-center">
                    <p class="text-sm">{{ formatDecimal(score.pr) }} pr</p>
                    <p class="text-xs opacity-80">{{ score.maxcombo }}x</p>
                </div>
            </div>
        </div>
    </div>
</template>