<script setup lang="ts">
import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '@/api/models/artists/FeaturedArtistAlbum';
import ColorPicker from '@/components/color/ColorPicker.vue';
import IconTextBox from '@/components/IconTextBox.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import PanelOverlay from '@/overlays/PanelOverlay.vue';
import API from '@/utils/API';
import { reactive, ref } from 'vue';

const name = ref<InstanceType<typeof IconTextBox>>();
const year = ref<InstanceType<typeof IconTextBox>>();
const month = ref<InstanceType<typeof IconTextBox>>();
const day = ref<InstanceType<typeof IconTextBox>>();

const cAccent = ref<InstanceType<typeof ColorPicker>>();
const cText = ref<InstanceType<typeof HTMLInputElement>>();
const cText2 = ref<InstanceType<typeof HTMLInputElement>>();
const cBackground = ref<InstanceType<typeof HTMLInputElement>>();
const cBackground2 = ref<InstanceType<typeof HTMLInputElement>>();

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

function Perform() {
    if (!react.album) return;

    console.log();

    var album: FeaturedArtistAlbum = {
        id: react.album?.id,
        name: name.value?.input?.value ?? react.album.name,
        release: {
            year: parseInt(year.value?.input?.value ?? react.album.release.year.toString()),
            month: parseInt(month.value?.input?.value ?? react.album.release.month.toString()),
            day: parseInt(day.value?.input?.value ?? react.album.release.day.toString())
        },
        colors: {
            accent: cAccent.value?.value ?? react.album.colors.accent,
            text: cText.value?.value ?? react.album.colors.text,
            text2: cText2.value?.value ?? react.album.colors.text2,
            bg: cBackground.value?.value ?? react.album.colors.bg,
            bg2: cBackground2.value?.value ?? react.album.colors.bg2
        },
        tracks: []
    };

    API.PerformPatch<FeaturedArtistAlbum>(`/artists/${props.artist.id}/albums/${react.album?.id}`, album)
        .then((res) => {
            if (!res.IsSuccess() || !res.data) throw new APIError(res);

            Object.assign(react.album!, res.data);
            Close();
        })
        .catch((ex) => {
            react.error = ex.message;
            console.error(ex);
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
    <PanelOverlay :title="`Edit Album '${react.album?.id}'`" :error="react.error" :open="react.open" :voidclick="Close">
        <IconTextBox ref="name" icon="font" placeholder="Display Name" :value="react.album?.name" />
        <div class="grid grid-cols-3 gap-4">
            <IconTextBox ref="year" icon="calendar" placeholder="Year" :value="react.album?.release.year" />
            <IconTextBox ref="month" icon="calendar-week" placeholder="Month" :value="react.album?.release.month" />
            <IconTextBox ref="day" icon="calendar-days" placeholder="Day" :value="react.album?.release.day" />
        </div>
        <div class="grid grid-cols-5 gap-4">
            <ColorPicker ref="cAccent" class="w-full h-12 rounded" :color="react.album?.colors.accent" />
            <ColorPicker ref="cText" class="w-full h-12 rounded" :color="react.album?.colors.text" />
            <ColorPicker ref="cText2" class="w-full h-12 rounded" :color="react.album?.colors.text2" />
            <ColorPicker ref="cBackground" class="w-full h-12 rounded" :color="react.album?.colors.bg" />
            <ColorPicker ref="cBackground2" class="w-full h-12 rounded" :color="react.album?.colors.bg2" />
        </div>
        <Popover></Popover>
        <RoundedButton class="px-4 py-2 w-fit hover:!bg-dark-4" @click="Perform">Confirm</RoundedButton>
    </PanelOverlay>
</template>
