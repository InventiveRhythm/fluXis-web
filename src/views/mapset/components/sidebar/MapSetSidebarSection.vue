<script setup>
defineProps({
    title: String
});
</script>

<template>
    <div class="w-full flex flex-col gap-3">
        <p class="text-left text-xl">{{ title }}</p>
        <div class="w-full flex flex-col gap-4 text-left">
            <slot></slot>
        </div>
    </div>
</template>