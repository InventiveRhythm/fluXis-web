<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import API from '~/utils/api';

definePageMeta({
    alias: '/clubs/:id'
});

defineProps<{
    club: APIClub;
}>();

function InviteMember() {}
</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <ClubMember :club="club" :member="member" v-for="member in club.members" />
        <Button v-if="API.CurrentUser.value && API.CurrentUser.value?.id === club.owner?.id" @click="InviteMember" class="mt-3 px-6 py-2 text-dark-text text-opacity-75">Invite... </Button>
    </div>
</template>
