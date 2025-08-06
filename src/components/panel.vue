<script setup lang="ts">
const content = ref();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

defineProps<{
    title: string;
    error?: string;
    open: boolean;
    width?: string;
}>();

function VoidClick(e: MouseEvent) {
    if (content.value.contains(e.target)) return;

    emit('close');
}
</script>

<template>
    <Teleport to="#panels">
        <Transition name="panel-overlay">
            <div
                class="pointer-events-auto fixed left-0 top-0 z-20 flex h-screen w-screen select-none items-center justify-center bg-dark-1 bg-opacity-80 backdrop-blur-md"
                @click="VoidClick"
                v-if="open"
            >
                <div :class="`flex flex-col ${width ?? 'w-panel'} gap-4 rounded-2xl bg-dark-3 p-6`" ref="content">
                    <div>
                        <p class="w-full break-words text-2xl">{{ title }}</p>
                        <p class="text-red" v-if="error">{{ error }}</p>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.panel-overlay-enter-active,
.panel-overlay-leave-active {
    transition:
        opacity 150ms,
        transform 300ms;

    > div {
        transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.panel-overlay-leave-to,
.panel-overlay-enter-from {
    opacity: 0;

    > div {
        scale: 0.9;
    }
}
</style>
