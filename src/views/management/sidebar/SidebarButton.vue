<script setup>
import { reactive, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const props = defineProps({
    link: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

const route = useRoute();

const react = reactive({
    current: false
});

watch(() => route.path, updateState);
updateState();

function updateState() {
    let routePath = route.path;

    if (routePath.endsWith("/")) {
        const idx = routePath.lastIndexOf("/");
        routePath = routePath.substring(0, idx);
    }

    react.current = routePath === props.link;
}
</script>

<template>
    <RouterLink :to="link" class="w-full h-10 bg-dark-2 rounded-lg flex flex-row items-center text-sm p-3" :class="{ 'bg-dark-3': react.current }">
        <i :class="`fa fa-${icon} mr-2`"></i> {{ text }}
    </RouterLink>
</template>