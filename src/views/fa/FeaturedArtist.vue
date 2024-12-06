<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';

import LoadingImage from '@/components/LoadingImage.vue';

import FeaturedAlbum from './components/FeaturedAlbum.vue';

import API from '../../utils/API';
import Utils from '@/utils/Utils';
import { StartLoading, StopLoading } from '@/utils/Loading';

const route = useRoute();
const id = route.params.id;

const react = reactive<{
    current: string[]
    artist?: FeaturedArtist
}>({
    current: ['', '']
});

Utils.SetTitle('loading...');

StartLoading();

await API.PerformGet<FeaturedArtist>('/artists/' + id).then(res => {
    const artist = res.data;
    react.artist = artist;

    Utils.SetTitle(`${artist?.name} - featured artist`);

    StopLoading();
}).catch(err => {
    StopLoading();
    console.log(err);
});

function PlayTrack(album: string, track: string) {
    // stop all other songs
    const audioElements = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
        const el = audioElements[i]
        el.volume = 0;
        el.currentTime = el.duration;
        el.pause();
    }

    const audio = document.getElementById(`audio-${album}-${track}`) as HTMLAudioElement
    if (!audio) return

    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();

    react.current = [album, track]
}

function PauseTrack(album: string, track: string) {
    const audio = document.getElementById(`audio-${album}-${track}`) as HTMLAudioElement
    if (!audio) return

    audio.volume = 0;
    audio.currentTime = audio.duration;
}

function TrackFinished(album: string, track: string) {
    if (react.current[0] != album || react.current[1] != track)
        return

    react.current = ['', '']
}

function downloadSong(album: string, track: string) {
    alert(`Downloading is still in development!`);
}
</script>

<template>
    <div v-if="react.artist" class="w-full flex rounded-2xl bg-dark-2 text-left">
        <div class="w-80 min-w-80 bg-dark-3 rounded-2xl h-fit">
            <div class="size-80">
                <LoadingImage class="size-full object-cover rounded-2xl"
                    :src="'/featured-artist/' + react.artist.id + '/icon.png'" alt="Artist Image" />
            </div>
            <div class="w-full h-fit">

            </div>
        </div>
        <div class="w-full p-5">
            <div class="w-full flex flex-col mb-8">
                <h1 class="text-5xl">{{ react.artist.name }}</h1>
                <p class="text-base">{{ react.artist.description }}</p>
            </div>

            <div class="w-full flex flex-col items-center content-center gap-5">
                <FeaturedAlbum @play="(id, state) => state ? PauseTrack(album.id, id) : PlayTrack(album.id, id)"
                    :artist="react.artist" :album="album" v-for="album in react.artist.albums"
                    :current="react.current" />
            </div>

            <!--audio section-->

            <div class="hidden">
                <div v-for="album in react.artist.albums">
                    <audio v-for="track in album.tracks" @ended="TrackFinished(album.id, track.id)"
                        @pause="TrackFinished(album.id, track.id)" :id="`audio-${album.id}-${track.id}`"
                        :src="`/featured-artist/${react.artist.id}/${album.id}/${track.id}/preview.ogg`"></audio>
                </div>
            </div>
        </div>
    </div>
</template>