<script setup lang="ts">
import { APIError } from '@/api/models/APIError';
import type { FeaturedArtist } from '@/api/models/artists/FeaturedArtist';
import IconTextBox from '@/components/IconTextBox.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import PanelOverlay from '@/overlays/PanelOverlay.vue';
import API from '@/utils/API';
import { reactive, ref } from 'vue';

const id = ref<InstanceType<typeof IconTextBox>>();
const name = ref<InstanceType<typeof IconTextBox>>();

const react = reactive<{
    open: boolean;
    error?: string;
}>({
    open: false
});

const emit = defineEmits<{
    (e: 'added', artist: FeaturedArtist): void;
}>();

function Perform() {
    API.PerformPost<FeaturedArtist>('/artists', {
        id: id.value?.input?.value,
        name: name.value?.input?.value
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
    <PanelOverlay title="Add new artist" :error="react.error" :open="react.open" :voidclick="Close">
        <IconTextBox ref="id" icon="id-card-clip" placeholder="Unique ID" />
        <IconTextBox ref="name" icon="font" placeholder="Display Name" />
        <RoundedButton class="px-4 py-2 w-fit hover:!bg-dark-4" @click="Perform">Confirm</RoundedButton>
    </PanelOverlay>
</template>

<style scoped lang="scss"></style>
