<script setup>
import { formatAccuracy, formatScore } from '@/utils/formatting';

const props = defineProps({
    statistics: {
        type: Object,
        required: true
    }
});

const statistics = props.statistics;

const stats = [{
    name: 'Overall Rating',
    value: statistics.ovr
}, {
    name: 'Potential Rating',
    value: statistics.ptr
}, {
    name: 'Overall Accuracy',
    value: formatAccuracy(statistics.ova)
}, {
    name: 'Ranked Score',
    value: formatScore(statistics.score)
}, {
    name: 'Max Combo',
    value: `${statistics.combo}x`
}];
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center gap-2 rounded-b-3xl xl:rounded-2xl bg-dark-2 py-4 md:h-24 md:flex-row md:gap-0 md:py-0">
        <div class="w-full flex flex-col justify-center items-center" v-for="stat in stats">
            <p class="opacity-80">{{ stat.name }}</p>
            <p class="text-2xl">{{ stat.value }}</p>
        </div>
    </div>
</template>