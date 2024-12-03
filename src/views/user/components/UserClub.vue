<script setup lang="ts">
import ClubIcon from '@/components/images/ClubIcon.vue';
import ClubBanner from '@/components/images/ClubBanner.vue';

import type APIClub from '@/api/models/clubs/APIClub';

defineProps<{
    club: APIClub
}>();
</script>

<template>
    <RouterLink :to="`/club/${club.id}`">
        <div class="w-full h-20 overlap-grid rounded-xl text-left">
            <ClubBanner class="object-cover" :club="club" />
            <div class="bg-dark-2 opacity-50"></div>
            <div class="w-full flex items-center gap-3">
                <div class="size-20">
                    <ClubIcon class="size-full rounded-xl object-cover" :club="club" />
                </div>
                <p class="flex-1 drop-shadow-text text-xl line-clamp-1">{{ club.name }}</p>
            </div>
        </div>
    </RouterLink>
</template>