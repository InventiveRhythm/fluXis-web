<script setup>
import Config from '@/config.json';

const props = defineProps({
    club: Object
});
</script>

<template>
    <div class="user-club">
        <img :src="Config.assetsUrl + '/club-banner/' + club.id" class="club-banner" animated-load />
        <div class="dim"></div>
        <div class="club-info">
            <img :src="Config.assetsUrl + '/club-icon/' + club.id" class="club-icon" animated-load />
            <p class="club-name">{{ club.name }}</p>
        </div>
    </div>
</template>

<style>
.user-club {
    width: 100%;
    height: 80px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    overflow: hidden;

    > * {
        position: relative;
        grid-area: 1 / 1;
        width: 100%;
        height: 100%;
    }

    .club-banner {
        object-fit: cover;
    }

    .dim {
        background-color: var(--bg-secondary);
        opacity: .5;
    }

    .club-info {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;

        .club-icon {
            width: 80px;
            height: 80px;
            border-radius: 10px;
            object-fit: cover;
        }

        .club-name {
            filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, .25));
            font-size: 20px;
        }
    }
}
</style>