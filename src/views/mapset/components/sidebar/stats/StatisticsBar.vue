<script setup>
import { GetRatingColor, DarkenColor } from '@/utils/ColorUtils';

const props = defineProps({
    title: String,
    value: Number,
    max: Number
});

function GetColor(value, dark) {
    var percent = value / props.max;
    var col = GetRatingColor(percent * 30);

    if (dark)
        col = DarkenColor(col, .8);

    return col;
}
</script>

<template>
    <div class="w-full h-4 flex flex-row items-center gap-1.5">
        <p class="w-20 px-1 text-xs">{{ title }}</p>
        <div class="flex flex-row flex-1 h-full items-center rounded-full bg-dark-2" :style="`background-color: ${GetColor(value, true)}`">
            <div class="flex flex-row h-full rounded-full justify-end items-center transition-all"
                :style="`width: ${value / max * 100}%; background-color: ${GetColor(value)}`">
                <p class="text-2xs mx-2 opacity-80 text-dark-2" v-if="(value / max) >= .2">{{ value.toFixed(2) }}</p>
            </div>
            <p class="text-2xs mx-2 opacity-80" v-if="(value / max) < .2">{{ value.toFixed(2) }}</p>
        </div>
    </div>
</template>