<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import UserSection from '../components/UserSection.vue';
import UserWrapList from '../components/UserWrapList.vue';
import MapSetCard from '@/components/map/MapSet.vue'

import API from '@/utils/API';
import { StartLoading, StopLoading } from '@/utils/Loading';

const route = useRoute();
let id = parseInt(route.params.id);

let react = reactive({
    loading: true,
    maps: null
});

try {
    StartLoading();
    API.PerformGet(`/user/${id}/maps`).then(res => {
        if (!res.data) return;

        react['maps'] = res.data;
    }).finally(() => {
        react.loading = false;
        StopLoading();
    })
} catch (err) {
    console.error(err);
    react.loading = false;
    StopLoading();
}
</script>

<template>
    <p v-if="react.loading">loading...</p>
    <div class="flex flex-col gap-5" v-else>
        <UserSection title="Pure">
            <p v-if="!react.maps.ranked || react.maps.ranked.length == 0" class="px-3 opacity-60">This user has no pure
                maps.</p>
            <UserWrapList v-else>
                <MapSetCard v-for="map in react.maps.ranked" :mapset="map" />
            </UserWrapList>
        </UserSection>
        <UserSection title="Impure/Unsubmitted">
            <p v-if="!react.maps.unranked || react.maps.unranked.length == 0" class="px-3 opacity-60">This user has no
                impure/unsubmitted maps.</p>
            <UserWrapList v-else>
                <MapSetCard v-for="map in react.maps.unranked" :mapset="map" />
            </UserWrapList>
        </UserSection>
        <UserSection title="Guest Difficulties">
            <p v-if="!react.maps.guest_diffs || react.maps.guest_diffs.length == 0" class="px-3 opacity-60">This user
                has no
                guest difficulties.</p>
            <UserWrapList v-else>
                <MapSetCard v-for="map in react.maps.guest_diffs" :mapset="map" />
            </UserWrapList>
        </UserSection>
    </div>
</template>