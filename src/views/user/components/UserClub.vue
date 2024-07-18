<script setup>
import Config from '@/config.json';
import Assets from '@/utils/Assets';

const props = defineProps({
    club: Object
});
</script>

<template>
    <RouterLink :to="`/club/${club.id}`">
        <div class="w-full h-20 overlap-grid rounded-xl">
            <img class="object-cover" :src="Assets.clubBanner(club.id)" animated-load />
            <div class="bg-dark-2 opacity-50"></div>
            <div class="w-full flex items-center gap-3">
                <img class="size-20 rounded-xl object-cover" :src="Assets.clubIcon(club.id)" animated-load />
                <p class="drop-shadow-text text-xl">{{ club.name }}</p>
            </div>
        </div>
    </RouterLink>
</template>