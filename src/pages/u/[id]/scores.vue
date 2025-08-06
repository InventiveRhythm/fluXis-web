<script setup lang="ts">
import type { APIScore } from '~/models/scores/APIScore';
import type APIUser from '~/models/users/APIUser';
import API from '~/utils/api';

definePageMeta({
    alias: '/u/:id'
});

const props = defineProps<{
    user: APIUser;
}>();

const { data: scores } = await API.PerformGet<{
    recent_scores: APIScore[];
    best_scores: APIScore[];
}>(`/user/${props.user.id}/scores`);

if (scores) {
    scores.recent_scores = scores.recent_scores.splice(0, 8);
    scores.best_scores = scores.best_scores.splice(0, 8);
}
</script>

<template>
    <div class="flex flex-col gap-5" v-if="scores">
        <UserPageSection title="Best" replacement="There is nothing here yet..." :empty="scores.best_scores.length === 0">
            <UserFlowList>
                <UserScoreCard v-for="score in scores.best_scores" :score="score" />
            </UserFlowList>
        </UserPageSection>
        <UserPageSection title="Recent" replacement="There is nothing here yet..." :empty="scores.recent_scores.length === 0">
            <UserFlowList>
                <UserScoreCard v-for="score in scores.recent_scores" :score="score" />
            </UserFlowList>
        </UserPageSection>
    </div>
</template>
