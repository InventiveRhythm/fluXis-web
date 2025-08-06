<script setup lang="ts">
defineProps<{
    text: string;
    value: any;
}>();
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center gap-1.5">
        <p class="text-xs leading-none opacity-80">{{ text }}</p>
        <p class="text-sm leading-none">{{ value }}</p>
    </div>
</template>
