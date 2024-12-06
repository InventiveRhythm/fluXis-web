<script setup lang="ts">
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';

import LoadingImage from '@/components/LoadingImage.vue';

const props = defineProps<{
    artist: FeaturedArtist
}>()

function GetSongCount() {
    let count = 0;

    if (!props.artist || !props.artist.albums) return count;

    for (let i = 0; i < props.artist.albums.length; i++) {
        count += props.artist.albums[i].tracks.length;
    }

    return count;
}
</script>

<template>
    <RouterLink :to="'/artist/' + artist.id">
        <div
            class="flex flex-col items-center bg-white bg-opacity-0 hover:bg-opacity-20 active:scale-90 rounded-xl transition-all">
            <div class="size-40">
                <LoadingImage class="size-full rounded-xl" :src="`/featured-artist/${artist.id}/icon.png`" :alt="artist.name" />
            </div>
            <div class="flex flex-col py-3 justify-center items-center">
                <h3 class="text-base leading-none">{{ artist.name }}</h3>
                <p class="text-xs opacity-80">{{ GetSongCount() }} songs</p>
            </div>
        </div>
    </RouterLink>
</template>