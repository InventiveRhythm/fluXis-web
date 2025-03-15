<script setup lang="ts">
import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '@/api/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '@/api/models/artists/FeaturedArtistTrack';
import IconTextBox from '@/components/IconTextBox.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import PanelOverlay from '@/overlays/PanelOverlay.vue';
import API from '@/utils/API';
import { reactive, ref } from 'vue';

const name = ref<InstanceType<typeof IconTextBox>>();
const length = ref<InstanceType<typeof IconTextBox>>();
const bpm = ref<InstanceType<typeof IconTextBox>>();
const genre = ref<InstanceType<typeof IconTextBox>>();

const props = defineProps<{
    artist: FeaturedArtist;
}>();

const react = reactive<{
    open: boolean;
    error?: string;
    album?: FeaturedArtistAlbum;
    track?: FeaturedArtistTrack;
}>({
    open: false
});

function Perform() {
    if (!react.album || !react.track) return;

    var track: FeaturedArtistTrack = {
        id: react.track?.id,
        name: '',
        length: '',
        bpm: '',
        genre: ''
    };

    API.PerformPatch<FeaturedArtistTrack>(
        `/artists/${props.artist.id}/albums/${react.album?.id}/tracks/${react.track?.id}`,
        track
    )
        .then((res) => {
            if (!res.IsSuccess() || !res.data) throw new APIError(res);

            Object.assign(react.track!, res.data);
            Close();
        })
        .catch((ex) => {
            react.error = ex.message;
            console.error(ex);
        });
}

function Open(album: FeaturedArtistAlbum, track: FeaturedArtistTrack) {
    react.album = album;
    react.track = track;
    react.open = true;
    react.error = '';
}

function Close() {
    react.open = false;
}

defineExpose({ Open });
</script>

<template>
    <PanelOverlay
        :title="`Edit Track '${react.track?.id}'`"
        :error="react.error"
        :open="react.open"
        :voidclick="Close"
    >
        <IconTextBox ref="name" icon="font" placeholder="Display Name" :value="react.track?.name" />
        <div class="grid grid-cols-2 gap-4">
            <IconTextBox ref="length" icon="clock" placeholder="Length" :value="react.track?.length" />
            <IconTextBox ref="bpm" icon="stopwatch" placeholder="BPM" :value="react.track?.bpm" />
        </div>
        <IconTextBox ref="genre" icon="font" placeholder="Genre" :value="react.track?.genre" />
        <RoundedButton class="px-4 py-2 w-fit hover:!bg-dark-4" @click="Perform">Confirm</RoundedButton>
    </PanelOverlay>
</template>
