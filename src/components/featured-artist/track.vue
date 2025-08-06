<script setup lang="ts">
import type { FeaturedArtistAlbum } from '~/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '~/models/artists/FeaturedArtistTrack';

defineProps<{
    album: FeaturedArtistAlbum;
    track: FeaturedArtistTrack;
    playing?: boolean;
    leftIcon?: string;
    rightIcon?: string;
}>();

const emit = defineEmits<{
    (e: 'play', state: boolean): void;
    (e: 'download'): void;
}>();
</script>

<template>
    <div class="group flex h-10 w-full flex-row items-center justify-between rounded-lg px-3" :style="{ backgroundColor: album.colors.bg2 }">
        <div class="flex items-center">
            <i
                v-if="!leftIcon"
                class="fa w-0 opacity-0 transition-all group-hover:w-5 group-hover:opacity-100"
                :class="{ 'fa-play': !playing, 'fa-pause': playing }"
                @click="emit('play', playing || false)"
            ></i>
            <i
                class="fa w-0 opacity-0 transition-all group-hover:w-5 group-hover:opacity-100"
                :class="`fa-${leftIcon}`"
                @click="emit('play', playing || false)"
                v-else
            ></i>
            <p>{{ track.name }}</p>
        </div>
        <div class="flex items-center text-right">
            <div class="text-xs leading-none" :style="{ color: album.colors.text2 }">
                <p>
                    {{ track.bpm }}bpm <span class="text-fa-text">{{ track.length }}</span>
                </p>
                <p>{{ track.genre }}</p>
            </div>
            <i :class="`fa fa-${rightIcon || 'download'} w-0 opacity-0 transition-all group-hover:w-6 group-hover:opacity-100`" @click="emit('download')"></i>
        </div>
    </div>
</template>
