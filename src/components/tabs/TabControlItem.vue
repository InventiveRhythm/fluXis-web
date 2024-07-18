<script setup>
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    url: String,
    alternate: String,
    icon: String,
    text: String
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

    react.current = routePath === props.url || routePath === props.alternate;
}
</script>

<template>
    <RouterLink class="flex gap-2 items-center transition-opacity" :class="{ 'opacity-60': !react.current }" :to="url">
        <i :class=icon></i>
        <p>{{ text }}</p>
    </RouterLink>
</template>