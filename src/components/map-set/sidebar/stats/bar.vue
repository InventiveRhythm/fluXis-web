<script setup lang="ts">
import { GetRatingColor } from '#imports';

const props = defineProps<{
    title: string;
    value: number;
    max: number;
}>();

function GetColor(value: number, dark: boolean) {
    var percent = value / props.max;
    var col = GetRatingColor(percent * props.max);

    if (dark) col = DarkenColor(col, 0.8);

    return col;
}
</script>

<template>
    <div class="flex h-4 w-full flex-row items-center gap-1.5">
        <p class="w-20 px-1 text-xs">{{ title }}</p>
        <div class="flex h-full flex-1 flex-row items-center rounded-full bg-dark-2" :style="`background-color: ${GetColor(value, true)}`">
            <div
                class="flex h-full flex-row items-center justify-end rounded-full transition-all"
                :style="`width: ${(value / max) * 100}%; background-color: ${GetColor(value, false)}`"
            >
                <p class="mx-2 text-2xs text-dark-2 opacity-80" v-if="value / max >= 0.2">{{ value.toFixed(2) }}</p>
            </div>
            <p class="mx-2 text-2xs opacity-80" v-if="value / max < 0.2">{{ value.toFixed(2) }}</p>
        </div>
    </div>
</template>
