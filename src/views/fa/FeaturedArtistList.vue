<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

import API from '../../utils/API';
import { startLoading, stopLoading } from '../../utils/Loading';

const react = reactive({
    data: null
});

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
<div class="page-content">
    <h1 class="title">Featured Artist Listing</h1>
    <h3 class="subtitle">Featured Artists are artists that have given us permission/we bought licenses to use their songs in fluXis.</h3>

    <div class="list" v-if="react.data">
        <RouterLink :to="'/maps/artists/' + artist.id" v-for="artist in react.data">
            <div class="artist">
                <img class="future loadFade" :src="'/featured-artist/' + artist.id + '/icon.png'" :alt="artist.name" width="200" height="200" />
                <div class="text">
                    <h3>{{ artist.name }}</h3>
                    <p>{{ getSongCount(artist.id) }} songs</p>
                </div>
            </div>
        </RouterLink>
    </div>
</div>
</template>

<style lang="scss">
.page-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: var(--bg-secondary);
    padding: 20px;

    .title {
        font-size: 32px;
    }

    .subtitle {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .list {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        gap: 20px;
        flex-wrap: wrap;

        .artist {
            display: flex;
            width: 160px;
            height: 220px;
            flex-direction: column;
            align-items: center;
            border-radius: 20px;
            background: var(--bg-triary);
            transition: all 0.2s ease;

            &:hover {
                transform: scale(1.05);
                box-shadow: var(--box-shadow);
            }

            img {
                border-radius: 20px;
                object-fit: cover;
                width: 100%;
                height: 160px;
            }

            .text {
                display: flex;
                height: 80px;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                h3 {
                    font-size: 20px;
                }

                p {
                    font-size: 12px;
                    color: var(--text-color-secondary);
                }
            }
        }
    }
}
</style>