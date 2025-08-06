<script setup lang="ts">
import WhiteIcon from '@/assets/image/logo-icon-white.png';

defineProps<{
    name: string;
}>();
</script>

<template>
    <div
        class="group flex h-10 select-none flex-col items-center justify-center rounded-lg bg-opacity-0 py-1 transition-all hover:bg-opacity-20 active:scale-95"
    >
        <img class="h-4 w-3 object-contain" :src="WhiteIcon" v-if="name == 'fluXis'" />
        <i :class="`fab w-5 text-center fa-${name.toLowerCase()}`" v-else></i>
        <p class="invisible h-0 text-2xs opacity-0 transition-all group-hover:visible group-hover:h-3 group-hover:opacity-100">{{ name }}</p>
    </div>
</template>
