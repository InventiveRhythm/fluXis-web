<script setup lang="ts">
import type APIClub from '@/api/models/clubs/APIClub';

import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';

defineProps<{
    club: APIClub
}>();
</script>

<template>
    <LoadingImage :src="Assets.ClubBanner(club)" :alt="`${club.name} club banner`" />
</template>