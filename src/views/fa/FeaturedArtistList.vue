<script setup lang="ts">
import { reactive } from 'vue';

import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';

import LoadingContainer from '@/components/status/LoadingContainer.vue';
import ErrorContainer from '@/components/status/ErrorContainer.vue';

import FeaturedArtistListItem from './components/FeaturedArtistListItem.vue';

import API from '@/utils/API';
import Utils from '@/utils/Utils';

const react = reactive<{
    artists?: FeaturedArtist[]
    loading: boolean
    error?: string
}>({ loading: true });

Utils.SetTitle('featured artist listing');

API.PerformGet<FeaturedArtist[]>('/artists').then(res => {
    if (!res.IsSuccess() || !res.data)
        throw new APIError(res)

    // Sort by name
    res.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    });

    react.artists = res.data;
}).catch(err => react.error = err.message).finally(() => react.loading = false);
</script>

<template>
    <div class="w-full flex flex-col">
        <h1 class="text-3xl">Featured Artist Listing</h1>
        <h3 class="text-base mb-4">
            Featured Artists have given us permission (or we bought licenses) to use
            their songs in fluXis.
        </h3>

        <LoadingContainer v-if="react.loading" />
        <ErrorContainer :text="react.error" v-if="react.error" />

        <div class="flex justify-center gap-4 flex-wrap items-start content-start" v-if="react.artists">
            <FeaturedArtistListItem :artist="artist" v-for="artist in react.artists" />
        </div>
    </div>
</template>