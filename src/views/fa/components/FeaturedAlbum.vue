<script setup lang="ts">
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '@/api/models/artists/FeaturedArtistAlbum';

import FeaturedTrack from './FeaturedTrack.vue';

import LoadingImage from '@/components/LoadingImage.vue';

const props = defineProps<{
    current: string[];
    artist: FeaturedArtist;
    album: FeaturedArtistAlbum;
}>();

const emit = defineEmits<{
    (e: 'play', id: string, state: boolean): void;
    (e: 'download', id: string): void;
}>();

function CoverImage() {
    return '/featured-artist/' + props.artist.id + '/' + props.album.id + '/cover.png';
}

function ColorStyle() {
    const col = props.album.colors;
    return `--album-bg: ${col.bg}; --album-bg2: ${col.bg2}; --album-text: ${col.text}; --album-text2: ${col.text2}; --album-accent: ${col.accent}`;
}
</script>

<template>
    <div
        class="w-full flex flex-col rounded-lg overflow-hidden"
        :style="{
            backgroundColor: album.colors.bg,
            color: album.colors.text
        }"
    >
        <div class="overlap-grid w-full h-20 rounded-lg overflow-hidden">
            <LoadingImage class="object-cover scale-125 blur" :src="CoverImage()" :alt="`${album.name} album cover`" />
            <div class="section-gradient opacity-60"></div>
            <div
                class="section-gradient-custom opacity-40"
                :style="{ '--section-gradient-col': album.colors.accent }"
            ></div>
            <div class="flex flex-row">
                <div class="flex-1 flex flex-row gap-3 items-center">
                    <div class="size-20">
                        <LoadingImage
                            class="object-cover rounded-lg"
                            :src="CoverImage()"
                            :alt="`${album.name} album cover`"
                        />
                    </div>
                    <div class="drop-shadow-text">
                        <p class="text-xl leading-6">
                            {{ album.name }}
                            <span class="opacity-80 text-sm" v-if="album.release.year">{{ album.release.year }}</span>
                        </p>
                        <p class="text-base leading-5 opacity-80">{{ album.tracks.length }} songs</p>
                    </div>
                </div>
                <slot name="header"></slot>
            </div>
        </div>
        <div class="w-full flex flex-col p-2 gap-1">
            <FeaturedTrack
                :playing="current[0] == album.id && current[1] == track.id"
                @play="(state) => emit('play', track.id, state)"
                @download="emit('download', track.id)"
                :album="album"
                :track="track"
                v-for="track in album.tracks"
            />
        </div>
    </div>
</template>
