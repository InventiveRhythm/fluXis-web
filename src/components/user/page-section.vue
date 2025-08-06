<script setup lang="ts">
defineProps<{
    title: string;
    replacement: string;
    empty: boolean;
}>();
</script>

<template>
    <div class="flex w-full flex-col" :class="{ 'gap-2': !empty }">
        <p class="px-2 text-xl">{{ title }}</p>
        <p v-if="empty" class="px-2 text-sm opacity-80">{{ replacement }}</p>
        <slot v-else></slot>
    </div>
</template>
