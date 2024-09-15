<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

import API from '../../utils/API';
import Utils from '@/utils/Utils';
import { startLoading, stopLoading } from '../../utils/Loading';

const react = reactive({
    data: null
});

Utils.SetTitle("featured artist listing")

startLoading();

await API.get('/artists')
    .then(res => {
        // Sort by name
        res.data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;

            return 0;
        });

        react.data = res.data;
        console.log(res.data);

        stopLoading();
    })
    .catch(err => {
        stopLoading();
        console.log(err);
    });

function getSongCount(id) {
    const artist = react.data.find(x => x.id === id);

    let count = 0;

    if (!artist || !artist.albums) return count;

    for (let i = 0; i < artist.albums.length; i++) {
        count += artist.albums[i].tracks.length;
    }

    return count;
}
</script>

<template>
<div class="w-full flex flex-col rounded-3xl bg-dark-2 p-5">
    <h1 class="text-3xl">Featured Artist Listing</h1>
    <h3 class="text-base mb-3">Featured Artists are artists that have given us permission/we bought licenses to use their songs in fluXis.</h3>

    <div class="flex justify-center gap-5 flex-wrap items-start content-start" v-if="react.data">
        <RouterLink :to="'/artist/' + artist.id" v-for="artist in react.data">
            <div class="flex flex-col items-center bg-dark-3 hover:scale-105 rounded-3xl transition-transform">
                <img class="future loadFade w-40 h-40 rounded-3xl" :src="'/featured-artist/' + artist.id + '/icon.png'" :alt="artist.name" />
                <div class="flex flex-col h-20 justify-center items-center">
                    <h3 class="text-xl">{{ artist.name }}</h3>
                    <p class="text-sm opacity-80">{{ getSongCount(artist.id) }} songs</p>
                </div>
            </div>
        </RouterLink>
    </div>
</div>
</template>