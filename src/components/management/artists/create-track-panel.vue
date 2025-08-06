<script setup lang="ts">
import type IconTextbox from '~/components/icon-textbox.vue';
import type { APIResponseErrors } from '~/models/APIResponse';
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '~/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '~/models/artists/FeaturedArtistTrack';
import API from '~~/src/utils/api';

const props = defineProps<{
    artist: FeaturedArtist;
}>();

const emit = defineEmits<{
    (e: 'added', album: FeaturedArtistAlbum, track: FeaturedArtistTrack): void;
}>();

const open = ref<boolean>(false);
const album = ref<FeaturedArtistAlbum>();
const errors = ref<APIResponseErrors>();

const id = ref<InstanceType<typeof IconTextbox>>();
const name = ref<InstanceType<typeof IconTextbox>>();
const length = ref<InstanceType<typeof IconTextbox>>();
const bpm = ref<InstanceType<typeof IconTextbox>>();
const genre = ref<InstanceType<typeof IconTextbox>>();

function Open(alb: FeaturedArtistAlbum) {
    album.value = alb;
    open.value = true;
}

async function Perform() {
    var { data: track, error } = await API.PerformPost<FeaturedArtistTrack>(`/artists/${props.artist.id}/albums/${album.value?.id}/tracks`, {
        id: id.value?.input?.value,
        name: name.value?.input?.value,
        length: length.value?.input?.value,
        bpm: bpm.value?.input?.value,
        genre: genre.value?.input?.value,
    });
    
    if (error) errors.value = error;
    if (!track) return;

    emit('added', album.value as FeaturedArtistAlbum, track as FeaturedArtistTrack);
}

defineExpose({ Open });
</script>

<template>
    <Panel title="Create Track" :error="errors?._request" :open="open" @close="open = false">
        <IconTextbox ref="id" icon="id-card-clip" placeholder="Unique ID" :error="errors?.id" />
        <IconTextbox ref="name" icon="font" placeholder="Display Name" :error="errors?.name" />
        <div class="grid grid-cols-2 gap-4">
            <IconTextbox ref="length" icon="clock" placeholder="Length" :error="errors?.length" />
            <IconTextbox ref="bpm" icon="stopwatch" placeholder="BPM" :error="errors?.bpm" />
        </div>
        <IconTextbox ref="genre" icon="font" placeholder="Genre" :error="errors?.genre" />
        <Button class="w-fit bg-dark-2 px-4 py-2" @click="Perform">Create</Button>
    </Panel>
</template>
