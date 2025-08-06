<script setup lang="ts">
defineProps<{
    link?: string;
    icon: string;
    text: string;
}>();
</script>

<template>
    <a :class="{ 'hover:text-highlight': link }" :href="link" target="_blank">
        <i :class="`fab w-5 text-center text-base ${icon}`"></i> <span class="text-sm">{{ text }}</span>
    </a>
</template>
