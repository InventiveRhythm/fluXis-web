<script setup>
import { reactive } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import LoadingContainer from '@/components/status/LoadingContainer.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import Assets from '@/utils/Assets';
import API from '@/utils/API';
import { getRatingColor } from '@/utils/ColorUtils';
import { formatAccuracy, formatDecimal } from '@/utils/formatting';

const route = useRoute();
let id = parseInt(route.params.id);

const react = reactive({
    loading: true,
    claims: []
})

API.PerformGet(`/club/${id}/claims`).then(res => {
    var claims = res.data

    claims.sort(function (a, b) {
        if (a.score.pr < b.score.pr) return 1;
        if (a.score.pr > b.score.pr) return -1;
        return 0;
    });

    react.claims = claims
}).finally(() => {
    react.loading = false;
})

function GetRatingColor(map) {
    return `background-color: ${getRatingColor(map.nps)}`
}
</script>

<template>
    <LoadingContainer v-if="react.loading" />
    <div class="w-full flex flex-col items-center gap-3" v-else>
        <RouterLink class="w-full h-12 flex flex-row items-center gap-2" :to="`/set/${claim.map.mapset}`"
            v-for="claim in react.claims">
            <div class="size-12">
                <LoadingImage class="size-full object-cover rounded-lg" :src="Assets.Cover(claim.map.mapset)" />
            </div>
            <div class="flex-1 min-w-0 flex flex-col">
                <p class="line-clamp-1">
                    {{ claim.map.title }}
                    <span class="text-sm opacity-60">{{ claim.map.artist }}</span>
                </p>
                <div class="w-full flex flex-row gap-2 items-center">
                    <div class="w-11 h-4 text-2xs flex items-center justify-center rounded-full text-black text-opacity-75" :style="GetRatingColor(claim.map)">{{ formatDecimal(claim.map.nps) }}</div>
                    <p class="text-2xs line-clamp-1">{{ claim.map.difficulty }}</p>
                </div>
            </div>
            <div class="flex flex-col text-right">
                <p>{{ formatDecimal(claim.score.pr) }}pr</p>
                <p class="text-sm opacity-60">{{ formatAccuracy(claim.score.accuracy) }}</p>
            </div>
        </RouterLink>
    </div>
</template>