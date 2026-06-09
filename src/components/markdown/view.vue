<script setup lang="ts">
import { MarkdownTabGroup, MarkdownTabPanel, NuxtLink } from '#components';
import highlight from '@comark/nuxt/plugins/highlight';
import math, { Math } from '@comark/nuxt/plugins/math';
import security from '@comark/nuxt/plugins/security';
import csharp from '@shikijs/langs/csharp';
import lua from '@shikijs/langs/lua';
import githubDark from '@shikijs/themes/github-dark';

defineProps<{
    content: string;
}>();

const components: Record<string, any> = {
    a: NuxtLink,
    'tab-group': MarkdownTabGroup,
    'tab-panel': MarkdownTabPanel,
    math: Math
};

const plugins: any[] = [
    security({
        blockedTags: ['script', 'style', 'iframe']
    }),
    math(),
    highlight({
        themes: { dark: githubDark, light: githubDark },
        languages: [csharp, lua]
    })
];
</script>

<template>
    <comark class="md-content" :components="components" :plugins="plugins">{{ markdown.Clean(content) }}</comark>
</template>

<style lang="scss">
.md-content {
    @apply max-w-full;

    * {
        @apply box-content;
    }

    h1 {
        @apply mb-4 scroll-m-24 text-4xl;
    }

    h2 {
        @apply mb-4 mt-8 scroll-m-24 text-2xl;
    }

    h3 {
        @apply scroll-m-24 text-lg;
    }

    h4 {
        @apply text-base;
    }

    a {
        @apply text-highlight hover:underline;
    }

    h1,
    h2,
    h3,
    h4 > a {
        @apply text-dark-text;
    }

    > p {
        @apply my-4 text-sm;
    }

    ul,
    ol {
        @apply mt-2 list-inside list-disc;

        li {
            @apply text-sm;
        }
    }

    pre {
        @apply my-2 overflow-x-auto rounded-lg bg-dark-2 p-4;

        code {
            @apply bg-dark-2 p-0;
        }
    }

    code {
        @apply rounded-md bg-dark-2 px-2 py-1 font-mono font-bold text-dark-text;
    }

    table {
        @apply mt-2 w-full;

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
            @apply border-b-2 border-dark-1 bg-dark-2;
        }
    }

    blockquote {
        @apply rounded-2xl border-2 border-highlight bg-dark-2 p-6;
    }
}
</style>
