<script setup lang="ts">
import { ManagementArtistsCreateTrackPanel, ManagementArtistsEditAlbumPanel } from '#components';
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import API from '~/utils/api';

definePageMeta({
    layout: 'management',
    pageTransition: false
});

const TrackCreatePanel = ref<InstanceType<typeof ManagementArtistsCreateTrackPanel>>();
const AlbumEditPanel = ref<InstanceType<typeof ManagementArtistsEditAlbumPanel>>();

const { data: artist } = await API.PerformGet<FeaturedArtist>(`/artists/${useRoute().params.id}`);
</script>

<template>
    <div class="flex flex-col gap-4 p-4" v-if="artist">
        <div class="flex flex-row items-center justify-between">
            <p class="text-2xl">
                <span class="text-base opacity-80">Featured Artists /</span> {{ artist.name }}
            </p>
            <div class="flex flex-row gap-2">
                <Button class="bg-dark-2 px-4 py-2" @click=""><i class="fa-solid fa-plus"></i> Add</Button>
                <Button class="bg-dark-2 px-4 py-2" @click=""><i class="fa-solid fa-pencil"></i> Edit</Button>
                <NuxtLink :to="`/artists/${artist.id}`">
                    <Button class="bg-dark-2 px-4 py-2" @click=""><i class="fa-solid fa-eye"></i> View</Button>
                </NuxtLink>
            </div>
        </div>
        <div class="grid gap-4">
            <FeaturedArtistAlbum :current="[]" :artist="artist" :album="album" left-icon="pencil" right-icon="trash" v-for="album in artist.albums">
                <template v-slot:header>
                    <div class="grid w-8 grid-rows-2 bg-dark-2/60">
                        <div class="flex items-center justify-center hover:bg-white hover:bg-opacity-20" @click="AlbumEditPanel?.Open(album)">
                            <i class="fa fa-pencil text-xs"></i>
                        </div>
                        <div class="flex items-center justify-center hover:bg-white hover:bg-opacity-20" @click="TrackCreatePanel?.Open(album)">
                            <i class="fa fa-plus text-xs"></i>
                        </div>
                    </div>
                </template>
            </FeaturedArtistAlbum>
        </div>

        <ManagementArtistsCreateTrackPanel :artist="artist" ref="TrackCreatePanel" />
        <ManagementArtistsEditAlbumPanel ref="AlbumEditPanel" />
    </div>
</template>
