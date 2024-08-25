<script setup>
import { startLoading, stopLoading } from '../../utils/Loading';
import { reactive } from 'vue';

import RankingsUserCard from '../../components/rankings/RankingsUserCard.vue';

import API from '@/utils/API';

const react = reactive({
    rankings: []
});

startLoading();

await API.get('/leaderboards/overall')
    .then(res => {
        react.rankings = res.data;
    });

stopLoading();
</script>

<template>
    <div class="flex flex-wrap justify-center gap-4">
        <RankingsUserCard v-for="user in react.rankings" :user="user" />
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