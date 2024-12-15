<script setup lang="ts">
import { createApp, onMounted, ref, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter();

const props = defineProps<{
    content: string,
    scroll?: boolean
}>()

const target = ref<HTMLDivElement>();

const render = (html: string) => {
    const ren = createApp({
        template: html,
        components: {}
    })

    ren.use(router)

    if (target.value) {
        ren.mount(target.value)
        nextTick(MoveToHash)
    }
};

watch(() => props.content, (content) => render(content), { immediate: true })
onMounted(() => render(props.content))

function MoveToHash() {
    if (route.hash) {
        const el = document.getElementById(route.hash.substring(1))
        if (el) el.scrollIntoView({ block: 'start' })
    }
}
</script>

<template>
    <div ref="target" class="md-content"></div>
</template>


<style lang="scss">
.md-content {
    @apply flex flex-col gap-3 max-w-full;

    h1 {
        @apply text-2xl;
    }

    h2 {
        @apply text-xl;
    }

    h3 {
        @apply text-lg;
    }

    h4 {
        @apply text-base;
    }

    a {
        @apply text-primary hover:underline
    }

    >p {
        @apply text-sm;
    }

    ul,
    ol {
        @apply list-inside list-disc;

        li {
            @apply text-sm;
        }
    }

    pre {
        @apply bg-dark-2 p-2 rounded-lg mt-2 overflow-x-auto;
    }

    code {
        @apply bg-dark-2 rounded-md;

        span {
            @apply font-mono;
        }
    }

    table {
        @apply mt-2 border-collapse;

        img {
            @apply mt-0 inline;
        }

        th,
        td {
            @apply border-2 border-dark-text px-2;
        }

        th {
            @apply py-4;
        }

        td {
            @apply py-3;
        }
    }
}
</style>