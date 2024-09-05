<script setup>
import LoadingImage from '@/components/LoadingImage.vue';

import Assets from '@/utils/Assets';

const props = defineProps({
    club: Object
});
</script>

<template>
    <RouterLink :to="`/club/${club.id}`">
        <div class="w-full h-20 overlap-grid rounded-xl">
            <LoadingImage class="object-cover" :src="Assets.ClubBanner(club.id)" />
            <div class="bg-dark-2 opacity-50"></div>
            <div class="w-full flex items-center gap-3">
                <div class="size-20">
                    <LoadingImage class="size-full rounded-xl object-cover" :src="Assets.ClubIcon(club.id)" />
                </div>
                <p class="drop-shadow-text text-xl">{{ club.name }}</p>
            </div>
        </div>
    </RouterLink>
</template>