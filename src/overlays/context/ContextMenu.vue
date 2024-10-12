<script setup lang="ts">
import { reactive, ref } from 'vue';

import { RegisterEvent } from '@/utils/Events';

const react = reactive({
    items: [],
    open: false,
    right: false,
    posX: 0,
    posY: 0
});

let justOpened = false;
const menu = ref();

RegisterEvent('open-context', open);

function open(ev) {
    react.posX = ev.x;
    react.posY = ev.y;
    react.items = ev.items;
    react.right = ev.right;
    react.open = true;
    justOpened = true;
}

document.addEventListener('click', e => {
    if (justOpened) {
        justOpened = false;
        return;
    }

    if (menu.value && menu.value.contains(e.target))
        return;

    react.open = false;
});

function doAction(item) {
    item.action();
    react.open = false;
}
</script>

<template>
    <Transition name="context-fade">
        <div
            :class="`z-50 fixed flex flex-col flex-1 transition-all duration-75 bg-dark-2 drop-shadow-md rounded-md overflow-hidden ${react.right ? '-translate-x-full origin-top-right' : 'origin-top-left'}`"
            ref="menu" :style="`left: ${react.posX}px; top: ${react.posY}px;`" v-if="react.open">
            <div
                class="flex h-9 flex-row items-center gap-1.5 pl-2 pr-4 text-sm transition-colors hover:bg-text hover:bg-opacity-20"
                :class="item.classes"
                v-for="item in react.items" @click="doAction(item)">
                <div class="size-5 flex items-center justify-center">
                    <i :class="(item.icon || 'fa-solid fa-question')"></i>
                </div>
                {{ item.text }}
            </div>
        </div>
    </Transition>
</template>

<style>
.context-fade-leave-to,
.context-fade-enter-from {
    opacity: 0;
    scale: .95;
}
</style>