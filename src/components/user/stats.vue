<script setup lang="ts">
import type APIUser from '~/models/users/APIUser';

const stats = ref<
    {
        name: string;
        value: string;
    }[]
>();

const props = defineProps<{
    user: APIUser;
}>();

watch(() => props.user.stats, Update);
Update();

function Update() {
    const statistics = props.user.stats;

    stats.value = [
        {
            name: 'Overall Rating',
            value: statistics.ovr
        },
        {
            name: 'Potential Rating',
            value: statistics.ptr
        },
        {
            name: 'Overall Accuracy',
            value: formatting.Accuracy(statistics.ova)
        },
        {
            name: 'Ranked Score',
            value: formatting.Score(statistics.score)
        },
        {
            name: 'Max Combo',
            value: `${statistics.combo}x`
        }
    ];
}
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center gap-2 rounded-0 bg-dark-2 py-4 md:h-24 md:flex-row md:gap-0 md:py-0 xl:rounded-2xl">
        <div class="flex w-full flex-row items-center justify-between px-6 md:flex-col md:justify-center md:px-0" v-for="stat in stats">
            <p class="text-sm opacity-80 md:text-sm lg:text-base">{{ stat.name }}</p>
            <p class="text-sm md:text-base lg:text-2xl">{{ stat.value }}</p>
        </div>
    </div>
</template>
