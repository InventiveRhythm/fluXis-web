<script setup>
import TimeUtils from '@/utils/TimeUtils';

defineProps({
    text: String,
    value: String
});
</script>

<template>
    <div class="w-full flex flex-col justify-center items-center gap-1.5">
        <p class="text-xs leading-none opacity-80">{{ text }}</p>
        <p class="text-sm leading-none">{{ value }}</p>
    </div>
</template>