<script setup>
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    url: String,
    icon: String,
    text: String
});

const route = useRoute();

const react = reactive({
    current: false
});

watch(() => route.path, () => {
    console.log("yeah")
    updateState();
})

updateState();

function updateState() {
    react.current = route.path === props.url;
}
</script>

<template>
    <RouterLink class="flex gap-2 items-center transition-opacity" :class="{ 'opacity-60': !react.current }" :to="url">
        <i :class=icon></i>
        <p>{{ text }}</p>
    </RouterLink>
</template>