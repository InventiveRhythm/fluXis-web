<script setup>
import { RouterLink } from 'vue-router';

import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';

const props = defineProps({
    mapset: Object
});

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

function keyModeString() {
    let lowest = lowestKeyMode();
    let highest = highestKeyMode();

    if (lowest == highest)
        return lowest;

    return lowest + '-' + highest;
}

function getStatusString() {
    switch (props.mapset.status) {
        case 0:
            return 'unsubmitted';
        case 1:
            return 'pending';
        case 2:
            return 'impure';
        case 3:
            return 'pure';
        default:
            return 'unknown';
    }
}
</script>

<template>
    <RouterLink class="h-28 w-full" :to="'/set/' + mapset.id" v-if="mapset">
        <div class="overlap-grid size-full rounded-2xl bg-dark-3">
            <LoadingImage class="object-cover" :src="Assets.Background(mapset.id)" />
            <div class="flex flex-row bg-dark-2 bg-opacity-60 transition-colors hover:bg-opacity-50">
                <LoadingImage class="size-28 rounded-2xl object-cover" :src="Assets.Cover(mapset.id)" />
                <div class="flex h-full flex-grow flex-col justify-between p-3 text-left">
                    <div class="drop-shadow-text">
                        <span class="line-clamp-1 leading-tight text-lg">{{ mapset.title }}</span>
                        <span class="line-clamp-1 leading-tight text-sm">by {{ mapset.artist }}</span>
                        <span class="line-clamp-1 leading-tight text-xs opacity-80">uploaded by {{ mapset.creator.username }}</span>
                    </div>
                    <div class="mt-1 flex justify-between text-xs text-black text-opacity-80">
                        <span class="flex h-5 items-center rounded-full px-1.5 uppercase shadow-normal" :style="'background-color: var(--tag-status-' + getStatusString() + ')'">{{ getStatusString() }}</span>
                        <span :class="'keymode-gradient flex h-5 items-center rounded-full px-1.5 shadow-normal mode-min-' + lowestKeyMode() + ' mode-max-' + highestKeyMode()">{{ keyModeString() }}K</span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>