<script setup lang="ts">
import { APINewsType, type APINewsPost } from '~/models/other/APINewsPost';

defineProps<{
    post: APINewsPost;
}>();
</script>

<template>
    <NuxtLink
        :to="`/news/${post.id}`"
        class="m-3 flex h-64 min-w-80 flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl bg-dark-2 transition-all hover:bg-dark-3 active:scale-95"
    >
        <div class="overlap-grid h-40 overflow-hidden rounded-2xl bg-dark-3">
            <LoadingImage class="w-full object-cover" :src="post.image" />
            <div class="flex size-full flex-row items-end justify-between p-2 text-2xs">
                <div class="rounded-full bg-dark-2 px-3 py-1">
                    <p class="opacity-75">{{ formatting.Date(post.time) }}</p>
                </div>
                <div class="rounded-full bg-dark-2 px-3 py-1">
                    <p class="opacity-75" v-if="post.type == APINewsType.News">NEWS</p>
                    <p class="opacity-75" v-else-if="post.type == APINewsType.Notice">NOTICE</p>
                </div>
            </div>
        </div>
        <div class="p-3 text-left">
            <p class="text-lg">{{ post.title }}</p>
            <p class="line-clamp-2 text-sm opacity-60">{{ post.blurb }}</p>
        </div>
    </NuxtLink>
</template>
