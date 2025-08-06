<script setup lang="ts">
import type { APIMap } from '~/models/maps/APIMap';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const { data: maps } = await API.PerformGet<
    {
        playcount: number;
        rank: number;
        map: APIMap;
    }[]
>(`/leaderboards/maps/plays`);
</script>

<template>
    <div class="w-fit-mobile">
        <h1 class="text-4xl">Global Rankings</h1>
        <h2 class="mb-6 text-xl opacity-80">Map Playcount</h2>
        <div class="flex flex-col gap-3" v-if="maps?.length">
            <NuxtLink :to="`/set/${m.map.mapset}`" class="overlap-grid h-12 w-full overflow-hidden rounded-lg" v-for="m in maps">
                <LoadingImage class="object-cover" :src="Assets.Background(m.map.mapset)" :low="Assets.BackgroundPreview(m.map.mapset)" />
                <div class="bg-dark-2 opacity-50"></div>
                <div class="flex items-center">
                    <div class="flex size-12 items-center justify-center">
                        <p>#{{ m.rank }}</p>
                    </div>
                    <LoadingImage class="size-12 rounded-lg object-cover" :src="Assets.Cover(m.map.mapset)" :low="Assets.CoverPreview(m.map.mapset)" />
                    <div class="flex flex-grow items-center justify-between px-3">
                        <div class="flex flex-col text-left">
                            <p class="flex items-center gap-2 leading-tight">
                                {{ m.map.title }}
                                <span class="text-sm opacity-80">
                                    {{ m.map.artist }}
                                </span>
                            </p>
                            <p class="text-xs leading-tight">{{ m.map.difficulty }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-base leading-none">{{ m.playcount }} Plays</p>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
