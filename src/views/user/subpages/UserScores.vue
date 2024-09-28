<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import UserSection from '../components/UserSection.vue';
import UserContentList from '../components/UserContentList.vue';
import ScoreCard from '@/components/score-v2/ScoreCard.vue';

import API from '@/utils/API';
import { startLoading, stopLoading } from '@/utils/Loading';

const route = useRoute();
let id = parseInt(route.params.id);

let react = reactive({
    loading: true,
    scores: null
});

try {
    startLoading();
    API.PerformGet(`/user/${id}/scores`).then(res => {
        if (!res.data) return;

        react['scores'] = res.data;
    }).finally(() => {
        react.loading = false;
        stopLoading();
    })
} catch (err) {
    console.error(err);
    react.loading = false;
    stopLoading();
}
</script>

<template>
    <p v-if="react.loading">loading...</p>
    <div class="flex flex-col gap-5" v-else>
        <UserSection title="Best">
            <UserContentList>
                <ScoreCard v-for="score in react.scores.best_scores.splice(0, 8)" :score="score" />
            </UserContentList>
        </UserSection>
        <UserSection title="Recent">
            <UserContentList>
                <ScoreCard v-for="score in react.scores.recent_scores.splice(0, 6)" :score="score" />
            </UserContentList>
        </UserSection>
    </div>
</template>