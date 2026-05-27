<script setup lang="ts">
import type { APIMapSet } from '~/models/maps/APIMapSet';
import { APIModdingActionType } from '~/models/maps/APIModdingAction';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const { data: mapsets } = await API.PerformGet<APIMapSet[]>('/mapsets/queue');

function GetVoteIndex(map: APIMapSet, index: number): number {
    if (!map.queue?.votes) return 0;
    if (map.queue.votes.length < index + 1) return 0;

    if (map.queue.votes[index]) return 1;
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
                    <th>Last Action</th>
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
                        <td class="group-hover:bg-dark-3">
                            <template v-if="set.queue?.last_action">
                                <div :class="`flex flex-col gap-1 text-${utils.GetActionTypeColor(set.queue.last_action.type)}`">
                                    <p class="text-sm leading-none">
                                        <i :class="`fa mr-0.5 text-xs ${utils.GetActionTypeIcon(set.queue.last_action.type)}`"></i>
                                        {{ utils.GetActionTypeReadable(set.queue.last_action.type) }}
                                    </p>
                                    <p class="text-xs leading-none">{{ formatting.TimeAgo(set.queue.last_action.time) }}</p>
                                </div>
                            </template>
                        </td>
                        <td class="rounded-r-lg group-hover:bg-dark-3">
                            <div class="flex h-full flex-row items-center gap-2">
                                <div
                                    class="flex size-6 flex-row items-center justify-center rounded-full text-xs"
                                    :class="{
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
