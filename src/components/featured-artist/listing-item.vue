<script setup lang="ts">
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import Assets from '~/utils/assets';

const props = defineProps<{
    artist: FeaturedArtist;
}>();

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
    <NuxtLink :to="'/artists/' + artist.id">
        <div class="flex flex-col items-center rounded-xl bg-white bg-opacity-0 transition-all hover:bg-opacity-20 active:scale-90">
            <div class="size-40">
                <LoadingImage class="size-full rounded-xl" :src="Assets.ArtistIcon(artist)" :alt="artist.name" />
            </div>
            <div class="flex flex-col items-center justify-center py-3">
                <h3 class="text-base leading-none">{{ artist.name }}</h3>
                <p class="text-xs opacity-80">{{ GetSongCount() }} songs</p>
            </div>
        </div>
    </NuxtLink>
</template>
