<script setup lang="ts">
import { RouterLink } from 'vue-router';

import type { APIMapSet } from '@/api/models/maps/APIMapSet';
import { APIMapSetStatus } from '@/api/models/maps/APIMapSetStatus';

import MapSetBackground from '@/components/images/MapSetBackground.vue';
import MapSetCover from '@/components/images/MapSetCover.vue';

const props = defineProps<{
    mapset: APIMapSet
}>();

function lowestKeyMode() {
    let lowest = -1;

    props.mapset.maps.forEach(element => {
        if (lowest == -1)
            lowest = element.mode;

        if (element.mode < lowest)
            lowest = element.mode;
    });

    return lowest;
}

function highestKeyMode() {
    let highest = 0;

    props.mapset.maps.forEach(element => {
        if (element.mode > highest)
            highest = element.mode;
    });

    return highest;
}

function GetKeyModeString() {
    let lowest = lowestKeyMode();
    let highest = highestKeyMode();

    if (lowest == highest)
        return lowest;

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
    <RouterLink class="h-28 w-full" :to="'/set/' + mapset.id" v-if="mapset">
        <div class="overlap-grid W-full h-inherit rounded-2xl bg-dark-3">
            <MapSetBackground class="object-cover" :set="mapset" />
            <div class="flex flex-row bg-dark-2 bg-opacity-60 transition-colors hover:bg-opacity-50">
                <div class="size-28">
                    <MapSetCover class="size-full rounded-2xl object-cover" :set="mapset" />
                </div>
                <div class="flex h-full flex-1 flex-col justify-between p-3 text-left">
                    <div class="drop-shadow-text">
                        <span class="line-clamp-1 leading-tight text-lg">{{ mapset.title }}</span>
                        <span class="line-clamp-1 leading-tight text-sm">by {{ mapset.artist }}</span>
                        <span
                            class="line-clamp-1 leading-tight text-xs opacity-80">uploaded by {{ mapset.creator.username
                            }}</span>
                    </div>
                    <div class="mt-1 flex justify-between text-xs text-black text-opacity-80">
                        <span class="flex h-5 items-center rounded-full px-1.5 uppercase shadow-normal"
                              :style="'background-color: var(--tag-status-' + GetStatusString() + ')'">
                            {{ GetStatusString() }}
                        </span>
                        <span
                            :class="'keymode-gradient flex h-5 items-center rounded-full px-1.5 shadow-normal mode-min-' + lowestKeyMode() + ' mode-max-' + highestKeyMode()">
                            {{ GetKeyModeString() }}K
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>