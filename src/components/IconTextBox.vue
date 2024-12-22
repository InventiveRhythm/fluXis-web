<script setup lang="ts">
import { ref } from 'vue';

const input = ref<HTMLInputElement>();

const props = defineProps<{
    icon: string,
    changed?: Function
}>();

function InputChanged(ev: any) {
    if (!props.changed)
        return;

    props.changed(((ev as InputEvent)?.target as HTMLInputElement)?.value);
}

defineExpose({ input });
</script>

<template>
    <div class="relative">
        <div class="absolute left-4 top-4 size-6 flex items-center justify-center">
            <i :class="`fa fa-${icon} text-xl`"></i>
        </div>
        <input class="w-full p-4 pl-12 bg-dark-2 rounded-xl focus:outline-none" ref="input"
               type="text" v-bind="$attrs" @input="InputChanged">
    </div>
</template>