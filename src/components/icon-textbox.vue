<script setup lang="ts">
import { ref } from 'vue';

const input = ref<HTMLInputElement>();

defineProps<{
    icon: string;
    error?: string;
}>();

defineExpose({ input });
</script>

<template>
    <div class="relative">
        <div class="absolute left-4 top-4 flex size-6 items-center justify-center">
            <i :class="`fa fa-${icon} text-xl`"></i>
        </div>
        <input class="w-full rounded-xl bg-dark-2 p-4 pl-12 focus:outline-none" :class="{ 'outline-red outline outline-2 pb-6': error }" ref="input" type="text" v-bind="$attrs" />
        <div class="absolute left-4 bottom-1.5 text-xs text-red">{{ error }}</div>
    </div>
</template>
