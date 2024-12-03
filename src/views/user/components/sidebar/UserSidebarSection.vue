<script setup lang="ts">
defineProps<{
    title: string
}>();
</script>

<template>
    <div class="w-full flex flex-col justify-center gap-2">
        <p class="text-left text-xl" v-if="title">{{ title }}</p>
        <slot></slot>
    </div>
</template>