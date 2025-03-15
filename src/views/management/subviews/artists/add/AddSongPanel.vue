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

const id = ref<InstanceType<typeof IconTextBox>>();
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
}>({
    open: false
});

const emit = defineEmits<{
    (e: 'added', album: FeaturedArtistAlbum, track: FeaturedArtistTrack): void;
}>();

function Perform() {
    API.PerformPost<FeaturedArtistTrack>(`/artists/${props.artist.id}/albums/${react.album?.id}/tracks`, {
        id: id.value?.input?.value,
        name: name.value?.input?.value,
        length: length.value?.input?.value,
        bpm: bpm.value?.input?.value,
        genre: genre.value?.input?.value,
    })
        .then((res) => {
            if (!res.IsSuccess() || !res.data) throw new APIError(res);

            emit('added', react.album!, res.data);
            Close();
        })
        .catch((e) => {
            react.error = e.message;
            console.error(e);
        });
}

function Open(album: FeaturedArtistAlbum) {
    react.album = album;
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
        :title="`Add new song to '${react.album?.name}'`"
        :error="react.error"
        :open="react.open"
        :voidclick="Close"
    >
        <IconTextBox ref="id" icon="id-card-clip" placeholder="Unique ID" />
        <IconTextBox ref="name" icon="font" placeholder="Display Name" />
        <div class="grid grid-cols-2 gap-4">
            <IconTextBox ref="length" icon="clock" placeholder="Length" />
            <IconTextBox ref="bpm" icon="stopwatch" placeholder="BPM" />
        </div>
        <IconTextBox ref="genre" icon="font" placeholder="Genre" />
        <RoundedButton class="px-4 py-2 w-fit hover:!bg-dark-4" @click="Perform">Confirm</RoundedButton>
    </PanelOverlay>
</template>

<style scoped lang="scss"></style>
