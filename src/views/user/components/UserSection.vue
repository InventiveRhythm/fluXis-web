<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="w-full flex flex-col gap-3">
        <p class="text-2xl px-2">{{ title }}</p>
        <slot ></slot>
    </div>
</template>