<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import Assets from '~/utils/assets';

defineProps<{
    club: APIClub;
}>();
</script>

<template>
    <NuxtLink class="overlap-grid h-20 w-full rounded-xl text-left" :to="`/clubs/${club.id}`">
        <LoadingImage class="object-cover" :src="Assets.ClubBanner(club)" />
        <div class="bg-dark-2/50"></div>
        <div class="flex size-full items-center gap-3 pr-3">
            <LoadingImage class="size-20 rounded-xl object-cover" :src="Assets.ClubIcon(club)" />
            <p class="line-clamp-1 min-w-0 flex-1 text-lg">{{ club.name }}</p>
        </div>
    </NuxtLink>
</template>
