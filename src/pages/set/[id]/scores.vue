<script setup lang="ts">
import type { APIResponseErrors } from '~/models/APIResponse';
import type { APIMap } from '~/models/maps/APIMap';
import type { APIMapScores } from '~/models/maps/APIMapScores';
import type { APIScore } from '~/models/scores/APIScore';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const props = defineProps<{
    map: APIMap;
}>();

const scores = ref<APIScore[]>();
const errors = ref<APIResponseErrors | null>();
const loading = ref<boolean>();

watch(
    () => props.map,
    (_) => UpdateScores()
);
UpdateScores();

async function UpdateScores() {
    loading.value = true;
    scores.value = [];

    const { data, error } = await API.PerformGet<APIMapScores>(`/map/${props.map.id}/scores`);
    loading.value = false;
    errors.value = error;

    if (error) return;

    scores.value = data.scores;
}

function GetPlace(score: APIScore) {
    return (scores.value?.indexOf(score) ?? 0) + 1;
}
</script>

<template>
    <div class="no-scrollbar overflow-x-scroll">
        <table class="w-full">
            <thead class="h-8">
                <tr class="*:text-2xs *:font-normal *:opacity-60">
                    <th class="min-w-9 text-right">Rank</th>
                    <th class="min-w-10"></th>
                    <th width="100%">Player</th>
                    <th class="min-w-10"></th>
                    <th class="min-w-[72px]">Accuracy</th>
                    <th class="min-w-20">Max Combo</th>
                    <th class="min-w-11">PR</th>
                    <th class="min-w-12">Time</th>
                    <th class="min-w-28">Mods</th>
                </tr>
            </thead>
            <tr class="h-8 *:text-xs" v-for="score in scores">
                <td class="text-right">#{{ GetPlace(score) }}</td>
                <td><LoadingImage :src="Assets.Avatar(score.user)" class="mx-auto size-6 rounded object-cover" /></td>
                <td>
                    <NuxtLink :to="`/u/${score.user.id}`">{{ score.user.username }}</NuxtLink>
                </td>
                <td class="text-center">{{ score.grade }}</td>
                <td>{{ formatting.Accuracy(score.accuracy) }}</td>
                <td>{{ score.maxcombo }}x</td>
                <td>{{ score.pr.toFixed(0) }}pr</td>
                <td>{{ formatting.TimeAgo(score.time, true) }}</td>
                <td>{{ score.mods.replaceAll(',', ' ') }}</td>
            </tr>
        </table>

        <LoadingIndicator v-if="loading" />

        <p class="mt-4 text-center" v-if="errors">{{ errors._request }}</p>
        <p class="mt-4 text-center" v-else-if="!loading && scores?.length == 0">No scores yet!</p>
    </div>
</template>
