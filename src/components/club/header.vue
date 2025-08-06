<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import Assets from '~/utils/assets';

defineProps<{
    club: APIClub;
}>();
</script>

<template>
    <div class="overlap-grid h-44 w-full xl:rounded-2xl">
        <LoadingImage class="object-cover" :src="Assets.ClubBanner(club)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-col items-center justify-center">
            <div class="flex w-full max-w-[960px] flex-row items-center justify-start gap-5 px-10">
                <LoadingImage class="size-32 rounded-xl" :src="Assets.ClubIcon(club)" />
                <div class="flex flex-1 flex-col text-left">
                    <div class="flex w-full items-center gap-1.5">
                        <ClubTag class="text-xl" :club="club" />
                        <p class="line-clamp-1 text-3xl">{{ club.name }}</p>
                    </div>
                    <p class="opacity-80" v-if="club.members">
                        {{ Localize(club.members.length > 1 ? 'club.members.count' : 'club.members.count.singular', club.members.length) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
