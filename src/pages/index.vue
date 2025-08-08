<script setup lang="ts">
import HomeVideoMp4 from '@/assets/image/home-bg.mp4';
import HomeVideoWebm from '@/assets/image/home-bg.webm';
import LogoText from '@/assets/image/logo-text.png';
import { APINewsType, type APINewsPost } from '~/models/other/APINewsPost';
import API from '~/utils/api';

const news: APINewsPost[] = [
    {
        id: "a",
        image: '/images/news-1.jpg',
        title: 'An interesting title',
        blurb: 'very cool content thats extremely long so i can test line wrappings. css sucks i wish there was a better way to do this shit',
        time: 455493600,
        type: APINewsType.News
    },
    {
        id: "a",
        image: '/images/news-2.jpg',
        title: 'certified hashbrown moment',
        blurb: 'pretend i put lorem ipsum in here. too lazy to actually generate some',
        time: 455493600,
        type: APINewsType.News
    },
    {
        id: "a",
        image: '/images/news-3.jpg',
        title: 'i am going insane',
        blurb: "i'm running out of ideas for this",
        time: 1678143600,
        type: APINewsType.Notice
    }
];
</script>

<template>
    <div>
        <div class="overlap-grid h-96 w-full overflow-hidden rounded-b-3xl xl:rounded-3xl">
            <video class="scale-105 object-cover blur-sm" autoplay muted loop playsinline preload="auto">
                <source :src="HomeVideoWebm" type="video/webm">
                <source :src="HomeVideoMp4" type="video/mp4">
            </video>
            <div class="bg-dark-2 opacity-60"></div>
            <div class="flex flex-col items-center justify-center px-16 lg:items-start lg:text-left">
                <img :src="LogoText" class="mb-2 h-16" />
                <h3 class="max-w-96 opacity-80">A free and community-driven rhythm game with a focus on creativity and expression.</h3>
                <a :href="API.SteamDownload">
                    <Button class="mt-3 flex gap-2 bg-dark-3 px-4 py-3 text-dark-text hover:bg-dark-4">
                        <i class="fa-brands fa-steam mr-1 flex items-center"></i>
                        <p class="text-sm">{{ Localize('home.getonsteam') }}</p>
                    </Button>
                </a>
            </div>
        </div>
        <div class="mt-3 flex w-full flex-wrap items-center justify-center">
            <NewsPost v-for="post in news" :post="post" />
        </div>
    </div>
</template>
