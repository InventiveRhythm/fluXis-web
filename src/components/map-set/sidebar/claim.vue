<script setup lang="ts">
import type { APIMapClaim } from '~/models/maps/APIMapClaim';
import Assets from '~/utils/assets';

defineProps<{
    claim: APIMapClaim;
}>();
</script>

<template>
    <NuxtLink class="overlap-grid h-12 w-full rounded-md text-left" :to="`/clubs/${claim.club.id}`">
        <LoadingImage class="object-cover" :src="Assets.ClubBanner(claim.club)" />
        <div class="bg-dark-2/75"></div>
        <div class="flex size-full items-center gap-2 pr-2">
            <LoadingImage class="size-12 rounded-md object-cover" :src="Assets.ClubIcon(claim.club)" />
            <div class="flex flex-1 flex-col gap-1 drop-shadow-text">
                <p class="line-clamp-1 w-full text-sm leading-none">
                    <ClubTag class="inline text-xs leading-none" :club="claim.club"></ClubTag>
                    {{ claim.club.name }}
                </p>
                <p class="text-xs leading-none">
                    {{ claim.score.pr.toFixed(2) }}pr
                    <span class="opacity-80">{{ claim.score.accuracy.toFixed(2) }}%</span>
                </p>
            </div>
        </div>
    </NuxtLink>
</template>
