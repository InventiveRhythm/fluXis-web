<script async setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import type APIUser from '@/api/models/users/APIUser';

import RankingsTopCard from '@/components/rankings/RankingsTopCard.vue';
import RankingsUserCard from '../../components/rankings/RankingsUserCard.vue';

import API from '@/utils/API';
import { StartLoading, StopLoading } from '@/utils/Loading';
import Utils from '@/utils/Utils';

const route = useRoute();

const react = reactive<{
    top: APIUser[]
    rankings: APIUser[]
}>({
    top: [],
    rankings: []
});

StartLoading();

const mode = route.query.mode;

await API.PerformGet<APIUser[]>('/leaderboards/overall?mode=' + mode).then(res => {
    if (!res.IsSuccess() || !res.data)
        return;

    react.top = res.data.slice(0, 3);
    react.top[0] = react.top[1];
    react.top[1] = res.data[0];

    react.rankings = res.data.slice(3);
    Utils.SetTitle('overall - rankings');
}).finally(() => StopLoading());
</script>

<template>
    <h1 class="text-4xl">Global Rankings</h1>
    <h1 class="text-xl mb-6 opacity-80">Overall Rating</h1>
    <div class="flex flex-col gap-4">
        <div class="grid grid-rows-1 grid-cols-3 h-80 gap-4 items-end">
            <RankingsTopCard :user="user" v-for="user in react.top" />
        </div>
        <div class="flex flex-col justify-center gap-4">
            <RankingsUserCard v-for="user in react.rankings" :user="user" />
        </div>
    </div>
</template>