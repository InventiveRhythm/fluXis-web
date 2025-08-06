<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col gap-3">
        <p class="text-left text-xl">{{ title }}</p>
        <div class="flex w-full flex-col gap-4 text-left">
            <slot></slot>
        </div>
    </div>
</template>
