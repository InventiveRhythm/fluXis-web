<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    url: string,
    alternate?: string,
    icon: string,
    text: string
}>();

const route = useRoute();

const react = reactive({
    current: false
});

watch(() => route.path, UpdateState);
UpdateState();

function UpdateState() {
    let routePath = route.path;

    if (routePath.endsWith('/')) {
        const idx = routePath.lastIndexOf('/');
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