<script setup>
import { reactive } from 'vue';

import HomeVideo from '../assets/images/home/fluxis.mp4';
import NewsCard from '../components/news/NewsCard.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import API from '@/utils/API';
import { FormatNumber } from '@/utils/formatting';
import Utils from '@/utils/Utils';

import News from '@/news.json';

const stats = reactive({
    users: undefined,
    online: undefined,
    scores: undefined,
    mapsets: undefined
});

Utils.SetTitle("Home");

API.PerformGet("/stats").then(res => {
    stats.users = res.data.users;
    stats.online = res.data.online;
    stats.scores = res.data.scores;
    stats.mapsets = res.data.mapsets;
})

function OpenDownload() {
    window.open("https://github.com/InventiveRhythm/fluXis/releases/latest/download/install.exe")
}
</script>

<template>
    <div class="overlap-grid relative w-full h-96 rounded-3xl overflow-hidden">
        <video :src="HomeVideo" class="future loadFade object-cover blur-sm scale-105" autoplay muted loop></video>
        <div class="bg-dark-2 opacity-60"></div>
        <div class="flex flex-col justify-center items-center lg:items-start lg:text-left px-16">
            <h1 class="text-6xl">fluXis</h1>
            <h3 class="opacity-80">
                A free and community-driven rhythm game
                <br>
                with a focus on creativity and expression.
            </h3>
            <RoundedButton class="flex px-4 py-2 gap-2 mt-3" @click=OpenDownload>
                <i class="fa fa-download flex items-center"></i>
                <p>Download</p>
            </RoundedButton>
        </div>
        <div class="absolute bottom-5 left-5 w-fit h-fit text-left text-xs">
            <span class="font-bold">{{ FormatNumber(stats.users) }}</span>
            registered users,
            <span class="font-bold">{{ stats.online }}</span>
            currently online
            <br>
            with
            <span class="font-bold">{{ FormatNumber(stats.scores) }}</span>
            scores on
            <span class="font-bold">{{ FormatNumber(stats.mapsets) }}</span>
            mapsets
        </div>
    </div>
    <div class="w-full flex flex-wrap justify-center items-center mt-3">
        <NewsCard v-for="entry in News" :data="entry" />
    </div>
</template>

<style lang="scss">
.news {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1150px;
    width: 100%;
    margin-top: 10px;
}
</style>