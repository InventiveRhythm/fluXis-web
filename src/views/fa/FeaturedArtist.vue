<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import API from '../../utils/API';
import { startLoading, stopLoading } from '../../utils/Loading';

const route = useRoute();
const id = route.params.id;

const react = reactive({
    artist: null
});

startLoading();

await API.get('/artists/' + id)
    .then(res => {
        var artist = res.data;
        react.artist = artist;
        console.log(artist);

        stopLoading();
    })
    .catch(err => {
        stopLoading();
        console.log(err);
    });

function playSong(album, track) {
    // stop all other songs
    var audioElements = document.getElementsByTagName('audio');
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
    }

    var audio = document.getElementById(`audio-${album}-${track}`);
    audio.volume = 0.1;
    audio.play();

    var icon = document.getElementById(`icon-${album}-${track}`);
    var clone = icon.cloneNode(true);
    clone.classList.remove('fa-play');
    clone.classList.add('fa-pause');
    clone.addEventListener('click', function () {
        pauseSong(album, track);
    });

    icon.parentElement.replaceChild(clone, icon);
}

function pauseSong(album, track) {
    var audio = document.getElementById(`audio-${album}-${track}`);
    audio.volume = 0;
    audio.currentTime = audio.duration;
}

function songFinished(album, track) {
    var icon = document.getElementById(`icon-${album}-${track}`);
    var clone = icon.cloneNode(true);
    clone.classList.remove('fa-pause');
    clone.classList.add('fa-play');
    clone.addEventListener('click', function () {
        playSong(album, track);
    });

    icon.parentElement.replaceChild(clone, icon);
}

function downloadSong(album, track) {
    alert(`Downloading is still in development!`);
}
</script>

<template>
<div v-if="react.artist" class="artist-content">
    <div class="artist-sidebar">
        <img :src="'/featured-artist/' + react.artist.id + '/icon.png'" alt="Artist Image" class="future loadFade">
        <div class="socials">

        </div>
    </div>
    <div class="artist-main">
        <div class="artist-info">
            <h1>{{ react.artist.name }}</h1>
            <p>{{ react.artist.description }}</p>
        </div>
        <div class="artist-album-list">
            <div class="album" v-for="album in react.artist.albums"
                :style="'--album-accent:' + album.colors.accent + '; --album-accent-opaque:' + album.colors.accent + '88; --album-text:' + album.colors.text + '; --album-text2:' + album.colors.text2 + '; --album-bg:' + album.colors.bg + '; --album-bg2:' + album.colors.bg2 + '; ' ">
                <div class="header">
                    <img :src="'/featured-artist/' + react.artist.id + '/' + album.id + '/cover.png'" alt="" class="album-background future loadFade">
                    <div class="blur"></div>
                    <div class="dim"></div>
                    <div class="color-dim"></div>
                    <div class="album-info">
                        <img :src="'/featured-artist/' + react.artist.id + '/' + album.id + '/cover.png'" alt="" class="cover future loadFade">
                        <div class="text">
                            <h2>{{ album.name }}</h2>
                            <p>{{ album.tracks.length }} songs</p>
                        </div>
                    </div>
                </div>
                <div class="tracklist">
                    <div class="track" v-for="track in album.tracks">
                        <div class="left">
                            <div class="play">
                                <i class="fas fa-play" @click="playSong(album.id, track.id)" :id="'icon-' + album.id + '-' + track.id"></i>
                            </div>
                            <p>{{ track.name }}</p>
                        </div>
                        <div class="right">
                            <div class="metadata">
                                <div class="bpm-length">
                                    <p>{{ track.bpm }}bpm</p>
                                    <p class="length">{{ track.length }}</p>
                                </div>
                                <p>{{ track.genre }}</p>
                            </div>
                            <div class="download">
                                <i class="fas fa-download" @click="downloadSong(album.id, track.id)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--audio section-->

        <div class="audio">
            <div v-for="album in react.artist.albums">
                <audio v-for="track in album.tracks" @ended="songFinished(album.id, track.id)" @pause="songFinished(album.id, track.id)" :id="'audio-' + album.id + '-' + track.id" :src="'/featured-artist/' + react.artist.id + '/' + album.id + '/' + track.id + '/preview.ogg'"></audio>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.artist-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    background-color: var(--bg-secondary);
    text-align: left;

    .artist-sidebar {
        max-width: 320px;

        img {
            width: 320px;
            height: 320px;
            object-fit: cover;
            border-radius: 20px;
        }
    }

    .artist-main {
        width: 100%;
        padding: 20px;

        .artist-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            line-height: 1.2;
            justify-content: center;
            text-shadow: var(--text-shadow);
            margin-bottom: 30px;

            h1 {
                font-size: 48px;
            }

            p {
                font-size: 16px;
            }
        }

        .artist-album-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            gap: 20px;

            .album {
                width: 100%;
                height: max-content;
                overflow: hidden;
                border-radius: 20px;
                background-color: var(--album-bg);
                box-shadow: var(--box-shadow);

                .header {
                    width: 100%;
                    height: 100px;
                    overflow: hidden;
                    border-radius: 20px;
                    display: grid;
                    box-shadow: var(--box-shadow);

                    .album-background {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        grid-row: 1;
                        grid-column: 1;
                    }

                    .blur {
                        width: 100%;
                        height: 100%;
                        grid-row: 1;
                        grid-column: 1;
                        backdrop-filter: blur(10px);
                    }

                    .dim {
                        width: 100%;
                        height: 100%;
                        grid-row: 1;
                        grid-column: 1;
                        z-index: 2;
                        background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0) 100%);
                    }

                    .color-dim {
                        width: 100%;
                        height: 100%;
                        grid-row: 1;
                        grid-column: 1;
                        z-index: 2;
                        opacity: 0.5;
                        background: linear-gradient(90deg, var(--album-accent) 0%, var(--album-accent) 20%, var(--album-accent-opaque) 100%);
                    }

                    .album-info {
                        display: flex;
                        height: 100px;
                        grid-row: 1;
                        grid-column: 1;
                        z-index: 2;
                        gap: 15px;

                        .cover {
                            border-radius: 20px;
                            width: 100px;
                            height: 100px;
                            object-fit: cover;
                            box-shadow: var(--box-shadow);
                        }
                        
                        .text {
                            display: flex;
                            flex-direction: column;
                            line-height: 1.2;
                            justify-content: center;
                            text-shadow: var(--text-shadow);
                            color: var(--album-text);
                            
                            h2 {
                                font-size: 24px;
                            }

                            p {
                                font-size: 16px;
                            }
                        }
                    }
                }

                .tracklist {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;

                    .track {
                        padding: 0 10px;
                        height: 40px;
                        border-radius: 10px;
                        background-color: var(--album-bg2);
                        color: var(--album-text);
                        overflow: hidden;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;

                        .left {
                            display: flex;
                            flex-direction: row;
                            align-items: center;

                            .play {
                                width: 0px;
                                height: 20px;
                                opacity: 0;
                                transition: all 0.2s ease;

                                i {
                                    font-size: 20px;
                                    color: var(--album-text);
                                    margin: 0 5px;
                                }
                            }

                            p {
                                font-size: 16px;
                            }
                        }

                        .right {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            text-align: right;

                            .metadata {
                                display: flex;
                                flex-direction: column;
                                font-size: 12px;
                                line-height: 1;
                                color: var(--album-text2);

                                .bpm-length {
                                    display: flex;
                                    flex-direction: row;
                                    gap: 5px;

                                    .length {
                                        color: var(--album-text);
                                    }
                                }
                            }

                            .download {
                                width: 0px;
                                height: 20px;
                                opacity: 0;
                                transition: all 0.2s ease;

                                i {
                                    font-size: 20px;
                                    margin-left: 5px;
                                }
                            }
                        }

                        &:hover {
                            .left {
                                .play {
                                    width: 30px;
                                    opacity: 1;
                                }
                            }

                            .right {
                                .download {
                                    width: 25px;
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.audio {
    display: none;
}
</style>