<script setup>
defineProps({
    icon: String
});
</script>

<template>
    <div class="size-12 bg-dark-2 rounded-full flex items-center justify-center">
        <i :class="`text-lg fa-solid fa-${icon}`"></i>
    </div>
</template>