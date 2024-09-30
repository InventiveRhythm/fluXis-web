<script setup>
import StatisticsNumbers from './stats/StatisticsNumbers.vue';
import StatisticsBar from './stats/StatisticsBar.vue';

defineProps({
    map: Object
});
</script>

<template>
    <StatisticsNumbers :map="map" />
    <StatisticsBar title="Rating" :value="map.nps" :max="30" />
    <StatisticsBar title="Accuracy" :value="map.accuracy || 0" :max="10" />
    <StatisticsBar title="Health" :value="map.health || 0" :max="10" />
</template>