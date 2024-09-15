<script async setup>
import { startLoading, stopLoading } from '../../utils/Loading';
import { reactive } from 'vue';

import RankingsTopCard from '@/components/rankings/RankingsTopCard.vue';
import RankingsUserCard from '../../components/rankings/RankingsUserCard.vue';

import API from '@/utils/API';
import Utils from '@/utils/Utils';

const react = reactive({
    top: [],
    rankings: [],
});

startLoading();

await API.get('/leaderboards/overall').then(res => {
    react.top = res.data.slice(0, 3)
    react.top[0] = react.top[1]
    react.top[1] = res.data[0]

    react.rankings = res.data.slice(3)
    Utils.SetTitle("overall - rankings")
}).finally(() => stopLoading());
</script>

<template>
    <h1 class="text-4xl">Global Rankings</h1>
    <h1 class="text-xl mb-6 opacity-80">Overall Rating</h1>
    <div class="flex flex-col gap-4">
        <div class="grid grid-rows-1 grid-cols-3 h-80 gap-4 items-end">
            <RankingsTopCard :user="user" v-for="user in react.top"/>
        </div>
        <div class="flex flex-col justify-center gap-4">
            <RankingsUserCard v-for="user in react.rankings" :user="user" />
        </div>
    </div>
</template>

<style>
.rankings {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}
</style>