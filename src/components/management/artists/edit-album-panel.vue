<script setup lang="ts">
import type ColorPicker from '~/components/color-picker.vue';
import type IconTextbox from '~/components/icon-textbox.vue';
import type { FeaturedArtistAlbum } from '~/models/artists/FeaturedArtistAlbum';

const open = ref<boolean>(false);
const album = ref<FeaturedArtistAlbum>();

const name = ref<InstanceType<typeof IconTextbox>>();
const year = ref<InstanceType<typeof IconTextbox>>();
const month = ref<InstanceType<typeof IconTextbox>>();
const day = ref<InstanceType<typeof IconTextbox>>();

const cAccent = ref<InstanceType<typeof ColorPicker>>();
const cText = ref<InstanceType<typeof ColorPicker>>();
const cText2 = ref<InstanceType<typeof ColorPicker>>();
const cBackground = ref<InstanceType<typeof ColorPicker>>();
const cBackground2 = ref<InstanceType<typeof ColorPicker>>();

function Open(alb: FeaturedArtistAlbum) {
    album.value = alb;
    open.value = true;
}

function Perform() {
    
}

defineExpose({ Open });
</script>

<template>
    <Panel title="Edit Album" error="" :open="open" @close="open = false">
        <IconTextbox ref="name" icon="font" placeholder="Display Name" :value="album?.name" />
        <div class="grid grid-cols-3 gap-4">
            <IconTextbox ref="year" icon="calendar" placeholder="Year" :value="album?.release.year" />
            <IconTextbox ref="month" icon="calendar-week" placeholder="Month" :value="album?.release.month" />
            <IconTextbox ref="day" icon="calendar-days" placeholder="Day" :value="album?.release.day" />
        </div>
        <div class="grid grid-cols-5 gap-4">
            <ColorPicker ref="cAccent" class="h-12 w-full rounded" :color="album?.colors.accent" />
            <ColorPicker ref="cText" class="h-12 w-full rounded" :color="album?.colors.text" />
            <ColorPicker ref="cText2" class="h-12 w-full rounded" :color="album?.colors.text2" />
            <ColorPicker ref="cBackground" class="h-12 w-full rounded" :color="album?.colors.bg" />
            <ColorPicker ref="cBackground2" class="h-12 w-full rounded" :color="album?.colors.bg2" />
        </div>
        <Button class="w-fit bg-dark-2 px-4 py-2 hover:bg-dark-4" @click="Perform">Confirm</Button>
    </Panel>
</template>
