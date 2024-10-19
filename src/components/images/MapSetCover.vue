<script setup lang="ts">
import type { APIMapSet } from '@/api/models/maps/APIMapSet';

import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';

defineProps<{
    set: APIMapSet
}>();
</script>

<template>
    <LoadingImage :src="Assets.Cover(set.id)" :alt="`cover for ${set.title}`" />
</template>