<script setup>
import RankingsUserCard from '../../components/rankings/RankingsUserCard.vue';

import Config from '@/config.json';
import { startLoading, stopLoading } from '../../utils/Loading';
import { reactive } from 'vue';

const react = reactive({
    rankings: []
});

startLoading();

await fetch(Config.apiUrl + '/leaderboards/overall')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        react.rankings = data.data;
    });

stopLoading();
</script>

<template>
    <div class="rankings">
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