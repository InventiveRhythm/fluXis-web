<script setup lang="ts">
import type { APIMapSet } from '~/models/maps/APIMapSet';

defineProps<{
    mapset: APIMapSet;
}>();

function GetPercentage(up: number, down: number) {
    if (!up && !down) return 50;

    return Math.floor((up / (up + down)) * 100);
}
</script>

<template>
    <div class="flex w-full flex-col gap-1.5">
        <div class="h-2 w-full rounded-full bg-vote-down">
            <div class="h-full rounded-full bg-vote-up transition-all" :style="`width: ${GetPercentage(mapset.ups, mapset.downs)}%`"></div>
        </div>
        <div class="flex w-full flex-row justify-between">
            <p class="w-12 text-sm text-vote-up">{{ mapset.ups }}</p>
            <p class="w-12 text-center text-sm">{{ GetPercentage(mapset.ups, mapset.downs) }}%</p>
            <p class="w-12 text-right text-sm text-vote-down">{{ mapset.downs }}</p>
        </div>
    </div>
</template>
