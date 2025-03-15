<script setup lang="ts">
import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '@/api/models/artists/FeaturedArtistAlbum';
import IconTextBox from '@/components/IconTextBox.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import PanelOverlay from '@/overlays/PanelOverlay.vue';
import API from '@/utils/API';
import { reactive, ref } from 'vue';

const id = ref<InstanceType<typeof IconTextBox>>();
const name = ref<InstanceType<typeof IconTextBox>>();
const year = ref<InstanceType<typeof IconTextBox>>();
const month = ref<InstanceType<typeof IconTextBox>>();
const day = ref<InstanceType<typeof IconTextBox>>();

const props = defineProps<{
    artist: FeaturedArtist;
}>();

const react = reactive<{
    open: boolean;
    error?: string;
}>({
    open: false
});

const emit = defineEmits<{
    (e: 'added', artist: FeaturedArtistAlbum): void;
}>();

function Perform() {
    API.PerformPost<FeaturedArtistAlbum>(`/artists/${props.artist.id}/albums`, {
        id: id.value?.input?.value,
        name: name.value?.input?.value,
        release: {
            year: year.value?.input?.value,
            month: month.value?.input?.value,
            day: day.value?.input?.value
        }
    })
        .then((res) => {
            if (!res.IsSuccess() || !res.data) throw new APIError(res);

            emit('added', res.data);
            Close();
        })
        .catch((e) => {
            react.error = e.message;
            console.error(e);
        });
}

function Open() {
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
        :title="`Add new album for ${artist.name}`"
        :error="react.error"
        :open="react.open"
        :voidclick="Close"
    >
        <IconTextBox ref="id" icon="id-card-clip" placeholder="Unique ID" />
        <IconTextBox ref="name" icon="font" placeholder="Display Name" />
        <div class="grid grid-cols-3 gap-4">
            <IconTextBox ref="year" icon="calendar" placeholder="Year" />
            <IconTextBox ref="month" icon="calendar-week" placeholder="Month" />
            <IconTextBox ref="day" icon="calendar-days" placeholder="Day" />
        </div>
        <RoundedButton class="px-4 py-2 w-fit hover:!bg-dark-4" @click="Perform">Confirm</RoundedButton>
    </PanelOverlay>
</template>

<style scoped lang="scss"></style>
