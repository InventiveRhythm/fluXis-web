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

const base = ref<InstanceType<typeof IconTextbox>>();
const read = ref<InstanceType<typeof IconTextbox>>();
const track = ref<InstanceType<typeof IconTextbox>>();
const percept = ref<InstanceType<typeof IconTextbox>>();

function Open() {
    open.value = true;
}

async function Perform() {
    var { data, error } = await API.PerformPost<number>(`/map/${props.map.id}/rate`, {
        base: base.value?.input?.value,
        read: read.value?.input?.value,
        track: track.value?.input?.value,
        percept: percept.value?.input?.value
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
        <IconTextbox ref="base" icon="id-card-clip" placeholder="Chart Difficulty (0-20)" :error="errors?.base" />
        <IconTextbox ref="read" icon="id-card-clip" placeholder="Read Difficulty (0-5)" :error="errors?.read" />
        <IconTextbox ref="track" icon="id-card-clip" placeholder="Track Difficulty (0-5)" :error="errors?.track" />
        <IconTextbox ref="percept" icon="id-card-clip" placeholder="Perception Difficulty (0-5)" :error="errors?.percept" />
        <Button class="w-fit bg-dark-2 px-4 py-2" @click="Perform">Vote</Button>
    </Panel>
</template>
