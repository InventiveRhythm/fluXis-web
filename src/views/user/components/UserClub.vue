<script setup>
import Config from '@/config.json';

const props = defineProps({
    club: Object
});
</script>

<template>
    <div class="w-full h-20 overlap-grid rounded-xl">
        <img class="object-cover" :src="Config.assetsUrl + '/club-banner/' + club.id" animated-load />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="w-full flex items-center gap-3">
            <img class="size-20 rounded-xl object-cover" :src="Config.assetsUrl + '/club-icon/' + club.id" animated-load />
            <p class="drop-shadow-text text-xl">{{ club.name }}</p>
        </div>
    </div>
</template>