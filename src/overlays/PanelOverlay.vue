<script setup>
import { ref } from 'vue';

const content = ref();

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    error: {
        type: String,
        required: true
    },
    open: {
        type: Boolean,
        required: true
    },
    voidclick: {
        type: Function,
        required: true
    },
    width: {
        type: String,
        default: "w-panel",
        required: false
    }
});

function VoidClick(e) {
    if (content.value.contains(e.target))
        return;

    props.voidclick();
}
</script>

<template>
    <Transition name="panel-overlay">
        <div class="z-20 pointer-events-auto select-none fixed top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-md bg-dark-1 bg-opacity-80"
            v-if="open" @click="VoidClick">
            <div :class="`flex flex-col ${width} gap-4 p-6 bg-dark-3 rounded-2xl drop-shadow-lg`" ref="content">
                <div>
                    <p class="w-full break-words text-2xl">{{ title }}</p>
                    <p class="text-red" v-if="error">{{ error }}</p>
                </div>
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<style>
.panel-overlay-enter-active,
.panel-overlay-leave-active {
    transition: opacity 150ms, transform 300ms;

    >div {
        transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.panel-overlay-leave-to,
.panel-overlay-enter-from {
    opacity: 0;

    >div {
        scale: .9;
    }
}
</style>