<script setup>
import { FormatAccuracy, FormatScore } from '@/utils/Formatting';
import { reactive, watch } from 'vue';

const props = defineProps({
    statistics: {
        type: Object,
        required: true,
    },
});

const react = reactive({
    stats: [],
});

watch(() => props.statistics, Update);
Update();

function Update() {
    const statistics = props.statistics;

    react.stats = [
        {
            name: 'Overall Rating',
            value: statistics.ovr,
        }, {
            name: 'Potential Rating',
            value: statistics.ptr,
        }, {
            name: 'Overall Accuracy',
            value: FormatAccuracy(statistics.ova),
        }, {
            name: 'Ranked Score',
            value: FormatScore(statistics.score),
        }, {
            name: 'Max Combo',
            value: `${ statistics.combo }x`,
        },
    ];
}
</script>

<template>
    <div
        class="flex w-full flex-col items-center justify-center gap-2 rounded-b-3xl xl:rounded-2xl bg-dark-2 py-4 md:h-24 md:flex-row md:gap-0 md:py-0">
        <div class="w-full flex flex-row md:flex-col justify-between md:justify-center px-6 md:px-0 items-center"
             v-for="stat in react.stats">
            <p class="text-sm md:text-sm lg:text-base opacity-80">{{ stat.name }}</p>
            <p class="text-sm md:text-base lg:text-2xl">{{ stat.value }}</p>
        </div>
    </div>
</template>