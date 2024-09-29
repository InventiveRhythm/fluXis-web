<script setup>
defineProps({
    text: String,
    itemid: String,
    current: String
});
</script>

<template>
    <div class="h-8 bg-dark-2 hover:bg-dark-4 flex flex-row items-center p-3" :class="{ 'bg-dark-3': current == itemid }">
        <p class="text-xs line-clamp-1">{{ text }}</p>
    </div>
</template>