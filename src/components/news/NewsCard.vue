<script setup>
import LoadingImage from '../LoadingImage.vue';

defineProps({
    data: Object
});
</script>

<template>
    <div class="m-3 flex h-64 min-w-80 flex-1 flex-col overflow-hidden rounded-2xl bg-dark-2 hover:bg-dark-3 transition-all cursor-pointer active:scale-95">
        <div class="h-40 overlap-grid">
            <LoadingImage class="w-full object-cover rounded-2xl" :src="data.image" />
            <div class="size-full flex flex-row justify-between items-end text-2xs p-2">
                <div class="bg-dark-2 px-3 py-1 rounded-full">
                    <p class="opacity-75">{{ data.date }}</p>
                </div>
                <div class="bg-dark-2 px-3 py-1 rounded-full">
                    <p class="opacity-75">{{ data.type }}</p>
                </div>
            </div>
        </div>
        <div class="text-left p-3">
            <p class="text-lg">{{ data.title }}</p>
            <p class="text-sm line-clamp-2 opacity-60">{{ data.content }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.news-card {
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--bg-secondary);
    margin: 10px;
    transition: all 0.2s ease-in-out;
    min-width: 360px;
    height: 250px;
    cursor: pointer;
    flex: 1 1 360px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    z-index: 1;

    &:hover {
        transform: scale(1.02);
        box-shadow: var(--box-shadow-20);
        z-index: 2;
    }

    .news-card-image {
        height: 160px;
        display: grid;
    }
}
</style>