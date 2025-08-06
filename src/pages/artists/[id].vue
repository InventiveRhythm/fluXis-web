<script setup lang="ts">
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '~/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '~/models/artists/FeaturedArtistTrack';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const current = ref(['', '']);

const { data: artist, error } = await API.PerformGet<FeaturedArtist>(`/artists/${useRoute().params.id}`);

if (artist) {
    useSeoMeta({
        title: `${artist.name} - featured artist`
    });
}

function PlayTrack(album: string, track: string) {
    // stop all other songs
    const audioElements = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
        const el = audioElements[i] as HTMLAudioElement;

        if (!el.duration) continue;

        el.volume = 0;
        el.currentTime = el.duration;
        el.pause();
    }

    const audio = document.getElementById(`audio-${album}-${track}`) as HTMLAudioElement;
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();

    current.value = [album, track];
}

function PauseTrack(album: string, track: string) {
    const audio = document.getElementById(`audio-${album}-${track}`) as HTMLAudioElement;
    if (!audio) return;

    audio.volume = 0;
    audio.currentTime = audio.duration;
}

function TrackFinished(album: string, track: string) {
    if (current.value[0] != album || current.value[1] != track) return;

    current.value = ['', ''];
}

function DownloadTrack(album: FeaturedArtistAlbum, track: FeaturedArtistTrack) {
    if (!API.CurrentUser.value) {
        alert('Log in to download songs!');
        return;
    }

    window.open(Assets.ArtistTrack(artist!, album, track, false), '_blank');
}
</script>

<template>
    <div v-if="artist" class="w-fit-mobile mx-auto flex w-full flex-col items-center gap-5 text-left md:flex-row md:items-start">
        <div class="h-fit w-80 min-w-80 rounded-2xl bg-dark-3">
            <LoadingImage class="size-80 rounded-2xl object-cover" :src="Assets.ArtistIcon(artist)" alt="Artist Image" />
            <div class="flex h-fit w-full flex-row flex-wrap *:min-w-16 *:flex-1 has-[div]:p-2">
                <a v-if="artist.youtube" target="_blank" :href="`https://youtube.com/${artist.youtube}`"
                    ><FeaturedArtistSocial class="bg-social-youtube text-social-youtube" name="YouTube"
                /></a>
                <a v-if="artist.spotify" target="_blank" :href="`https://open.spotify.com/artist/${artist.spotify}`"
                    ><FeaturedArtistSocial class="bg-social-spotify text-social-spotify" name="Spotify"
                /></a>
                <a v-if="artist.soundcloud" target="_blank" :href="`https://soundcloud.com/${artist.soundcloud}`"
                    ><FeaturedArtistSocial class="bg-social-soundcloud text-social-soundcloud" name="SoundCloud"
                /></a>
                <a v-if="artist.twitter" target="_blank" :href="`https://twitter.com/${artist.twitter}`"
                    ><FeaturedArtistSocial class="bg-social-twitter text-social-twitter" name="Twitter"
                /></a>
                <NuxtLink :to="`/u/${artist.fluxis}`" v-if="artist.fluxis"
                    ><FeaturedArtistSocial class="bg-primary text-primary" base="https://fluxis.flux.moe/u/" name="fluXis" :id="'1'"
                /></NuxtLink>
            </div>
        </div>

        <div class="w-full">
            <div class="mb-8 flex w-full flex-col">
                <h1 class="text-5xl">{{ artist.name }}</h1>
                <p class="mt-2 text-base" v-if="artist.description">{{ artist.description }}</p>
            </div>

            <div class="flex w-full flex-col content-center items-center gap-5">
                <FeaturedArtistAlbum
                    @play="(id, state) => (state ? PauseTrack(album.id, id) : PlayTrack(album.id, id))"
                    @download="(track) => DownloadTrack(album, track)"
                    :artist="artist"
                    :album="album"
                    v-for="album in artist.albums"
                    :current="current"
                />
            </div>

            <!--audio section-->

            <div class="hidden">
                <div v-for="album in artist.albums">
                    <audio
                        v-for="track in album.tracks"
                        @ended="TrackFinished(album.id, track.id)"
                        @pause="TrackFinished(album.id, track.id)"
                        :id="`audio-${album.id}-${track.id}`"
                        :src="Assets.ArtistTrack(artist, album, track, true)"
                        preload="none"
                    ></audio>
                </div>
            </div>
        </div>
    </div>
    <ErrorContainer :text="error?._request" v-else-if="error" />
</template>
