<script setup lang="ts">
defineProps<{
    title: string
}>();
</script>

<template>
    <div class="w-full flex flex-col gap-2">
        <p class="text-xl px-2">{{ title }}</p>
        <slot ></slot>
    </div>
</template>