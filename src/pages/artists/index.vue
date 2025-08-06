<script setup lang="ts">
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import API from '~/utils/api';

const { data, error } = await API.PerformGet<FeaturedArtist[]>('/artists');

let artists: FeaturedArtist[], unofficial: FeaturedArtist[];

if (data) {
    data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    });

    artists = data.filter((x) => !x.unofficial);
    unofficial = data.filter((x) => x.unofficial);
}

useSeoMeta({
    title: 'featured artist listing'
});
</script>

<template>
    <div class="flex w-full flex-col items-center" v-if="artists">
        <h1 class="text-3xl">Featured Artist Listing</h1>
        <h3 class="mb-4 text-base">Featured Artists have given us permission (or we bought licenses) to use their songs in fluXis.</h3>

        <div class="flex flex-wrap content-start items-start justify-center gap-4" v-if="artists">
            <FeaturedArtistListingItem :artist="artist" v-for="artist in artists" />
        </div>

        <template v-if="unofficial?.length">
            <div class="my-8 h-1 w-1/2 bg-dark-2"></div>
            <h1 class="text-3xl">"Unofficial" Artists</h1>
            <h3 class="mb-4 text-base">These artists didn't give us explicit permission, but their music is avaiable to use.</h3>

            <div class="flex flex-wrap content-start items-start justify-center gap-4" v-if="unofficial">
                <FeaturedArtistListingItem :artist="artist" v-for="artist in unofficial" />
            </div>
        </template>
    </div>
    <ErrorContainer :error="error?._request" v-else-if="error" />
</template>
