<script setup>
import Utils from '@/utils/Utils';

defineProps({
    group: Object
});
</script>

<template>
    <div class="flex h-8 p-3 justify-center items-center gap-2 bg-dark-2 bg-opacity-50 rounded-full" :style="'color: ' + group.color">
        <i :class="Utils.GetIconForGroup(group.id) + ' w-5'"></i>
        <p class="text-sm">{{ group.name }}</p>
    </div>
</template>