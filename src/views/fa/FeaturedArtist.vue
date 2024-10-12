<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import LoadingImage from '@/components/LoadingImage.vue';

import API from '../../utils/API';
import Utils from '@/utils/Utils';
import { StartLoading, StopLoading } from '@/utils/Loading';

const route = useRoute();
const id = route.params.id;

const react = reactive({
    artist: null,
});

Utils.SetTitle('loading...');

StartLoading();

await API.PerformGet('/artists/' + id).then(res => {
    const artist = res.data;
    react.artist = artist;
    console.log(artist);

    Utils.SetTitle(`${ artist.name } - featured artist`);

    StopLoading();
}).catch(err => {
    StopLoading();
    console.log(err);
});

function playSong(album, track) {
    // stop all other songs
    const audioElements: HTMLAudioElement[] = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
    }

    const audio = document.getElementById(`audio-${ album }-${ track }`);
    audio.volume = 0.1;
    audio.play();

    const icon = document.getElementById(`icon-${ album }-${ track }`);
    const clone = icon.cloneNode(true);
    clone.classList.remove('fa-play');
    clone.classList.add('fa-pause');
    clone.addEventListener('click', function() {
        pauseSong(album, track);
    });

    icon.parentElement.replaceChild(clone, icon);
}

function pauseSong(album, track) {
    const audio: HTMLAudioElement = document.getElementById(`audio-${ album }-${ track }`);
    audio.volume = 0;
    audio.currentTime = audio.duration;
}

function songFinished(album, track) {
    const icon: HTMLAudioElement = document.getElementById(`icon-${ album }-${ track }`);
    const clone: HTMLAudioElement = icon.cloneNode(true);
    clone.classList.remove('fa-pause');
    clone.classList.add('fa-play');
    clone.addEventListener('click', function() {
        playSong(album, track);
    });

    icon.parentElement.replaceChild(clone, icon);
}

function downloadSong(album, track) {
    alert(`Downloading is still in development!`);
}
</script>

<template>
    <div v-if="react.artist" class="w-full flex rounded-3xl bg-dark-2 text-left">
        <div class="w-80 min-w-80">
            <div class="size-80">
                <LoadingImage class="size-full object-cover rounded-3xl"
                              :src="'/featured-artist/' + react.artist.id + '/icon.png'" alt="Artist Image" />
            </div>
            <div class="socials">

            </div>
        </div>
        <div class="w-full p-5">
            <div class="w-full flex flex-col mb-8">
                <h1 class="text-5xl">{{ react.artist.name }}</h1>
                <p class="text-base">{{ react.artist.description }}</p>
            </div>
            <div class="w-full flex flex-col items-center content-center gap-5">
                <div class="w-full h-max overflow-hidden rounded-3xl" v-for="album in react.artist.albums"
                     :style="'--album-accent:' + album.colors.accent + '; --album-accent-opaque:' + album.colors.accent + '88; --album-text:' + album.colors.text + '; --album-text2:' + album.colors.text2 + '; background-color:' + album.colors.bg + '; --album-bg2:' + album.colors.bg2 + '; ' ">
                    <div class="overlap-grid h-24 rounded-3xl">
                        <LoadingImage class="w-full object-cover blur scale-110"
                                      :src="'/featured-artist/' + react.artist.id + '/' + album.id + '/cover.png'"
                                      alt="" />
                        <div class="section-gradient opacity-50"></div>
                        <div class="section-gradient-custom opacity-50"
                             style="--section-gradient-col: var(--album-accent)"></div>
                        <div class="flex w-full h-full gap-4">
                            <div class="size-24">
                                <LoadingImage class="size-full rounded-3xl object-cover"
                                              :src="'/featured-artist/' + react.artist.id + '/' + album.id + '/cover.png'"
                                              alt="" />
                            </div>
                            <div class="flex flex-col justify-center drop-shadow-text"
                                 style="color: var(--album-text);">
                                <h2 class="text-2xl leading-tight">{{ album.name }}</h2>
                                <p class="text-base leading-tight">{{ album.tracks.length }} songs</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col p-3 gap-1">
                        <div class="group w-full h-10 flex items-center justify-between px-3 rounded-xl overflow-hidden"
                             style="background-color: var(--album-bg2); color: var(--album-text);"
                             v-for="track in album.tracks">
                            <div class="flex items-center">
                                <div class="w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <i class="fas fa-play" @click="playSong(album.id, track.id)"
                                       :id="'icon-' + album.id + '-' + track.id"></i>
                                </div>
                                <p class="text-base">{{ track.name }}</p>
                            </div>
                            <div class="flex items-center text-right">
                                <div class="flex flex-col text-xs leading-none" style="color: var(--album-text2);">
                                    <div class="flex gap-1">
                                        <p>{{ track.bpm }}bpm</p>
                                        <p style="color: var(--album-text);">{{ track.length }}</p>
                                    </div>
                                    <p>{{ track.genre }}</p>
                                </div>
                                <div class="w-0 group-hover:w-6 opacity-0 group-hover:opacity-100 transition-all">
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
                    <audio v-for="track in album.tracks" @ended="songFinished(album.id, track.id)"
                           @pause="songFinished(album.id, track.id)" :id="'audio-' + album.id + '-' + track.id"
                           :src="'/featured-artist/' + react.artist.id + '/' + album.id + '/' + track.id + '/preview.ogg'"></audio>
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