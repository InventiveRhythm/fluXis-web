<script setup lang="ts">
import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import RoundedButton from '@/components/RoundedButton.vue';
import ErrorContainer from '@/components/status/ErrorContainer.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';
import API from '@/utils/API';
import { reactive, ref } from 'vue';
import AddArtistPanel from './add/AddArtistPanel.vue';

const addPanel = ref<InstanceType<typeof AddArtistPanel>>();

const react = reactive<{
    loading: boolean;
    error?: string;
    artists: FeaturedArtist[];
}>({
    loading: true,
    artists: []
});

await API.PerformGet<FeaturedArtist[]>('/artists')
    .then((res) => {
        if (!res.IsSuccess() || !res.data) throw new APIError(res);

        react.artists = res.data;
    })
    .catch((e) => (react.error = e.message))
    .finally(() => (react.loading = false));

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
    <div class="flex flex-col gap-4" v-if="!react.loading && !react.error">
        <div class="flex flex-row justify-between items-center">
            <p class="text-2xl">Featured Artists</p>
            <RoundedButton class="px-4 py-2" @click="() => addPanel?.Open()">
                <i class="fa fa-plus"></i> Add
            </RoundedButton>
        </div>
        <RouterLink
            :to="`/management/artists/${artist.id}`"
            class="w-full flex flex-row p-4 bg-dark-2 rounded-xl gap-4 hover:bg-dark-3"
            v-for="artist in GetSorted(react.artists)"
        >
            <img
                class="size-24 rounded-md"
                :src="`/featured-artist/${artist.id}/icon.png`"
                :alt="`${artist.id} icon`"
            />
            <div class="flex-1 flex flex-col justify-center">
                <p class="text-2xl">{{ artist.name }}</p>
                <p class="text-lg opacity-80">{{ GetSongCount(artist) }} songs</p>
            </div>
        </RouterLink>
    </div>
    <ErrorContainer v-else-if="react.error" :text="react.error" />
    <LoadingContainer v-else />

    <AddArtistPanel ref="addPanel" @added="(artist) => react.artists.push(artist)" />
</template>
