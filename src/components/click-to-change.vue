<script setup lang="ts">
defineProps<{
    noText?: boolean;
}>();
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-1 bg-dark-2/75 opacity-0 transition-opacity group-hover:opacity-100">
        <i class="fa fa-pencil text-sm"></i>
        <p class="text-xs" v-if="!noText">Click to change.</p>
    </div>
</template>
