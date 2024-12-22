<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import APIUserMaps from '@/api/models/users/APIUserMaps';

import LoadingContainer from '@/components/status/LoadingContainer.vue';

import UserSection from '../components/UserSection.vue';
import UserWrapList from '../components/UserWrapList.vue';
import MapSetCard from '@/components/map/MapSet.vue';

import API from '@/utils/API';

const route = useRoute();
let id = route.params.id;

let react = reactive<{
    loading: boolean,
    maps: APIUserMaps
}>({
    loading: true,
    maps: new APIUserMaps()
});

try {
    API.PerformGet<APIUserMaps>(`/user/${id}/maps`).then(res => {
        if (!res.data) return;

        react['maps'] = res.data;
    }).finally(() => {
        react.loading = false;
    });
} catch (err) {
    console.error(err);
    react.loading = false;
}
</script>

<template>
    <LoadingContainer v-if="react.loading" />
    <div class="flex flex-col gap-5" v-else>
        <UserSection title="Pure">
            <p v-if="!react.maps.ranked || react.maps.ranked.length === 0" class="text-sm opacity-80 px-2">This user has no pure
                maps.</p>
            <UserWrapList v-else>
                <MapSetCard v-for="map in react.maps.ranked" :mapset="map" />
            </UserWrapList>
        </UserSection>
        <UserSection title="Impure/Unsubmitted">
            <p v-if="!react.maps.unranked || react.maps.unranked.length === 0" class="text-sm opacity-80 px-2">This user has no
                impure/unsubmitted maps.</p>
            <UserWrapList v-else>
                <MapSetCard v-for="map in react.maps.unranked" :mapset="map" />
            </UserWrapList>
        </UserSection>
        <UserSection title="Guest Difficulties">
            <p v-if="!react.maps.guest_diffs || react.maps.guest_diffs.length === 0" class="text-sm opacity-80 px-2">This user
                has no
                guest difficulties.</p>
            <UserWrapList v-else>
                <MapSetCard v-for="map in react.maps.guest_diffs" :mapset="map" />
            </UserWrapList>
        </UserSection>
    </div>
</template>