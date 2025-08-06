<script setup lang="ts">
const props = defineProps<{
    link: string;
    icon: string;
    text: string;
}>();

const route = useRoute();
const active = ref(false);

watch(() => route.path, UpdateState);
UpdateState();

function UpdateState() {
    if (props.link == '/management') {
        active.value = route.path == props.link;
        return;
    }

    active.value = route.path.startsWith(props.link);
}
</script>

<template>
    <NuxtLink
        :to="link"
        class="flex h-10 w-full flex-row items-center px-3 transition-colors duration-75 hover:bg-dark-text/20"
        :class="{
            'text-dark-text/60': !active
        }"
    >
        <i :class="`fa text-sm fa-${icon} mb-0.5 mr-2`"></i>
        <p class="text-sm leading-none">{{ text }}</p>
    </NuxtLink>
</template>
