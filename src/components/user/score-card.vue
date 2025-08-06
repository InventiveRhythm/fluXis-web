<script setup lang="ts">
import type { APIScore } from '~/models/scores/APIScore';
import Assets from '~/utils/assets';

defineProps<{
    score: APIScore;
}>();
</script>

<template>
    <NuxtLink :to="`/set/${score.map.mapset}`" class="flex h-12 w-full flex-row overflow-hidden rounded-lg" :class="`bg-rank-${score.grade.toLowerCase()}`">
        <div class="flex size-12 items-center justify-center text-dark-2">
            <span class="font-rank text-2xl even:-ml-2.5 even:opacity-80" v-for="letter in score.grade.split('')">{{ letter }}</span>
        </div>
        <div class="overlap-grid h-12 flex-1 overflow-hidden rounded-lg">
            <LoadingImage class="object-cover" :src="Assets.Background(score.map.mapset)" :low="Assets.BackgroundPreview(score.map.mapset)"></LoadingImage>
            <div class="bg-dark-2/50"></div>
            <div class="flex flex-row items-center justify-center gap-3 px-3">
                <div class="flex w-full flex-col items-start justify-center">
                    <p class="line-clamp-1 text-sm">
                        {{ score.map.title }}
                        <span class="text-xs opacity-80">{{ score.map.artist }}</span>
                    </p>
                    <p class="line-clamp-1 text-xs">
                        {{ score.map.difficulty }}
                        <span class="text-2xs opacity-60">{{ formatting.TimeAgo(score.time) }}</span>
                    </p>
                </div>
                <div class="flex items-center justify-between gap-3">
                    <div class="flex flex-col items-end justify-center text-xs">
                        <p>{{ formatting.Accuracy(score.accuracy) }}</p>
                        <p class="opacity-80">{{ score.maxcombo }}x</p>
                    </div>
                    <p class="text-base">{{ formatting.Decimal(score.pr) }}pr</p>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
