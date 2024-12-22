<script setup lang="ts">
import { onUnmounted, reactive, ref } from 'vue';

import type { APIMapSet } from '@/api/models/maps/APIMapSet';

import MapSet from '@/components/map/MapSet.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';

import API from '@/utils/API';
import IconTextBox from '@/components/IconTextBox.vue';

const limit = 36;

const search = ref<InstanceType<typeof IconTextBox>>()

const react = reactive<{
    loading: boolean
    end?: boolean
    sets: APIMapSet[]
}>({
    loading: true,
    sets: []
})

Load()

function Load(full: boolean = false) {
    if (full)
        react.sets = []

    react.loading = true;

    const query = search.value?.input?.value || ''

    API.PerformGet<APIMapSet[]>(`/mapsets?limit=${limit}&offset=${react.sets.length}&q=${query}`).then(res => {
        if (!res.IsSuccess() || !res.data) {
            return
        }

        react.sets = react.sets.concat(res.data)
        react.end = res.data.length < limit
    }).finally(() => react.loading = false)
}

function OnScroll(e: any): any {
    if (react.loading || react.end)
        return

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        Load()
    }
}

document.addEventListener('scroll', OnScroll)

onUnmounted(() => {
    document.removeEventListener('scroll', OnScroll)
})
</script>

<template>
    <div class="bg-dark-3 mb-4 flex flex-row rounded-xl">
        <IconTextBox class="flex-1" :icon="'search'" placeholder="Search..." ref="search" @keydown.enter.stop="Load(true)" />
        <div class="size-14 flex flex-col items-center justify-center" @click="Load(true)">
            <i class="fa fa-angles-right text-xl"></i>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" v-if="react.sets">
        <MapSet :mapset="set" v-for="set in react.sets" />
    </div>
    <LoadingContainer v-if="react.loading" />
</template>