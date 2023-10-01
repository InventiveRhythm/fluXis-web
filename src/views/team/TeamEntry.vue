<script setup>
import config from '@/config.json';

const props = defineProps({
    name: String,
    id: Number,
    role: String,
    about: String,
    flip: Boolean
});
</script>

<template>
    <div :class="'entry ' + flip">
        <img :src="config.apiUrl + '/assets/banner/' + id" alt="" class="banner future loadFade">
        <div class="dim"></div>
        <img class="avatar future loadFade" :src="config.apiUrl + '/assets/avatar/' + id" alt="">
        <div class="text">
            <h3>{{ name }}</h3>
            <p class="role">{{ role }}</p>
            <p class="about">{{ about }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.entry {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
    background-color: black;
    border-radius: var(--border);
    text-shadow: var(--text-shadow);
    padding: 20px;
    overflow: hidden;

    .dim {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 100%);
    }

    .avatar {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: var(--border);
        margin-right: 20px;
        z-index: 2;
    }

    .banner {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        opacity: 0;

        &.loaded {
            opacity: 1;
        }
    }

    .text {
        display: flex;
        flex-direction: column;
        text-align: left;
        z-index: 2;

        h3 {
            font-size: 20px;
        }

        .role {
            color: var(--text-color-secondary);
            margin-bottom: 5px;
            font-size: 12px;
        }

        .about {
            font-size: 14px;
        }
    }

    &.true {
        flex-direction: row-reverse;

        .avatar {
            margin-left: 20px;
            margin-right: 0;
        }

        .dim {
            scale: -1;
            /* top: 0;
            left: 0;
            width: -100%;
            height: -100%; */
        }

        .text {
            text-align: right;
        }
    }
}
</style>