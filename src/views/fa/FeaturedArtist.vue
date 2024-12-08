<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';

import LoadingImage from '@/components/LoadingImage.vue';

import FeaturedArtistSocial from './components/FeaturedArtistSocial.vue';
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
    <div v-if="react.artist" class="w-full flex text-left">
        <div class="w-80 min-w-80 bg-dark-3 rounded-2xl h-fit">
            <div class="size-80">
                <LoadingImage class="size-full object-cover rounded-2xl"
                    :src="'/featured-artist/' + react.artist.id + '/icon.png'" alt="Artist Image" />
            </div>
            <div class="flex flex-row flex-wrap h-fit w-full has-[div]:p-2">
                <a v-if="react.artist.youtube" class="min-w-16 flex-1" target="_blank" :href="`https://youtube.com/${react.artist.youtube}`"><FeaturedArtistSocial class="bg-social-youtube text-social-youtube" name="YouTube" /></a>
                <a v-if="react.artist.spotify" class="min-w-16 flex-1" target="_blank" :href="`https://open.spotify.com/artist/${react.artist.spotify}`"><FeaturedArtistSocial class="bg-social-spotify text-social-spotify" name="Spotify" /></a>
                <a v-if="react.artist.soundcloud" class="min-w-16 flex-1" target="_blank" :href="`https://soundcloud.com/${react.artist.soundcloud}`"><FeaturedArtistSocial class="bg-social-soundcloud text-social-soundcloud" name="SoundCloud" /></a>
                <a v-if="react.artist.twitter" class="min-w-16 flex-1" target="_blank" :href="`https://twitter.com/${react.artist.twitter}`"><FeaturedArtistSocial class="bg-social-twitter text-social-twitter" name="Twitter" /></a>
                <RouterLink :to="`/u/${react.artist.fluxis}`" class="min-w-16 flex-1" v-if="react.artist.fluxis"><FeaturedArtistSocial class="bg-primary text-primary" base="https://fluxis.flux.moe/u/" name="fluXis" :id="'1'" /></RouterLink>
            </div>
        </div>
        <div class="w-full px-5">
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