<script setup>
import config from '@/config.json';

const props = defineProps({
    name: String,
    id: Number,
    role: Number
});

function getRoleName(role) {
    switch (role) {
        case 2:
            return 'Purifier';
        case 3:
            return 'Moderator';
    }
}

function getRoleClass(role) { 
    switch (role) {
        case 2:
            return 'purifier';
        case 3:
            return 'moderator';
    }
}
</script>

<template>
    <div class="small-entry">
            <img :src="config.apiUrl + '/assets/banner/' + id" alt="" class="banner future loadFade">
            <div class="dim"></div>
            <img class="avatar future loadFade" :src="config.apiUrl + '/assets/avatar/' + id" alt="">
            <div class="text">
                <h3>{{ name }}</h3>
                <p :class="'role ' + getRoleClass(role)">{{ getRoleName(role) }}</p>
            </div>
        </div>
</template>

<style lang="scss">
.small-entry {
    position: relative;
    display: flex;
    width: 440px;
    flex-grow: 1;
    align-items: center;
    margin: 0 5px 10px 5px;
    background-color: black;
    border-radius: var(--border);
    text-shadow: var(--text-shadow);
    padding: 5px;
    overflow: hidden;

    .avatar {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: calc(var(--border) / 2);
        margin-right: 5px;
        z-index: 2;
        box-shadow: 0 0 5px rgba($color: #000, $alpha: 0.25);
    }

    .dim {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 100%);
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
            font-size: 16px;
        }

        .role {
            color: var(--text-color-secondary);
            font-size: 10px;

            &.purifier {
                color: var(--tag-role-purifier);
            }

            &.moderator {
                color: var(--tag-role-moderator);
            }
        }
    }
}
</style>