<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col">
        <p class="text-lg">{{ title }}</p>
        <slot></slot>
    </div>
</template>
