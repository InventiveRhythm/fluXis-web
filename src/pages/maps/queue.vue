<script setup lang="ts">
import type { APIMapSet } from '~/models/maps/APIMapSet';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const { data: mapsets } = await API.PerformGet<APIMapSet[]>('/mapsets/queue');

function GetVoteIndex(map: APIMapSet, index: number): number {
    if (!map.queue_votes) return 0;
    if (map.queue_votes.length < index + 1) return 0;

    if (map.queue_votes[index]) return 1;
    else return -1;
}
</script>

<template>
    <div class="w-fit-mobile flex w-full flex-col">
        <table class="table-auto text-left">
            <thead class="h-8 align-top">
                <tr class="*:text-sm *:font-normal *:opacity-80">
                    <th class="pl-3">Mapset</th>
                    <th>Creator</th>
                    <th>Votes</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="set in mapsets">
                    <tr class="group mb-2 h-16 *:bg-dark-2">
                        <td class="rounded-l-lg group-hover:bg-dark-3">
                            <NuxtLink class="flex w-full flex-row items-center gap-3" :to="`/set/${set.id}/modding`">
                                <LoadingImage :src="Assets.Cover(set.id)" :low="Assets.CoverPreview(set.id)" class="size-16 rounded-lg object-fill" />
                                <div class="flex flex-col gap-1 *:leading-none">
                                    <p>{{ set.title }}</p>
                                    <p class="text-sm opacity-80">{{ set.artist }}</p>
                                </div>
                            </NuxtLink>
                        </td>
                        <td class="group-hover:bg-dark-3">
                            <NuxtLink class="text-sm" :to="`/u/${set.creator.id}`">{{ set.creator.username }}</NuxtLink>
                        </td>
                        <td class="rounded-r-lg group-hover:bg-dark-3">
                            <div class="flex h-full flex-row items-center gap-2">
                                <div
                                    class="flex size-6 flex-row items-center justify-center rounded-full text-xs"
                                    :class="{
                                        'bg-red text-dark-2': GetVoteIndex(set, n - 1) == -1,
                                        'bg-dark-3': GetVoteIndex(set, n - 1) == 0,
                                        'bg-green text-dark-2': GetVoteIndex(set, n - 1) == 1
                                    }"
                                    v-for="n in 2"
                                ></div>
                            </div>
                        </td>
                    </tr>
                    <tr class="h-2"></tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
