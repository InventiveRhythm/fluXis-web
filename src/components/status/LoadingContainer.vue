<script setup lang="ts">
import LoadingImage from '../LoadingImage.vue';
</script>

<template>
    <div class="w-full pt-8 flex flex-col items-center">
        <div class="size-24 mb-4">
            <LoadingImage class="size-full" src="https://media.discordapp.net/stickers/1039992459209490513.png" />
        </div>
        <p>Please hold...</p>
        <p class="opacity-80 text-xs"><!-- We're getting the latest data for you... --></p>
    </div>
</template>