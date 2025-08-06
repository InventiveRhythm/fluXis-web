<script setup lang="ts">
defineProps<{
    text?: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col items-center pt-8">
        <div class="mb-4 size-24">
            <NuxtImg class="size-full" src="https://cdn.discordapp.com/emojis/1214056479871471656.png?size=2048" />
        </div>
        <p>{{ Localize('status.error') }}</p>
        <p class="text-xs opacity-80">{{ text }}</p>
    </div>
</template>
