<script setup lang="ts">
import type { FeaturedArtistAlbum } from '@/api/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '@/api/models/artists/FeaturedArtistTrack';

defineProps<{
    album: FeaturedArtistAlbum
    track: FeaturedArtistTrack
    playing?: boolean
}>()

const emit = defineEmits<{
    (e: 'play', state: boolean): void
}>();
</script>

<template>
    <div class="group w-full h-10 flex flex-row px-3 items-center justify-between rounded-lg" :style="{ backgroundColor: album.colors.bg2 }">
        <div class="flex items-center">
            <i class="fa opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-5" :class="{
                'fa-play': !playing,
                'fa-pause': playing
            }" @click="emit('play', playing || false)"></i>
            <p>{{ track.name }}</p>
        </div>
        <div class="flex items-center text-right">
            <div class="text-xs leading-none" :style="{ color: album.colors.text2 }">
                <p>{{ track.bpm }}bpm <span class="text-fa-text">{{ track.length }}</span></p>
                <p>{{ track.genre }}</p>
            </div>
            <i class="fa fa-download opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-6"></i>
        </div>
    </div>
</template>