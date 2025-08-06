<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import Assets from '~/utils/assets';

defineProps<{
    club: APIClub;
}>();
</script>

<template>
    <NuxtLink class="flex h-56 w-full flex-col rounded-3xl bg-dark-2 transition-all hover:bg-dark-3 active:scale-95" :to="`/clubs/${club.id}`">
        <LoadingImage class="h-36 w-full rounded-3xl object-cover" :src="Assets.ClubBanner(club)" />
        <div class="flex w-full flex-grow flex-row items-center gap-2 p-4 text-left">
            <LoadingImage class="size-12 rounded-lg object-cover" :src="Assets.ClubIcon(club)" />
            <div class="min-w-0 flex-grow">
                <p class="truncate">
                    <ClubTag class="inline text-sm" :club="club" />
                    {{ club.name }}
                </p>
                <p class="text-xs opacity-80">
                    {{ Localize(club.count > 1 ? 'club.members.count' : 'club.members.count.singular', club.count) }}
                </p>
            </div>
        </div>
    </NuxtLink>
</template>
