<script setup>
import HomeVideo from '../assets/images/home/fluxis.mp4';
import NewsCard from '../components/news/NewsCard.vue';
import Config from '@/config.json';
import News from '@/news.json';
import { reactive } from 'vue';

const stats = reactive({
    users: undefined,
    online: undefined,
    scores: undefined,
    mapsets: undefined
});

setTitle("Home");

function getStats() {
    fetch(`${Config.apiUrl}/stats`)
        .then(res => res.json())
        .then(data => {
            stats.users = data.data.users;
            stats.online = data.data.online;
            stats.scores = data.data.scores;
            stats.mapsets = data.data.mapsets;
        });
}

getStats();
</script>

<template>
    <div class="banner-box">
        <!-- <img :src=HomeBanner class="future loadFade"> -->
        <video :src="HomeVideo" class="future loadFade" autoplay muted loop ></video>
        <div class="dim"></div>
        <div class="text-box">
            <h1>fluXis</h1>
            <h3>
                A free, community-driven and open-source
                <br>
                vertical scrolling rhythm game.
            </h3>
            <a href="https://dl.flux.moe/fluXis/updater.zip" class="btn-download">
                <i class="fa fa-download"></i>
                <p>Download</p>
            </a>
        </div>
        <div class="stats-text">
            <span>{{ stats.users }}</span>
            registered users,
            <span>{{ stats.online }}</span>
            currently online
            <br>
            with
            <span>{{ stats.scores }}</span>
            scores on
            <span>{{ stats.mapsets }}</span>
            mapsets
        </div>
    </div>
    <div class="news">
        <NewsCard v-for="entry in News" :data="entry"/>
    </div>
</template>

<style lang="scss">
.banner-box {
    height: 500px;
    display: grid;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    width: 100%;

    .dim {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 100%);
        backdrop-filter: var(--blur);
        z-index: 1;
    }

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        grid-row: 1;
        grid-column: 1;
    }

    .text-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        grid-row: 1;
        grid-column: 1;
        z-index: 2;
        height: 500px;
        text-align: left;
        padding: 0 60px;
        text-shadow: var(--text-shadow);

        h1 {
            font-size: 60px;
        }

        h3 {
            color: var(--text-color-secondary);
        }

        .btn-download {
            margin-top: 20px;
            padding: 5px 10px;
            border-radius: 5px;
            background-color: var(--accent-secondary);
            color: var(--text-color);
            width: max-content;
            display: flex;
            cursor: pointer;
            transition: 0.2s;
            font-size: 20px;

            &:hover {
                background-color: var(--accent-primary);
            }

            i {
                margin-right: 10px;
                display: flex;
                align-items: center;
            }
        }
    }

    .stats-text {
        z-index: 2;
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: var(--text-color-secondary);
        font-size: 12px;
        text-align: left;

        span {
            // color: var(--accent-primary);
            font-weight: bold;
        }
    }
}

.news {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1150px;
    width: 100%;
    margin-top: 10px;
}

@media (max-width: 700px) {
    .banner-box .text-box {
        text-align: center;
        align-items: center;
    }

    .banner-box video {
        position: absolute;
        right: 0;
    }
}
</style>