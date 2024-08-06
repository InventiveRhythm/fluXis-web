<script setup>
import Assets from '@/utils/Assets';

const props = defineProps({
    name: String,
    id: Number,
    role: String,
    about: String,
    flip: Boolean
});
</script>

<template>
    <div class="overlap-grid w-full h-36 items-center rounded-lg">
        <img class="object-cover" :src="Assets.banner(id)" animated-load>
        <div class="section-gradient opacity-60" :class="{ 'rotate-180': flip }"></div>
        <div class="flex flex-row p-6 items-center gap-4" :class="{ 'flex-row-reverse': flip }">
            <img class="size-24 object-cover rounded-lg" :src="Assets.avatar(id)" animated-load>
            <div class="text-left" :class="{ 'text-right': flip }">
                <p class="text-xl">{{ name }}</p>
                <p class="text-xs opacity-80 mb-1">{{ role }}</p>
                <p class="text-sm">{{ about }}</p>
            </div>
        </div>
    </div>
</template>