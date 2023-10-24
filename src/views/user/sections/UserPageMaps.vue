<script setup>
import { reactive } from 'vue';
import Config from '../../../config.json';
import MapSet from '../../../components/map/MapSet.vue';

const props = defineProps({
    id: Number
})

let react = reactive({
    maps: null,
    mapsLoaded: false
})

fetch(`${Config.apiUrl}/user/${props.id}/maps`).then(res => res.json()).then(data => {
    if (!data.data) return;
    react.maps = data.data;
}).catch(err => {
    console.error(err);
}).finally(() => {
    react.mapsLoaded = true;
})
</script>

<template>
    <div class="profile-section maps" v-if="react.mapsLoaded">
        <h1 id="maps">Maps</h1>

        <h3>Pure Maps</h3>
        <div v-if="react.maps.ranked && react.maps.ranked.length > 0" class="mapset-list">
            <MapSet v-for="set in react.maps.ranked" :mapset=set></MapSet>
        </div>
        <p v-else class="subtext">This user doesn't have any pure maps...</p>

        <h3>Impure/Unsubmitted Maps</h3>
        <div v-if="react.maps.unranked && react.maps.unranked.length > 0" class="mapset-list">
            <MapSet v-for="set in react.maps.unranked" :mapset=set></MapSet>
        </div>
        <p v-else class="subtext">This user doesn't have any impure/unsubmitted maps...</p>

        <h3>Guest Difficulties</h3>
        <div v-if="react.maps.guest_diffs && react.maps.guest_diffs.length > 0" class="mapset-list">
            <MapSet v-for="set in react.maps.guest_diffs" :mapset=set></MapSet>
        </div>
        <p v-else class="subtext">This user doesn't have any guest difficulties...</p>
    </div>
</template>