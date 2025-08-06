<script setup lang="ts">
import { MapSetSidebarStatsBar, MapSetSidebarStatsNumber } from '#components';
import type { APIMap } from '~/models/maps/APIMap';

defineProps<{
    map: APIMap;
}>();
</script>

<template>
    <div class="grid grid-cols-4">
        <MapSetSidebarStatsNumber text="Length" :value="formatting.Duration(map.length / 1000)" />
        <MapSetSidebarStatsNumber text="BPM" :value="map.bpm" />
        <MapSetSidebarStatsNumber text="Hits" :value="map.notes" />
        <MapSetSidebarStatsNumber text="LNs" :value="map['long-notes']" />
    </div>
    <MapSetSidebarStatsBar title="Rating" :value="map.rating" :max="30" />
    <MapSetSidebarStatsBar title="Accuracy" :value="map.accuracy || 0" :max="10" />
    <MapSetSidebarStatsBar title="Health" :value="map.health || 0" :max="10" />
</template>
