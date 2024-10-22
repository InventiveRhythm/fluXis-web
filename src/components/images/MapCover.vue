<script setup lang="ts">
import APIMap from '@/api/models/maps/APIMap';

import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';

defineProps<{
    map: APIMap
}>();
</script>

<template>
    <LoadingImage :src="Assets.Cover(map.mapset)" :alt="`cover for ${map.title}`" />
</template>