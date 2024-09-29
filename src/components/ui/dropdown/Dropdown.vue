<script setup>
import { reactive, ref } from 'vue';

import DropdownItem from './DropdownItem.vue';

const props = defineProps({
    title: String,
    selected: Function,
    currentid: String, 
    items: Array
});

const header = ref(null);

const react = reactive({
    open: false
});

document.addEventListener("click", e => {
    if (header.value && header.value.contains(e.target))
        return;

    react.open = false;
});

function UpdateSelected(id) {
    props.selected(id);
}
</script>

<template>
    <div class="relative">
        <button type="button" ref="header" aria-expanded="true" aria-haspopup="true" @click="react.open = !react.open"
            class="inline-flex flex-row w-full justify-between items-center gap-2 rounded-xl bg-dark-2 p-4 text-base">
            {{ items.filter(i => i.id == currentid)[0].title }}
            <i class="fa fa-angle-down"></i>
        </button>
        <div v-if="react.open"
            class="absolute right-0 z-10 mt-2 w-inherit origin-top rounded-xl overflow-hidden bg-dark-2" role="menu"
            aria-orientation="vertical">
            <div role="none">
                <DropdownItem v-for="item in items" @click="UpdateSelected(item.id)" :text="item.title" :itemid="item.id" :current="currentid" />
            </div>
        </div>
    </div>
</template>