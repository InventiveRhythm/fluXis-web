<script setup lang="ts">
const props = defineProps<{
    url: string;
    alternate?: string;
    icon: string;
    text: string;
}>();

const route = useRoute();
const current = ref(false);

watch(() => route.path, UpdateState);
UpdateState();

function UpdateState() {
    let routePath = route.path;

    if (routePath.endsWith('/')) {
        const idx = routePath.lastIndexOf('/');
        routePath = routePath.substring(0, idx);
    }

    current.value = routePath === props.url || routePath === props.alternate;
}
</script>

<template>
    <RouterLink class="flex items-center gap-2 transition-opacity" :class="{ 'opacity-60': !current }" :to="url">
        <i :class="icon"></i>
        <p>{{ text }}</p>
    </RouterLink>
</template>
