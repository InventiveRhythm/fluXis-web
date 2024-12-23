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
        @apply text-highlight hover:underline
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
        @apply bg-dark-2 p-4 rounded-lg mt-2 overflow-x-auto;

        code {
            @apply bg-dark-2 p-0;
        }
    }

    code {
        @apply bg-dark-1 rounded-md text-dark-text font-mono font-bold px-2 py-1;
    }

    table {
        @apply mt-2 border-collapse;

        img {
            @apply mt-0 inline;
        }

        th,
        td {
            @apply p-2;
        }

        tr {
            @apply odd:bg-dark-2 even:bg-dark-1;
        }

        th {
            @apply bg-dark-2 border-b-2 border-dark-1;
        }
    }
}
</style>