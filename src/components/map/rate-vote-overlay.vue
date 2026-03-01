<script setup lang="ts">
import type { IconTextbox } from '#components';
import type { APIResponseErrors } from '~/models/APIResponse';
import type { APIMap } from '~/models/maps/APIMap';
import API from '~/utils/api';

const props = defineProps<{
    map: APIMap;
}>();

const emit = defineEmits<{
    (e: 'updated', rating: number): void;
}>();

const open = ref<boolean>(false);
const errors = ref<APIResponseErrors>();

const base = ref<number>();
const read = ref<number>();
const track = ref<number>();
const percept = ref<number>();

const rating = computed<number>(() => {
    const baseNum = base.value ?? 0;
    const readNum = read.value ?? 0;
    const trackNum = track.value ?? 0;
    const perceptNum = percept.value ?? 0;
    return baseNum + ((readNum + trackNum + perceptNum) / 3) * 2;
});

function Open() {
    open.value = true;
}

async function Perform() {
    var { data, error } = await API.PerformPost<number>(`/map/${props.map.id}/rate`, {
        base: base.value,
        read: read.value,
        track: track.value,
        percept: percept.value,
    });

    if (error) errors.value = error;
    if (!data) return;

    emit('updated', data);
    open.value = false;
}

defineExpose({ Open});
</script>

<template>
    <Panel title="Rate Vote" :open="open" :error="errors?._request" @close="open = false">
        <IconTextbox type="number" step="0.1" v-model.number="base" icon="id-card-clip" placeholder="Chart Difficulty (0-20)" :error="errors?.base" />
        <IconTextbox type="number" step="0.1" v-model.number="read" icon="id-card-clip" placeholder="Read Difficulty (0-5)" :error="errors?.read" />
        <IconTextbox type="number" step="0.1" v-model.number="track" icon="id-card-clip" placeholder="Track Difficulty (0-5)" :error="errors?.track" />
        <IconTextbox type="number" step="0.1" v-model.number="percept" icon="id-card-clip" placeholder="Perception Difficulty (0-5)" :error="errors?.percept" />
        <div class="flex flex-row justify-between items-center">
            <Button class="w-fit bg-dark-2 px-4 py-2" @click="Perform">Vote</Button>
            <p>Your Rating: <span :style="{ color: GetRatingColor(rating) as string }">{{ rating.toFixed(2) }}</span></p>
        </div>
    </Panel>
</template>
