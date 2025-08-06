<script setup lang="ts">
import type { APIMapSet } from '~/models/maps/APIMapSet';
import { APIMapSetStatus } from '~/models/maps/APIMapSetStatus';
import Assets from '~/utils/assets';

const props = defineProps<{
    mapset: APIMapSet;
}>();

function lowestKeyMode() {
    let lowest = -1;

    props.mapset.maps.forEach((element) => {
        if (lowest == -1) lowest = element.mode;

        if (element.mode < lowest) lowest = element.mode;
    });

    return lowest;
}

function highestKeyMode() {
    let highest = 0;

    props.mapset.maps.forEach((element) => {
        if (element.mode > highest) highest = element.mode;
    });

    return highest;
}

function GetKeyModeString() {
    let lowest = lowestKeyMode();
    let highest = highestKeyMode();

    if (lowest == highest) return lowest;

    return lowest + '-' + highest;
}

function GetStatusString() {
    switch (props.mapset.status) {
        case APIMapSetStatus.Blacklisted:
            return 'blacklisted';
        case APIMapSetStatus.Unsubmitted:
            return 'unsubmitted';
        case APIMapSetStatus.Pending:
            return 'pending';
        case APIMapSetStatus.Impure:
            return 'impure';
        case APIMapSetStatus.Pure:
            return 'pure';
        default:
            return 'unknown';
    }
}
</script>

<template>
    <NuxtLink :to="`/set/${mapset.id}`" class="h-28 w-full">
        <div class="overlap-grid h-inherit w-full rounded-2xl bg-dark-3">
            <LoadingImage class="object-cover" :src="Assets.Background(mapset.id)" :low="Assets.BackgroundPreview(mapset.id)" />
            <div class="flex flex-row bg-dark-2 bg-opacity-60 transition-colors hover:bg-opacity-50">
                <LoadingImage class="size-28 rounded-2xl object-cover" :src="Assets.Cover(mapset.id)" :low="Assets.CoverPreview(mapset.id)" />
                <div class="flex h-full flex-1 flex-col justify-between p-3 text-left">
                    <div class="*:line-clamp-1 *:leading-tight">
                        <span class="text-lg">{{ mapset.title }}</span>
                        <span class="text-sm">{{ Localize('mapset.artist.by', mapset.artist) }}</span>
                        <span class="text-xs opacity-80">
                            {{ Localize('mapset.uploaded.by', mapset.creator.username) }}
                        </span>
                    </div>
                    <div class="mt-1 flex justify-between text-xs text-black text-opacity-80 *:flex *:h-5 *:px-2">
                        <span :class="`items-center rounded-full uppercase bg-status-${GetStatusString()}`">
                            {{ GetStatusString() }}
                        </span>
                        <span :class="`items-center rounded-full bg-gradient-to-r from-mode-${lowestKeyMode()} to-mode-${highestKeyMode()}`">
                            {{ GetKeyModeString() }}K
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
