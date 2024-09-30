<script setup>
import StatisticsNumberEntry from './StatisticsNumberEntry.vue';

import TimeUtils from '@/utils/TimeUtils';

defineProps({
    map: Object
});
</script>

<template>
    <div class="flex flex-row">
        <StatisticsNumberEntry text="Length" :value="TimeUtils.FormatDuration(map.length / 1000)" />
        <StatisticsNumberEntry text="BPM" :value="map.bpm" />
        <StatisticsNumberEntry text="Hits" :value="map.notes" />
        <StatisticsNumberEntry text="LNs" :value="map['long-notes']" />
    </div>
</template>