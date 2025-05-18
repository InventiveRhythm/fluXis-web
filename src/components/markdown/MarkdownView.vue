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
    @apply max-w-full;

    * {
        @apply  box-content;
    }

    h1 {
        @apply text-4xl mb-4;
    }

    h2 {
        @apply text-2xl mt-8 mb-4;
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
        @apply text-sm my-4;
    }

    ul,
    ol {
       @apply list-inside list-disc mt-2;

        li {
            @apply text-sm mt-1;
        }
	ul,ol {
	    @apply ml-4 mt-1;
	}
    }

    pre {
        @apply bg-dark-2 p-4 rounded-lg my-2 overflow-x-auto;

        code {
            @apply bg-dark-2 p-0;
        }
    }

    code {
        @apply bg-dark-1 rounded-md text-dark-text font-mono font-bold px-2 py-1;
    }

    table {
        @apply w-full mt-2;

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

    blockquote {
        @apply bg-dark-2 p-6 rounded-2xl border-highlight border-2;
    }
}
</style>
