<script setup lang="ts">
import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '@/api/models/artists/FeaturedArtistAlbum';
import RoundedButton from '@/components/RoundedButton.vue';
import ErrorContainer from '@/components/status/ErrorContainer.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';
import API from '@/utils/API';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import AddAlbumPanel from './add/AddAlbumPanel.vue';
import FeaturedAlbum from '@/views/fa/components/FeaturedAlbum.vue';
import AddSongPanel from './add/AddSongPanel.vue';
import type { FeaturedArtistTrack } from '@/api/models/artists/FeaturedArtistTrack';
import EditAlbumPanel from './edit/EditAlbumPanel.vue';
import EditSongPanel from './edit/EditSongPanel.vue';

const albumAddPanel = ref<InstanceType<typeof AddAlbumPanel>>();
const albumEditPanel = ref<InstanceType<typeof EditAlbumPanel>>();
const songAddPanel = ref<InstanceType<typeof AddSongPanel>>();
const songEditPanel = ref<InstanceType<typeof EditSongPanel>>();

const route = useRoute();
const id = route.params.id;

const react = reactive<{
    loading: boolean;
    error?: string;
    artist?: FeaturedArtist;
}>({
    loading: true
});

API.PerformGet<FeaturedArtist>(`/artists/${id}`)
    .then((res) => {
        if (!res.IsSuccess() || !res.data) throw new APIError(res);

        react.artist = res.data;
        SortAlbums();
    })
    .catch((e) => {
        react.error = e.message;
        console.error(e);
    })
    .finally(() => (react.loading = false));

function AddAlbum(album: FeaturedArtistAlbum) {
    react.artist?.albums.push(album);
    SortAlbums();
}

function AddSong(album: FeaturedArtistAlbum, track: FeaturedArtistTrack) {
    album.tracks.push(track);
    SortSongs(album);
}

function SortAlbums() {
    if (!react.artist) return;
    react.artist.albums.sort((a, b) => {
        var rA = a.release;
        var rB = b.release;

        if (rA.year != rB.year) return rA.year > rB.year ? -1 : 1;
        if (rA.month != rB.month) return rA.month > rB.month ? -1 : 1;
        return rA.day > rB.day ? -1 : 1;
    });
}

function SortSongs(album: FeaturedArtistAlbum) {
    album.tracks.sort((a, b) => a.name.localeCompare(b.name));
}
</script>

<template>
    <div class="flex flex-col gap-4" v-if="react.artist">
        <div class="flex flex-row justify-between items-center">
            <p class="text-2xl">
                <span class="opacity-80 text-base">{{ react.artist.name }} /</span> Albums
            </p>
            <RoundedButton class="px-4 py-2" @click="albumAddPanel?.Open"><i class="fa fa-plus"></i> Add</RoundedButton>
        </div>

        <div class="flex flex-col gap-4">
            <FeaturedAlbum
                :current="[]"
                @play="(id, _) => songEditPanel?.Open(album, album.tracks.find(x => x.id == id) as FeaturedArtistTrack)"
                :artist="react.artist"
                :album="album"
                v-for="album in react.artist.albums"
            >
                <template v-slot:header>
                    <div class="grid grid-rows-2 w-8">
                        <div
                            class="flex items-center justify-center hover:bg-white hover:bg-opacity-20"
                            @click="albumEditPanel?.Open(album)"
                        >
                            <i class="text-sm fa fa-pencil"></i>
                        </div>
                        <div
                            class="flex items-center justify-center hover:bg-white hover:bg-opacity-20"
                            @click="songAddPanel?.Open(album)"
                        >
                            <i class="text-sm fa fa-plus"></i>
                        </div>
                    </div>
                </template>
            </FeaturedAlbum>
        </div>

        <AddAlbumPanel ref="albumAddPanel" :artist="react.artist" @added="AddAlbum" />
        <AddSongPanel ref="songAddPanel" :artist="react.artist" @added="AddSong" />

        <EditAlbumPanel ref="albumEditPanel" :artist="react.artist" />
        <EditSongPanel ref="songEditPanel" :artist="react.artist" />
    </div>
    <ErrorContainer v-else-if="react.error" />
    <LoadingContainer v-else />
</template>
