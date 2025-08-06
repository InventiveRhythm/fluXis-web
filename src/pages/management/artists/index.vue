<script setup lang="ts">
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import API from '~/utils/api';
import Assets from '~/utils/assets';

definePageMeta({
    layout: 'management',
    pageTransition: false
});

const { data: artists } = await API.PerformGet<FeaturedArtist[]>('/artists');

function GetSorted(list: FeaturedArtist[]) {
    return list.sort((a, b) => a.name.localeCompare(b.name));
}

function GetSongCount(artist: FeaturedArtist) {
    let count = 0;

    if (!artist || !artist.albums) return count;

    for (let i = 0; i < artist.albums.length; i++) {
        count += artist.albums[i].tracks.length;
    }

    return count;
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <div class="flex flex-row items-center justify-between">
            <p class="text-2xl">Featured Artists</p>
            <Button class="bg-dark-2 px-4 py-2"><i class="fa fa-plus"></i> Add</Button>
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <NuxtLink
                :to="`/management/artists/${artist.id}`"
                class="flex w-full flex-row items-center gap-3 rounded-xl bg-dark-2 p-4 hover:bg-dark-3"
                v-for="artist in GetSorted(artists)"
                v-if="artists"
            >
                <img class="size-16 rounded-md" :src="Assets.ArtistIcon(artist)" :alt="`${artist.id} icon`" />
                <div class="flex flex-1 flex-col justify-center gap-1">
                    <p class="text-xl leading-none">{{ artist.name }}</p>
                    <p class="leading-none opacity-80">{{ GetSongCount(artist) }} songs</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
