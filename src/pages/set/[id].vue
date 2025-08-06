<script setup lang="ts">
import { MapRateVoteOverlay, MapSetSidebarStats } from '#components';
import type { APIMap } from '~/models/maps/APIMap';
import type { APIMapSet } from '~/models/maps/APIMapSet';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const route = useRoute();
const current = ref<APIMap>();

const ratepanel = ref<InstanceType<typeof MapRateVoteOverlay>>();

const { data: mapset } = await API.PerformGet<APIMapSet>(`/mapset/${route.params.id}`);

if (mapset) {
    mapset.maps.sort((a, b) => a.nps - b.nps);

    if (!current.value) current.value = mapset.maps[0];

    utils.SetMetadata(
        `${mapset.title} - ${mapset.artist}`,
        `created by ${mapset.creator.username} - ${mapset.maps.length} difficult${mapset.maps.length > 1 ? 'ies' : 'y'}`,
        Assets.Cover(mapset.id)
    );

    if (import.meta.client && route.hash) {
        onMounted(() => {
            const id = route.hash.replace('#', '');
            const map = mapset.maps.find((x) => x.id.toString() == id);
            if (map) SwitchDifficulty(map);
        });
    }
}

function SwitchDifficulty(diff: APIMap) {
    current.value = diff;
    document.location.href = `#${diff.id}`;
}

function Download() {
    window.open(`${API.APIUrl}/mapset/${mapset!.id}/download`);
}

async function RefreshRating() {
    const { data: rating } = await API.PerformPost<number>(`/map/${current.value?.id}/refresh-rate `, {});
    if (!rating) return;
    current.value!.rating = rating;
}
</script>

<template>
    <div class="flex w-screen flex-col gap-5 md:w-auto" v-if="mapset && current">
        <MapSetHeader :mapset="mapset" />
        <div class="grid w-full items-center gap-3 px-3 md:h-16 md:grid-cols-[auto_min-content]">
            <div class="flex flex-row justify-center gap-3 md:order-2">
                <MapSetButton @click="Download">
                    <i class="fa-solid fa-arrow-down"></i>
                </MapSetButton>
                <MapSetButton><i class="fa-solid fa-star"></i></MapSetButton>
                <MapSetButton><i class="fa-solid fa-ellipsis-vertical"></i></MapSetButton>
            </div>
            <div class="no-scrollbar flex w-full flex-row items-center justify-center gap-3 overflow-x-scroll md:justify-start">
                <div
                    class="flex size-12 flex-shrink-0 flex-row items-center rounded-full bg-dark-2"
                    :class="{ 'w-fit': current.id == map.id }"
                    v-for="map in mapset.maps"
                    @click="SwitchDifficulty(map)"
                >
                    <img :src="`/svg/mode/${map.mode}.svg`" :fill="GetRatingColor(map.nps)" class="size-12" />
                    <div class="flex h-full w-auto flex-col justify-center pr-4 text-left" v-if="current.id == map.id">
                        <p class="min-w-0 text-nowrap text-sm">{{ map.difficulty }}</p>
                        <p class="text-2xs opacity-80" v-if="mapset.creator.id != map.mapper.id">mapped by {{ map.mapper.username }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-full flex-col-reverse items-start justify-center gap-5 px-3 text-left md:flex-row">
            <div class="flex w-full flex-1 flex-col gap-2 md:w-auto">
                <TabControl>
                    <TabControlItem
                        :url="`/set/${mapset.id}/info`"
                        :alternate="`/set/${mapset.id}`"
                        icon="fa-solid fa-circle-info"
                        :text="Localize('mapset.info')"
                    />
                    <TabControlItem :url="`/set/${mapset.id}/scores`" icon="fa-solid fa-arrow-trend-up" :text="Localize('mapset.scores')" />
                    <TabControlItem
                        v-if="mapset.show_mod_actions"
                        :url="`/set/${mapset.id}/modding`"
                        icon="fa-solid fa-pen-ruler"
                        :text="Localize('mapset.modding')"
                    />
                </TabControl>
                <div class="grid w-full *:col-1 *:row-1">
                    <NuxtPage :mapset="mapset" :map="current" />
                </div>
            </div>
            <div class="flex w-full flex-col gap-5 md:w-80">
                <Button
                    @click="() => ratepanel?.Open()"
                    class="bg-dark-2 py-2 text-center"
                    v-if="utils.IsPurifier(API.CurrentUser.value) && !current.has_voted_rate"
                    >Rate Vote</Button
                >
                <Button @click="RefreshRating" class="bg-dark-2 py-2 text-center" v-if="utils.IsDeveloper(API.CurrentUser.value)">Refresh Rating</Button>
                <MapSetSidebarMapper :mapper="current.mapper" />
                <MapSetSidebarSection title="Voting">
                    <MapSetSidebarVotes :mapset="mapset" />
                </MapSetSidebarSection>
                <MapSetSidebarSection title="Statistics">
                    <MapSetSidebarStats :map="current" />
                </MapSetSidebarSection>
            </div>
        </div>

        <MapRateVoteOverlay
            ref="ratepanel"
            :map="current"
            @updated="
                current.rating = $event;
                current.has_voted_rate = true;
            "
        />
    </div>
</template>
