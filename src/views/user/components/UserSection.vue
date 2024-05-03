<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="w-full flex flex-col gap-5">
        <p class="text-2xl px-3">{{ title }}</p>
        <slot ></slot>
    </div>
</template>