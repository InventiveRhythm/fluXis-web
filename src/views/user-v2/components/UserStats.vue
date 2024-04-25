<script setup>
import { formatAccuracy, formatScore } from '@/utils/formatting';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const user = props.user;

const stats = [{
    name: 'Overall Rating',
    value: user.ovr
}, {
    name: 'Potential Rating',
    value: user.ptr
}, {
    name: 'Overall Accuracy',
    value: formatAccuracy(user.ova)
}, {
    name: 'Ranked Score',
    value: formatScore(user.ranked_score)
}, {
    name: 'Max Combo',
    value: `${user.max_combo}x`
}];
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center gap-2 rounded-b-3xl md:rounded-2xl bg-dark-2 py-4 md:h-24 md:flex-row md:gap-0 md:py-0">
        <div class="w-full flex flex-col justify-center items-center" v-for="stat in stats">
            <p class="opacity-80">{{ stat.name }}</p>
            <p class="text-2xl">{{ stat.value }}</p>
        </div>
    </div>
</template>