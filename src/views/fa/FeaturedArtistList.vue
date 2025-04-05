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
    artists?: FeaturedArtist[];
    unofficial?: FeaturedArtist[];
    loading: boolean;
    error?: string;
}>({ loading: true });

Utils.SetTitle('featured artist listing');

API.PerformGet<FeaturedArtist[]>('/artists')
    .then((res) => {
        if (!res.IsSuccess() || !res.data) throw new APIError(res);

        // Sort by name
        res.data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;

            return 0;
        });

        react.artists = res.data.filter((x) => !x.unofficial);
        react.unofficial = res.data.filter((x) => x.unofficial);
    })
    .catch((err) => (react.error = err.message))
    .finally(() => (react.loading = false));
</script>

<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-3xl">Featured Artist Listing</h1>
        <h3 class="text-base mb-4">
            Featured Artists have given us permission (or we bought licenses) to use their songs in fluXis.
        </h3>

        <LoadingContainer v-if="react.loading" />
        <ErrorContainer :text="react.error" v-if="react.error" />

        <div class="flex justify-center gap-4 flex-wrap items-start content-start" v-if="react.artists">
            <FeaturedArtistListItem :artist="artist" v-for="artist in react.artists" />
        </div>

        <template v-if="react.unofficial?.length">
            <div class="my-8 h-1 w-1/2 bg-dark-2"></div>
            <h1 class="text-3xl">"Unofficial" Artists</h1>
            <h3 class="text-base mb-4">
                These artists didn't give us explicit permission, but their music is avaiable to use.
            </h3>

            <div class="flex justify-center gap-4 flex-wrap items-start content-start" v-if="react.unofficial">
                <FeaturedArtistListItem :artist="artist" v-for="artist in react.unofficial" />
            </div>
        </template>
    </div>
</template>
