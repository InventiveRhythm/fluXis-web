<script setup>
import { ref } from 'vue';

const input = ref(null);

defineProps({
    icon: String,
    changed: Function
});

defineExpose({ input });
</script>

<template>
    <div class="relative">
        <div class="absolute left-4 top-4 size-6 flex items-center justify-center">
            <i :class="`fa fa-${icon} text-xl`"></i>
        </div>
        <input class="w-full p-4 pl-12 bg-dark-2 rounded-xl focus:outline-none" ref="input"
            type="text" v-bind="$attrs" @input="changed($event.target.value)">
    </div>
</template>