<script setup lang="ts">
import WhiteIcon from '@/assets/images/white-icon.png';

defineProps<{
    name: string
}>()
</script>

<template>
    <div class="group flex h-10 select-none flex-col items-center justify-center py-1 rounded-lg bg-opacity-0 transition-all hover:bg-opacity-20 active:scale-95">
        <img class="w-3 h-4 object-contain" :src="WhiteIcon" v-if="name == 'fluXis'">
        <i :class="`w-5 text-center fab fa-${name.toLowerCase()}`" v-else></i>
        <p class="invisible text-2xs opacity-0 h-0 transition-all group-hover:visible group-hover:h-3 group-hover:opacity-100">{{ name }}</p>
    </div>
</template>