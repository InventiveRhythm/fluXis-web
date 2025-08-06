<script setup lang="ts">
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '~/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '~/models/artists/FeaturedArtistTrack';
import Assets from '~/utils/assets';

defineProps<{
    current: string[];
    artist: FeaturedArtist;
    album: FeaturedArtistAlbum;
    leftIcon?: string;
    rightIcon?: string;
}>();

const emit = defineEmits<{
    (e: 'play', id: string, state: boolean): void;
    (e: 'download', track: FeaturedArtistTrack): void;
}>();
</script>

<template>
    <div
        class="flex w-full flex-col overflow-hidden rounded-lg"
        :style="{
            backgroundColor: album.colors.bg,
            color: album.colors.text
        }"
    >
        <div class="overlap-grid h-20 w-full overflow-hidden rounded-lg">
            <LoadingImage class="scale-125 object-cover blur" :src="Assets.ArtistCover(artist, album)" :alt="`${album.name} album cover`" />
            <div class="section-gradient opacity-60"></div>
            <div class="section-gradient-custom opacity-40" :style="{ '--section-gradient-col': album.colors.accent }"></div>
            <div class="flex flex-row">
                <div class="flex flex-1 flex-row items-center gap-3">
                    <LoadingImage class="size-20 rounded-lg object-cover" :src="Assets.ArtistCover(artist, album)" :alt="`${album.name} album cover`" />
                    <div>
                        <p class="text-xl leading-6">
                            {{ album.name }}
                            <span class="text-sm opacity-80" v-if="album.release.year">{{ album.release.year }}</span>
                        </p>
                        <p class="text-base leading-5 opacity-80">{{ album.tracks.length }} songs</p>
                    </div>
                </div>
                <slot name="header"></slot>
            </div>
        </div>
        <div class="flex w-full flex-col gap-1 p-2">
            <FeaturedArtistTrack
                :playing="current[0] == album.id && current[1] == track.id"
                @play="(state) => emit('play', track.id, state)"
                @download="emit('download', track)"
                :album="album"
                :track="track"
                :left-icon="leftIcon"
                :right-icon="rightIcon"
                v-for="track in album.tracks"
            />
        </div>
    </div>
</template>
