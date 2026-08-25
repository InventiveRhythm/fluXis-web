<script setup lang="ts">
const route = useRoute();
const path = route.params.article ? `/${(<string[]>route.params.article).join('/')}` : 'home';

const { data } = await useFetch<string>(`${api.AssetsUrl}/wiki/${path}/en.md`);
</script>

<template>
    <div class="w-full text-left">
        <MarkdownView :content="data || 'Page not found.\n\n[Return to Home](/wiki)'"></MarkdownView>
    </div>
</template>
