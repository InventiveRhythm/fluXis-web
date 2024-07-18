<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="w-full flex flex-col justify-center gap-2">
        <p class="text-left text-2xl px-2">{{ title }}</p>
        <slot ></slot>
    </div>
</template>