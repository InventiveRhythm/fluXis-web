<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col justify-center gap-2">
        <p class="text-left text-xl">{{ title }}</p>
        <slot></slot>
    </div>
</template>
