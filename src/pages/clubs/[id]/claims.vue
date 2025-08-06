<script setup lang="ts">
import type APIClubClaim from '~/models/clubs/APIClubClaim';
import API from '~/utils/api';
import Assets from '~/utils/assets';
import Format from '~/utils/formatting';

const { data: claims } = await API.PerformGet<APIClubClaim[]>(`/club/${useRoute().params.id}/claims`);

if (claims) {
    claims.sort(function (a, b) {
        if (a.score.pr < b.score.pr) return 1;
        if (a.score.pr > b.score.pr) return -1;
        return 0;
    });
}
</script>

<template>
    <div class="flex w-full flex-col items-center gap-3" v-if="claims">
        <NuxtLink class="flex h-12 w-full flex-row items-center gap-2" :to="`/set/${claim.map.mapset}`" v-for="claim in claims">
            <div class="size-12">
                <LoadingImage :src="Assets.Cover(claim.map.mapset)" class="size-full rounded-lg object-cover" />
            </div>
            <div class="flex min-w-0 flex-1 flex-col">
                <p class="line-clamp-1">
                    {{ claim.map.title }}
                    <span class="text-sm opacity-60">{{ claim.map.artist }}</span>
                </p>
                <div class="flex w-full flex-row items-center gap-2">
                    <div
                        class="flex h-4 w-11 items-center justify-center rounded-full text-2xs text-black text-opacity-75"
                        :style="`background-color: ${GetRatingColor(claim.map.nps)}`"
                    >
                        {{ Format.Decimal(claim.map.nps) }}
                    </div>
                    <p class="line-clamp-1 text-2xs">{{ claim.map.difficulty }}</p>
                </div>
            </div>
            <div class="flex flex-col text-right">
                <p>{{ Format.Decimal(claim.score.pr) }}pr</p>
                <p class="text-sm opacity-60">{{ Format.Accuracy(claim.score.accuracy) }}</p>
            </div>
        </NuxtLink>
    </div>
</template>
