<script setup lang="ts">
import { ref, watch } from 'vue';
import Markdown from '~/utils/markdown';

const props = withDefaults(defineProps<{
    modelValue: string;
    loading?: boolean;
    renderDebounce?: number;
    maxHeight?: string;
    placeholder?: string;
    loadingPlaceholder?: string;
    sanitize?: boolean;
    filter?: MarkdownTagFilter;
}>(), {
    maxHeight: '400px',
    sanitize: true,
    filter: () => new MarkdownTagFilter('blacklist', []),
    renderDebounce: 300,
    placeholder: 'No content provided.',
    loadingPlaceholder: 'Loading...',
});

const isRendering = ref(true);
const renderedMarkdownContent = ref('');

watch(() => props.modelValue, async (newValue) => {
    isRendering.value = true;
    renderedMarkdownContent.value = await Markdown.Render(newValue || '', props.sanitize, props.filter);
    isRendering.value = false;
}, { immediate: true });
</script>

<template>
    <div class="overflow-hidden w-full">
        <p v-if="isRendering || loading" class="text-sm italic text-gray-500">{{ loadingPlaceholder }}</p>
        <div
            v-else-if="modelValue"
            v-html="renderedMarkdownContent"
            class="max-w-none md-content overflow-y-auto overflow-x-hidden"
            :style="{ maxHeight }"
        />
        <p v-else class="text-sm italic text-gray-500">{{ placeholder }}</p>
    </div>
</template>

<style scoped>
.md-content {
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;

    :deep(*) {
        box-sizing: content-box;
    }

    :deep(p) {
        font-size: 0.875rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    :deep(a) {
        @apply text-highlight;

        &:hover {
            text-decoration: underline;
        }
    }

    :deep(ul),
    :deep(ol) {
        list-style-position: outside;
        list-style-type: disc;
        margin-top: 0.5rem;
        padding-left: 1.25rem;
    }

    :deep(ol) {
        list-style-type: decimal;
    }

    :deep(li) {
        font-size: 0.875rem;
        margin-bottom: 0.15rem;
        padding-left: 0.25rem;

        & > ul,
        & > ol {
            margin-top: 0.15rem;
            margin-bottom: 0;
        }
    }

    :deep(h1) {
        font-size: 2.25rem;
        line-height: 2.5rem;
        margin-bottom: 1rem;
    }

    :deep(h2) {
        font-size: 1.5rem;
        line-height: 2rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    :deep(h3) {
        font-size: 1.125rem;
        line-height: 1.75rem;
    }

    :deep(h4) {
        font-size: 1rem;
        line-height: 1.5rem;
    }

    :deep(img) {
        max-width: 100%;
        height: auto;
    }

    :deep(pre) {
        @apply bg-dark-2;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        overflow-x: auto;

        code {
            @apply bg-dark-2;
            padding: 0;
        }
    }

    :deep(code) {
        @apply bg-dark-1 text-dark-text;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-weight: 700;
        border-radius: 0.375rem;
        padding: 0.25rem 0.5rem;
    }

    :deep(table) {
        width: 100%;
        margin-top: 0.5rem;

        img {
            margin-top: 0;
            display: inline;
        }

        th,
        td {
            padding: 0.5rem;
        }

        tr {
            &:nth-child(odd) { @apply bg-dark-2; }
            &:nth-child(even) { @apply bg-dark-1; }
        }

        th {
            @apply bg-dark-2 border-dark-1;
            border-bottom-width: 2px;
            border-bottom-style: solid;
        }
    }

    :deep(blockquote) {
        @apply bg-dark-2 border-highlight;
        padding: 1.5rem;
        border-radius: 1rem;
        border-width: 2px;
        border-style: solid;
        margin-bottom: 1.15rem;

        &.blockquote-warning { @apply border-yellow; }
        &.blockquote-tip { @apply border-green; }
        &.blockquote-danger { @apply border-red; }

        &.blockquote-note { @apply border-cyan; }
        &.blockquote-important { @apply border-highlight; }
        &.blockquote-caution { @apply border-red; }

        .blockquote-label {
            @apply text-dark-text;
            display: block;
            font-weight: 700;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
    }

    :deep(.footnote-ref) {
        @apply text-highlight;
        text-decoration: none;
        font-size: 0.75rem;
        vertical-align: super;
    }

    :deep(ol li[id^="note-"]) {
        font-size: 0.875rem;
        opacity: 0.7;
    }

    :deep(details) {
        @apply bg-dark-1;
        border-radius: 0.375rem;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    :deep(summary) {
        @apply text-gray;
        cursor: pointer;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        transition: color 150ms;
        user-select: none;

        &:hover {
            @apply text-white;
        }
    }
}
</style>