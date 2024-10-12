<script setup lang="ts">
const props = defineProps<{
    label: string,
    state: boolean,
    change: Function
}>();
</script>

<template>
    <div class="flex h-6 flex-row items-center justify-between" @click="change(!state)">
        <p class="text-sm">{{ label }}</p>
        <i :class="`${state ? 'fa fa-square-check' : 'fa-regular fa-square'}`"></i>
    </div>
</template>