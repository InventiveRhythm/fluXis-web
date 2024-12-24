<script setup lang="ts">
import { RouterLink } from 'vue-router';

import type { APIScore } from '@/api/models/scores/APIScore';

import MapBackground from '../images/MapBackground.vue';

import { FormatAccuracy, FormatDecimal } from '@/utils/Formatting';
import TimeUtils from '@/utils/TimeUtils';

defineProps<{
    score: APIScore
}>();
</script>

<template>
    <RouterLink :to="`/set/${score.map.mapset}`" class="flex flex-row h-12 w-full rounded-lg overflow-hidden"
         :style="'background-color: var(--rank-' + score.grade.toLowerCase() + ');'">
        <div class="size-12 flex items-center justify-center text-dark-2">
            <p class="text-2xl font-rank even:-ml-3 even:opacity-60" v-for="letter in score.grade.split('')">
                {{ letter }}
            </p>
        </div>
        <!-- thank you chome, that I have to put the same size again because you're too stupid to accept 100% height -->
        <div class="overlap-grid w-full h-12 rounded-lg overflow-hidden">
            <MapBackground class="object-cover" :map="score.map" />
            <div class="bg-dark-2 opacity-50"></div>
            <div class="flex flex-row items-center justify-center gap-3 px-3 drop-shadow-text">
                <div class="flex w-full flex-col items-start justify-center">
                    <p class="line-clamp-1 text-sm">
                        {{ score.map.title }}
                        <span class="text-xs opacity-80">{{ score.map.artist }}</span>
                    </p>
                    <p class="line-clamp-1 text-xs">
                        {{ score.map.difficulty }}
                        <span class="text-2xs opacity-60">{{ TimeUtils.formatAgo(score.time) }}</span>
                    </p>
                </div>
                <div class="flex items-center justify-between gap-3">
                    <div class="flex flex-col items-end justify-center text-xs">
                        <p>{{ FormatAccuracy(score.accuracy) }}</p>
                        <p class="opacity-80">{{ score.maxcombo }}x</p>
                    </div>
                    <p class="text-base">{{ FormatDecimal(score.pr) }}pr</p>
                </div>
            </div>
        </div>
    </RouterLink>
</template>