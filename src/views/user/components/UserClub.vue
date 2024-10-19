<script setup>
import ClubIcon from '@/components/images/ClubIcon.vue';
import ClubBanner from '@/components/images/ClubBanner.vue';

const props = defineProps({
    club: Object
});
</script>

<template>
    <RouterLink :to="`/club/${club.id}`">
        <div class="w-full h-20 overlap-grid rounded-xl">
            <ClubBanner class="object-cover" :club="club" />
            <div class="bg-dark-2 opacity-50"></div>
            <div class="w-full flex items-center gap-3">
                <div class="size-20">
                    <ClubIcon class="size-full rounded-xl object-cover" :club="club" />
                </div>
                <p class="drop-shadow-text text-xl">{{ club.name }}</p>
            </div>
        </div>
    </RouterLink>
</template>