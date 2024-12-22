<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import UserSection from '../components/UserSection.vue';
import UserContentList from '../components/UserContentList.vue';
import ScoreCard from '@/components/score-v2/ScoreCard.vue';

import LoadingContainer from '@/components/status/LoadingContainer.vue';

import API from '@/utils/API';

const route = useRoute();
let id = parseInt(route.params.id);

let react = reactive({
    loading: true,
    scores: null
});

try {
    API.PerformGet(`/user/${id}/scores`).then(res => {
        if (!res.data) return;

        react['scores'] = res.data;
    }).finally(() => {
        react.loading = false;
    })
} catch (err) {
    console.error(err);
    react.loading = false;
}
</script>

<template>
    <LoadingContainer v-if="react.loading" />
    <div class="flex flex-col gap-5" v-else>
        <UserSection title="Best">
            <UserContentList v-if="react.scores.best_scores.length > 0">
                <ScoreCard v-for="score in react.scores.best_scores.splice(0, 8)" :score="score" />
            </UserContentList>
            <p class="text-sm opacity-80 px-2" v-else>Nothing here yet...</p>
        </UserSection>
        <UserSection title="Recent">
            <UserContentList v-if="react.scores.best_scores.length > 0">
                <ScoreCard v-for="score in react.scores.recent_scores.splice(0, 6)" :score="score" />
            </UserContentList>
            <p class="text-sm opacity-80 px-2" v-else>Nothing here yet...</p>
        </UserSection>
    </div>
</template>