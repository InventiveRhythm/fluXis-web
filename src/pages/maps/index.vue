<script setup lang="ts">
import type IconTextbox from '~/components/icon-textbox.vue';
import type { APIMapSet } from '~/models/maps/APIMapSet';
import API from '~~/src/utils/api';

const search = ref<InstanceType<typeof IconTextbox>>();

const mapsets = ref<APIMapSet[]>([]);
const loading = ref<boolean>(false);

let end = false;

await FetchData();

async function FetchData(reload = false) {
    if (reload) mapsets.value = [];
    loading.value = true;

    const limit = 36;
    const query = search.value?.input?.value || '';

    const { data } = await API.PerformGet<APIMapSet[]>(`/mapsets?q=${query}&limit=${limit}&offset=${mapsets.value.length}`);

    if (data) {
        mapsets.value = mapsets.value.concat(data);
        end = data.length < limit;
    }

    loading.value = false;
}

function OnScroll() {
    if (loading.value || end) return;

    const pos = document.documentElement.scrollTop + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos < max) return;

    FetchData();
}

if (import.meta.client) {
    document.addEventListener('scroll', OnScroll);
    onBeforeUnmount(() => document.removeEventListener('scroll', OnScroll));
}
</script>

<template>
    <div class="w-fit-mobile flex w-full flex-col gap-4">
        <div class="flex flex-row rounded-xl bg-dark-3">
            <IconTextbox ref="search" class="flex-1" icon="search" placeholder="Search..." @keydown.enter.stop="FetchData(true)" />
            <div class="flex size-14 flex-col justify-center" @click="FetchData(true)">
                <i class="fa fa-angles-right text-xl"></i>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3" v-if="mapsets">
            <MapCard :mapset="mapset" v-for="mapset in mapsets" />
        </div>
        <LoadingIndicator v-if="loading" />
    </div>
</template>
