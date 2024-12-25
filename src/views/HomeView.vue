<script setup lang="ts">
import { reactive } from 'vue';

import type { APIStats } from '@/api/models/other/APIStats';

import HomeVideo from '../assets/images/home/bg.mp4';
import NewsCard from '../components/news/NewsCard.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import OnlineGraph from './home/OnlineGraph.vue';

import API from '@/utils/API';
import { Localize } from '@/utils/Localization';
import { FormatNumber } from '@/utils/Formatting';
import Utils from '@/utils/Utils';

import News from '@/news.json';

const react = reactive<{
    stats: APIStats
}>({
    stats: {
        mapsets: 0,
        online: 0,
        scores: 0,
        users: 0
    }
});

Utils.SetTitle('home');

API.PerformGet<APIStats>('/stats').then(res => {
    react.stats = res.data!;
});

function OpenDownload() {
    window.open('https://github.com/InventiveRhythm/fluXis/releases/latest/download/install.exe');
}
</script>

<template>
    <div class="overlap-grid relative w-full h-96 rounded-b-3xl xl:rounded-3xl overflow-hidden">
        <video :src="HomeVideo" class="future loadFade object-cover blur-sm scale-105" autoplay muted loop></video>
        <div class="bg-dark-2 opacity-60"></div>
        <div class="flex flex-col justify-center items-center lg:items-start lg:text-left px-16">
            <h1 class="text-6xl">fluXis</h1>
            <h3 class="opacity-80">
                A free and community-driven rhythm game
                <br>
                with a focus on creativity and expression.
            </h3>
            <RoundedButton class="flex px-4 py-2 gap-2 mt-3 bg-primary hover:bg-secondary !text-dark-2"
                           @click=OpenDownload>
                <i class="fa fa-download flex items-center"></i>
                <p>{{ Localize('generic.download') }}</p>
            </RoundedButton>
        </div>
        <div class="absolute -bottom-2 -left-2 flex flex-row items-end pointer-events-none">
            <OnlineGraph class="home-graph-mask" />
        </div>
        <div class="absolute bottom-5 left-5 w-fit h-fit text-left text-xs drop-shadow-md">
            <span class="font-bold">{{ FormatNumber(react.stats.users) }}</span>
            registered users,
            <span class="font-bold">{{ react.stats.online }}</span>
            currently online
            <br>
            with
            <span class="font-bold">{{ FormatNumber(react.stats.scores) }}</span>
            scores on
            <span class="font-bold">{{ FormatNumber(react.stats.mapsets) }}</span>
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